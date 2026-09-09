// =============================================================================
// BOLÃO NFL 2026-2027 - MOTOR DA APLICAÇÃO & LÓGICA DE REGRAS
// =============================================================================

class BolaoApp {
    constructor() {
        this.data = loadBolaoData();
        this.currentWeek = 1;
        this.currentView = "table"; // 'table' | 'cards' | 'leaderboard' | 'admin' | 'settings'
        this.activeUserId = this.data.participants[0]?.id || "user_angel";
        this.isAdmin = false;
        this.pendingAdminCallback = null;

        this.init();
    }

    async init() {
        this.bindEvents();
        this.renderAll();

        // Tenta buscar os dados atualizados da nuvem no arranque
        const remoteData = await fetchRemoteBolaoData();
        if (remoteData) {
            this.data = remoteData;
            this.renderAll();
        } else {
            // Se for o primeiro acesso e a nuvem ainda estiver vazia, salva a base atual na nuvem
            saveBolaoData(this.data);
        }

        // Ativa a sincronização automática com a ESPN se configurada
        if (this.data.settings.autoSyncEspn) {
            this.startAutoSyncEspn();
        }
    }

    // =========================================================================
    // INTEGRAÇÃO COM A API DA ESPN (ATUALIZAÇÃO AUTOMÁTICA DE PLACARES)
    // =========================================================================

    normalizeTeamAbbr(abbr) {
        if (!abbr) return "";
        const map = {
            WAS: "WSH",
            WSH: "WSH",
            JAC: "JAX",
            JAX: "JAX",
            LA: "LAR",
            LAR: "LAR",
            SD: "LAC",
            LAC: "LAC",
            OAK: "LV",
            LV: "LV",
            STL: "LAR"
        };
        const upper = String(abbr).toUpperCase().trim();
        return map[upper] || upper;
    }

    async fetchEspnScores(week = 1, seasonType = 2) {
        try {
            const url = `https://site.api.espn.com/apis/site/v2/sports/football/nfl/scoreboard?seasontype=${seasonType}&week=${week}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            return data.events || [];
        } catch (err) {
            console.error(`Erro ao buscar dados da ESPN para Semana ${week}:`, err);
            return null;
        }
    }

    async syncWeekFromEspn(week = this.currentWeek, showToastNotification = true) {
        const events = await this.fetchEspnScores(week, 2);
        if (!events || events.length === 0) {
            if (showToastNotification) {
                this.showToast(`Nenhum dado encontrado na ESPN para a Semana ${week}.`, "warning");
            }
            return 0;
        }

        let updatedCount = 0;

        events.forEach(event => {
            const comp = event.competitions?.[0];
            if (!comp || !comp.competitors || comp.competitors.length < 2) return;

            const comp1 = comp.competitors[0];
            const comp2 = comp.competitors[1];

            const teamA = this.normalizeTeamAbbr(comp1.team?.abbreviation);
            const teamB = this.normalizeTeamAbbr(comp2.team?.abbreviation);

            const scoreA = comp1.score !== undefined && comp1.score !== "" ? parseInt(comp1.score, 10) : null;
            const scoreB = comp2.score !== undefined && comp2.score !== "" ? parseInt(comp2.score, 10) : null;

            const isCompleted = comp.status?.type?.completed === true || comp.status?.type?.state === "post";
            const isInProgress = comp.status?.type?.state === "in";

            const match = this.data.matches.find(m => {
                if (m.week !== week) return false;
                const m1 = this.normalizeTeamAbbr(m.team1);
                const m2 = this.normalizeTeamAbbr(m.team2);
                return (m1 === teamA && m2 === teamB) || (m1 === teamB && m2 === teamA);
            });

            if (match) {
                const m1 = this.normalizeTeamAbbr(match.team1);
                let targetScore1 = null;
                let targetScore2 = null;

                if (m1 === teamA) {
                    targetScore1 = scoreA;
                    targetScore2 = scoreB;
                } else {
                    targetScore1 = scoreB;
                    targetScore2 = scoreA;
                }

                let targetStatus = match.status;
                if (isCompleted) {
                    targetStatus = "finished";
                } else if (isInProgress) {
                    targetStatus = "in_progress";
                } else {
                    targetStatus = "scheduled";
                }

                if (isCompleted || isInProgress || (targetScore1 !== null && targetScore2 !== null)) {
                    if (match.score1 !== targetScore1 || match.score2 !== targetScore2 || match.status !== targetStatus) {
                        match.score1 = targetScore1;
                        match.score2 = targetScore2;
                        match.status = targetStatus;
                        updatedCount++;
                    }
                }
            }
        });

        if (updatedCount > 0) {
            this.data.lastEspnSync = new Date().toISOString();
            saveBolaoData(this.data);
            this.renderAll();
            if (showToastNotification) {
                this.showToast(`⚡ ESPN Sync: ${updatedCount} jogo(s) atualizado(s) na Semana ${week}!`, "success");
            }
        } else if (showToastNotification) {
            this.showToast(`⚡ ESPN Sync: Jogos da Semana ${week} já estão atualizados com a ESPN.`, "info");
        }

        return updatedCount;
    }

    async syncAllWeeksFromEspn() {
        if (this.isSyncingEspn) return;
        this.isSyncingEspn = true;
        this.showToast("⏳ Buscando placares da ESPN para todas as 18 semanas...", "info");
        let totalUpdated = 0;
        for (let w = 1; w <= 18; w++) {
            const count = await this.syncWeekFromEspn(w, false);
            totalUpdated += count;
        }

        this.isSyncingEspn = false;
        this.data.lastEspnSync = new Date().toISOString();
        saveBolaoData(this.data);
        this.renderAll();

        if (totalUpdated > 0) {
            this.showToast(`✅ ESPN Sync Concluído! ${totalUpdated} placares atualizados na temporada.`, "success");
        } else {
            this.showToast("ℹ️ ESPN Sync Concluído: Todos os placares já estão sincronizados.", "info");
        }
    }

    startAutoSyncEspn() {
        if (this.autoSyncTimer) clearInterval(this.autoSyncTimer);
        this.autoSyncTimer = setInterval(() => {
            this.syncWeekFromEspn(this.currentWeek, false);
        }, 60000);
    }

    stopAutoSyncEspn() {
        if (this.autoSyncTimer) {
            clearInterval(this.autoSyncTimer);
            this.autoSyncTimer = null;
        }
    }

    toggleAutoSyncEspn() {
        const current = !!this.data.settings.autoSyncEspn;
        this.data.settings.autoSyncEspn = !current;
        if (this.data.settings.autoSyncEspn) {
            this.startAutoSyncEspn();
            this.showToast("🟢 Atualização Automática via ESPN ativada (a cada 60s)!", "success");
        } else {
            this.stopAutoSyncEspn();
            this.showToast("🔴 Atualização Automática via ESPN desativada.", "warning");
        }
        saveBolaoData(this.data);
        this.renderAll();
    }

    // =========================================================================
    // AUTENTICAÇÃO DO ADMINISTRADOR (SENHA Pats87)
    // =========================================================================

    requestAdminAccess(callback = null) {
        if (this.isAdmin) {
            if (callback) callback();
            return;
        }

        this.pendingAdminCallback = callback;
        const modal = document.getElementById("adminAuthModal");
        const passInput = document.getElementById("inputAdminPassword");
        const errorDiv = document.getElementById("adminAuthError");

        if (passInput) passInput.value = "";
        if (errorDiv) errorDiv.style.display = "none";
        if (modal) {
            modal.classList.add("active");
            setTimeout(() => passInput?.focus(), 150);
        }
    }

    handleAdminAuthSubmit(e) {
        e.preventDefault();
        const passInput = document.getElementById("inputAdminPassword");
        const errorDiv = document.getElementById("adminAuthError");
        const enteredPass = passInput?.value.trim() || "";
        const expectedPass = this.data.settings.adminPassword || "Pats87";

        if (enteredPass === expectedPass) {
            this.isAdmin = true;
            document.getElementById("adminAuthModal")?.classList.remove("active");
            this.showToast("🔓 Acesso de Administrador liberado com sucesso!", "success");
            this.renderUserControls();
            
            if (this.pendingAdminCallback) {
                const cb = this.pendingAdminCallback;
                this.pendingAdminCallback = null;
                cb();
            } else {
                this.switchView("admin");
            }
        } else {
            if (errorDiv) {
                errorDiv.style.display = "block";
                errorDiv.textContent = "❌ Senha incorreta! Digite a senha correta (Pats87).";
            }
            if (passInput) {
                passInput.value = "";
                passInput.focus();
            }
        }
    }

    logoutAdmin() {
        this.isAdmin = false;
        this.showToast("Modo Administrador encerrado.", "warning");
        this.renderUserControls();
        if (this.currentView === "admin" || this.currentView === "settings") {
            this.switchView("table");
        } else {
            this.renderAll();
        }
    }

    // =========================================================================
    // CÁLCULO DE PONTUAÇÃO & REGRAS OFICIAIS DO BOLÃO
    // =========================================================================
    
    getMatchOfficialResult(match) {
        if (match.score1 === null || match.score2 === null || match.score1 === undefined || match.score2 === undefined || match.score1 === "" || match.score2 === "") {
            return {
                finished: false,
                winner: null,
                diff: null
            };
        }

        const s1 = parseInt(match.score1, 10);
        const s2 = parseInt(match.score2, 10);
        let winner = null;

        if (s1 > s2) winner = match.team1;
        else if (s2 > s1) winner = match.team2;
        else winner = "EMPATE";

        const diff = Math.abs(s1 - s2);

        return {
            finished: true,
            winner: winner,
            diff: diff,
            score1: s1,
            score2: s2
        };
    }

    calculatePredictionScore(match, prediction) {
        const official = this.getMatchOfficialResult(match);

        if (!official.finished || !prediction || !prediction.winner) {
            return {
                evaluated: false,
                pts: 0,
                winnerHit: false,
                exactDiffHit: false
            };
        }

        const winnerHit = (prediction.winner === official.winner);
        const userDiff = parseInt(prediction.diff, 10);
        const exactDiffHit = (winnerHit && userDiff === official.diff);

        let pts = 0;
        const ptsWinner = Number(this.data.settings.pointsWinner) || 1;
        const ptsExact = Number(this.data.settings.pointsExactDiff) || 1;

        if (winnerHit) {
            pts += ptsWinner;
            if (exactDiffHit) {
                pts += ptsExact;
            }
        }

        return {
            evaluated: true,
            pts: pts,
            winnerHit: winnerHit,
            exactDiffHit: exactDiffHit
        };
    }

    getParticipantsStats(weekFilter = null) {
        const stats = {};

        this.data.participants.forEach(p => {
            stats[p.id] = {
                participant: p,
                totalPoints: 0,
                exactDiffCount: 0,
                winnerHitsCount: 0,
                totalPredictions: 0,
                evaluatedMatches: 0
            };
        });

        const matchesToCount = weekFilter 
            ? this.data.matches.filter(m => m.week === weekFilter)
            : this.data.matches;

        matchesToCount.forEach(match => {
            const matchPredictions = this.data.predictions[match.id] || {};
            const official = this.getMatchOfficialResult(match);

            this.data.participants.forEach(p => {
                const pred = matchPredictions[p.id];
                if (pred && pred.winner) {
                    stats[p.id].totalPredictions++;
                }

                if (official.finished) {
                    stats[p.id].evaluatedMatches++;
                    if (pred) {
                        const score = this.calculatePredictionScore(match, pred);
                        stats[p.id].totalPoints += score.pts;
                        if (score.winnerHit) stats[p.id].winnerHitsCount++;
                        if (score.exactDiffHit) stats[p.id].exactDiffCount++;
                    }
                }
            });
        });

        return Object.values(stats).sort((a, b) => {
            if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
            if (b.exactDiffCount !== a.exactDiffCount) return b.exactDiffCount - a.exactDiffCount;
            return b.winnerHitsCount - a.winnerHitsCount;
        });
    }

    // =========================================================================
    // RENDERIZAÇÃO GERAL
    // =========================================================================

    switchView(viewName) {
        if ((viewName === "admin" || viewName === "settings") && !this.isAdmin) {
            this.requestAdminAccess(() => {
                this.currentView = viewName;
                this.updateNavTabs();
                this.renderAll();
            });
            return;
        }

        this.currentView = viewName;
        this.updateNavTabs();
        this.renderAll();
    }

    renderAll() {
        this.renderUserControls();
        this.renderRulesHeader();
        this.renderWeekPills();
        this.renderScoreSummaryHeader();

        const weekNavBar = document.getElementById("weekNavBarSection");
        if (weekNavBar) {
            weekNavBar.style.display = (this.currentView === "settings") ? "none" : "flex";
        }

        if (this.currentView === "table") {
            this.renderTableView();
        } else if (this.currentView === "cards") {
            this.renderCardsView();
        } else if (this.currentView === "leaderboard") {
            this.renderLeaderboardView();
        } else if (this.currentView === "admin") {
            this.renderAdminView();
        } else if (this.currentView === "settings") {
            this.renderSettingsView();
        }
    }

    renderRulesHeader() {
        const pWin = Number(this.data.settings.pointsWinner) || 1;
        const pDiff = Number(this.data.settings.pointsExactDiff) || 1;
        const pTotal = pWin + pDiff;

        const bWin = document.getElementById("ruleWinnerPointsBadge");
        const bDiff = document.getElementById("ruleDiffPointsBadge");
        const bTotal = document.getElementById("ruleTotalPointsBadge");

        if (bWin) bWin.textContent = `${pWin} PONTO${pWin > 1 ? 'S' : ''}`;
        if (bDiff) bDiff.textContent = `+${pDiff} PONTO${pDiff > 1 ? 'S' : ''}`;
        if (bTotal) bTotal.textContent = `${pTotal} PONTOS TOTAL`;
    }

    renderUserControls() {
        const activeUser = this.data.participants.find(p => p.id === this.activeUserId) || this.data.participants[0];
        const userBtn = document.getElementById("activeUserBtn");
        if (userBtn && activeUser) {
            const team = NFL_TEAMS[activeUser.favTeam];
            userBtn.innerHTML = `
                <span class="user-avatar-badge">${activeUser.avatar || "🏈"}</span>
                <span>${activeUser.name}</span>
                ${team ? `<img src="${team.logo}" alt="${team.name}" style="width: 18px; height: 18px; object-fit: contain;">` : ""}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
            `;
        }

        const adminBadge = document.getElementById("adminBadgeBtn");
        if (adminBadge) {
            adminBadge.className = `admin-badge-btn ${this.isAdmin ? "active" : ""}`;
            adminBadge.innerHTML = this.isAdmin 
                ? `<span>🔓 Admin (Sair)</span>`
                : `<span>🔒 Admin</span>`;
        }
    }

    renderWeekPills() {
        const container = document.getElementById("weekPillsContainer");
        if (!container) return;

        const weeks = [...new Set(this.data.matches.map(m => m.week))].sort((a, b) => a - b);
        if (weeks.length === 0) weeks.push(1);

        container.innerHTML = weeks.map(w => `
            <button class="week-btn ${w === this.currentWeek ? 'active' : ''}" data-week="${w}">
                Semana ${w}
            </button>
        `).join("") + `
            <button class="week-btn" id="btnSyncEspnHeader" style="background: rgba(234, 179, 8, 0.15); border-color: rgba(234, 179, 8, 0.5); color: #FACC15; font-weight: 700; margin-left: 0.5rem;" title="Atualizar placares desta semana via ESPN">
                ⚡ ESPN Live
            </button>
        `;

        container.querySelectorAll(".week-btn[data-week]").forEach(btn => {
            btn.addEventListener("click", (e) => {
                this.currentWeek = parseInt(e.currentTarget.dataset.week, 10);
                this.renderAll();
            });
        });

        document.getElementById("btnSyncEspnHeader")?.addEventListener("click", () => {
            this.syncWeekFromEspn(this.currentWeek);
        });
    }

    renderScoreSummaryHeader() {
        const container = document.getElementById("scoreSummaryGrid");
        if (!container) return;

        const stats = this.getParticipantsStats();
        const maxPts = stats.length > 0 ? stats[0].totalPoints : 0;

        container.innerHTML = stats.map((st) => {
            const p = st.participant;
            const favTeam = NFL_TEAMS[p.favTeam];
            const isLeader = (st.totalPoints === maxPts && maxPts > 0);

            return `
                <div class="participant-summary-card ${isLeader ? 'leader' : ''}">
                    <div class="summary-header">
                        <div class="summary-avatar">${p.avatar || "🏈"}</div>
                        <div class="summary-name-team">
                            <span class="summary-name">${p.name}</span>
                            ${favTeam ? `
                                <span class="summary-fav-team">
                                    <img src="${favTeam.logo}" alt="${favTeam.name}" style="width: 14px; height: 14px;">
                                    ${favTeam.shortName}
                                </span>
                            ` : ""}
                        </div>
                    </div>
                    <div class="summary-metrics">
                        <div class="metric-box">
                            <span class="metric-label">Vitória + Dif</span>
                            <span class="metric-value pts-total">${st.totalPoints} <small style="font-size: 0.65rem; color: var(--text-muted);">pts</small></span>
                        </div>
                        <div class="metric-box">
                            <span class="metric-label">Acertos de dif.</span>
                            <span class="metric-value exact-diff">🎯 ${st.exactDiffCount}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    // =========================================================================
    // VISÃO 1: TABELA GERAL (FIDELIDADE À PLANILHA)
    // =========================================================================
    renderTableView() {
        const mainContent = document.getElementById("mainContentArea");
        if (!mainContent) return;

        const currentMatches = this.data.matches.filter(m => m.week === this.currentWeek);
        const participants = this.data.participants;

        let tableHtml = `
            <div class="table-container-card">
                <div class="table-toolbar">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <span style="font-size: 1.1rem; font-weight: 800; font-family: var(--font-display); color: #FFFFFF;">
                            SEMANA ${this.currentWeek} - CONFRONTOS & PALPITES
                        </span>
                        <span class="season-tag">${currentMatches.length} JOGOS</span>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button class="btn btn-secondary" id="btnQuickEditScores" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;">
                            ⚙️ Lançar Placares Reais
                        </button>
                    </div>
                </div>

                <div class="table-responsive-wrapper">
                    <table class="bolao-table">
                        <thead>
                            <tr class="participant-header-row">
                                <th colspan="3" class="col-sticky-1" style="text-align: left; padding-left: 1rem;">CALENDÁRIO</th>
                                <th colspan="4">PARTIDA OFICIAL</th>
                                <th colspan="2" style="background: #0F1F3D !important; color: #60A5FA;">RESULTADO</th>
                                ${participants.map(p => `
                                    <th colspan="3" class="th-participant-group">
                                        ${p.avatar || "🏈"} ${p.name}
                                    </th>
                                `).join("")}
                            </tr>
                            <tr>
                                <th class="col-sticky-1" style="width: 50px;">SEM</th>
                                <th>QUANDO</th>
                                <th>HORA (BRT)</th>
                                <th style="text-align: right;">TIME VISITANTE (1)</th>
                                <th style="width: 45px;">P1</th>
                                <th style="width: 45px;">P2</th>
                                <th style="text-align: left;">TIME MANDANTE (2)</th>
                                <th style="background: #0F1F3D !important; color: #93C5FD;">VITÓRIA</th>
                                <th style="background: #0F1F3D !important; color: #FCD34D;">DIF</th>
                                ${participants.map(p => `
                                    <th class="th-participant-sub td-part-start">VITÓRIA</th>
                                    <th class="th-participant-sub">DIF</th>
                                    <th class="th-participant-sub col-pts td-part-end">PTS</th>
                                `).join("")}
                            </tr>
                        </thead>
                        <tbody>
        `;

        if (currentMatches.length === 0) {
            tableHtml += `
                <tr>
                    <td colspan="${9 + participants.length * 3}" style="padding: 3rem; color: var(--text-muted);">
                        Nenhum jogo cadastrado para a Semana ${this.currentWeek}.
                    </td>
                </tr>
            `;
        } else {
            currentMatches.forEach(match => {
                const team1 = NFL_TEAMS[match.team1] || { shortName: match.team1, name: match.team1, logo: "" };
                const team2 = NFL_TEAMS[match.team2] || { shortName: match.team2, name: match.team2, logo: "" };
                const official = this.getMatchOfficialResult(match);

                const officialWinnerTeam = official.winner ? (NFL_TEAMS[official.winner]?.shortName || official.winner) : "-";
                const officialDiffVal = official.diff !== null ? official.diff : "-";
                const matchPredictions = this.data.predictions[match.id] || {};

                tableHtml += `
                    <tr>
                        <td class="col-sticky-1" style="font-weight: 700; color: var(--text-secondary);">${match.week}</td>
                        <td style="color: #CBD5E1; font-weight: 500;">${match.date}</td>
                        <td style="color: #38BDF8; font-weight: 700; font-family: var(--font-display);">${match.time}</td>
                        
                        <!-- Time 1 -->
                        <td style="text-align: right;">
                            <div class="team-cell team-cell-left">
                                <span>${team1.name}</span>
                                <img src="${team1.logo}" alt="${team1.shortName}" class="table-team-logo">
                            </div>
                        </td>
                        <!-- Placares -->
                        <td class="score-cell">${match.score1 !== null ? match.score1 : ""}</td>
                        <td class="score-cell">${match.score2 !== null ? match.score2 : ""}</td>
                        <!-- Time 2 -->
                        <td style="text-align: left;">
                            <div class="team-cell team-cell-right">
                                <img src="${team2.logo}" alt="${team2.shortName}" class="table-team-logo">
                                <span>${team2.name}</span>
                            </div>
                        </td>

                        <!-- Resultado Oficial -->
                        <td class="winner-cell-official">${officialWinnerTeam}</td>
                        <td class="diff-cell-official">${officialDiffVal}</td>

                        <!-- Palpites dos Participantes -->
                        ${participants.map(p => {
                            const pred = matchPredictions[p.id];
                            if (!pred || !pred.winner) {
                                return `
                                    <td class="td-part-start" style="color: var(--text-muted);">-</td>
                                    <td style="color: var(--text-muted);">-</td>
                                    <td class="td-part-end pts-badge pts-miss">-</td>
                                `;
                            }

                            const pickTeam = NFL_TEAMS[pred.winner] || { shortName: pred.winner, logo: "" };
                            const score = this.calculatePredictionScore(match, pred);

                            let ptsClass = "pts-miss";
                            let ptsLabel = "0";

                            if (official.finished) {
                                if (score.exactDiffHit) {
                                    ptsClass = "pts-exact";
                                    ptsLabel = score.pts;
                                } else if (score.winnerHit) {
                                    ptsClass = "pts-winner";
                                    ptsLabel = score.pts;
                                } else {
                                    ptsClass = "pts-miss";
                                    ptsLabel = "0";
                                }
                            } else {
                                ptsLabel = "—";
                                ptsClass = "";
                            }

                            return `
                                <td class="td-part-start">
                                    <span class="pick-winner-badge" style="background: rgba(255,255,255,0.06);">
                                        ${pickTeam.shortName}
                                    </span>
                                </td>
                                <td class="pick-diff-val" style="color: #CBD5E1;">
                                    ${pred.diff}
                                </td>
                                <td class="td-part-end">
                                    <span class="pts-badge ${ptsClass}">
                                        ${ptsLabel}
                                    </span>
                                </td>
                            `;
                        }).join("")}
                    </tr>
                `;
            });
        }

        tableHtml += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        mainContent.innerHTML = tableHtml;

        document.getElementById("btnQuickEditScores")?.addEventListener("click", () => {
            this.switchView("admin");
        });
    }

    // =========================================================================
    // VISÃO 2: CARTÕES DE APOSTAS
    // =========================================================================
    renderCardsView() {
        const mainContent = document.getElementById("mainContentArea");
        if (!mainContent) return;

        const activeUser = this.data.participants.find(p => p.id === this.activeUserId) || this.data.participants[0];
        const currentMatches = this.data.matches.filter(m => m.week === this.currentWeek);

        let html = `
            <div style="margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h2 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF;">
                        Apostar na Semana ${this.currentWeek}
                    </h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">
                        Apostando como: <strong style="color: #38BDF8;">${activeUser.name}</strong>. Escolha quem vence e a diferença de pontos!
                    </p>
                </div>
                <button class="btn btn-primary" id="btnSaveActiveUserBets">
                    💾 Salvar Meus Palpites
                </button>
            </div>

            <div class="cards-grid">
        `;

        currentMatches.forEach(match => {
            const team1 = NFL_TEAMS[match.team1] || { name: match.team1, shortName: match.team1, logo: "" };
            const team2 = NFL_TEAMS[match.team2] || { name: match.team2, shortName: match.team2, logo: "" };
            const pred = this.data.predictions[match.id]?.[activeUser.id] || { winner: null, diff: 3 };
            const official = this.getMatchOfficialResult(match);

            const isTeam1Selected = (pred.winner === match.team1);
            const isTeam2Selected = (pred.winner === match.team2);

            html += `
                <div class="match-bet-card" data-match-id="${match.id}">
                    <div class="match-bet-header">
                        <span class="match-time-tag">
                            📅 ${match.date} • ⏰ ${match.time} BRT
                        </span>
                        <span class="match-status-badge ${official.finished ? 'finished' : 'scheduled'}">
                            ${official.finished ? `Final: ${match.score1} x ${match.score2}` : 'Em Breve'}
                        </span>
                    </div>

                    <div class="teams-versus-row">
                        <!-- Visitante (Time 1) -->
                        <div class="team-bet-select ${isTeam1Selected ? 'selected' : ''}" data-team="${match.team1}">
                            <img src="${team1.logo}" alt="${team1.name}" class="team-card-logo">
                            <span class="team-card-name">${team1.name}</span>
                            <span class="team-card-record">${team1.shortName} (Visitante)</span>
                        </div>

                        <!-- VS / Placar -->
                        <div class="match-vs-divider">
                            <span>@</span>
                            ${official.finished ? `
                                <div class="live-score-preview">
                                    ${match.score1} - ${match.score2}
                                </div>
                            ` : ''}
                        </div>

                        <!-- Mandante (Time 2) -->
                        <div class="team-bet-select ${isTeam2Selected ? 'selected' : ''}" data-team="${match.team2}">
                            <img src="${team2.logo}" alt="${team2.name}" class="team-card-logo">
                            <span class="team-card-name">${team2.name}</span>
                            <span class="team-card-record">${team2.shortName} (Mandante)</span>
                        </div>
                    </div>

                    <!-- Controle de Diferença -->
                    <div class="bet-diff-control">
                        <div class="bet-diff-label">
                            <span class="bet-diff-title">Diferença do Placar (DIF)</span>
                            <span class="bet-diff-desc">Por quantos pontos o time escolhido vai vencer?</span>
                        </div>
                        <div class="stepper-control">
                            <button class="stepper-btn btn-stepper-minus" type="button">-</button>
                            <input type="number" class="stepper-value input-diff-val" min="1" max="99" value="${pred.diff || 3}">
                            <button class="stepper-btn btn-stepper-plus" type="button">+</button>
                        </div>
                    </div>

                    <div class="bet-card-footer">
                        <div>
                            ${pred.winner ? `
                                <span style="color: var(--text-secondary);">Palpite atual: </span>
                                <strong style="color: #34D399;">${NFL_TEAMS[pred.winner]?.shortName} por ${pred.diff} pts</strong>
                            ` : `
                                <span style="color: #F87171;">⚠️ Nenhum palpite marcado</span>
                            `}
                        </div>
                        ${official.finished && pred.winner ? `
                            <div>
                                ${(() => {
                                    const sc = this.calculatePredictionScore(match, pred);
                                    if (sc.exactDiffHit) return `<span class="pts-badge pts-exact">🎯 ${sc.pts} PTS</span>`;
                                    if (sc.winnerHit) return `<span class="pts-badge pts-winner">${sc.pts} PT</span>`;
                                    return '<span class="pts-badge pts-miss">0 PTS</span>';
                                })()}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        mainContent.innerHTML = html;

        this.bindCardViewEvents(activeUser.id);
    }

    bindCardViewEvents(userId) {
        const cards = document.querySelectorAll(".match-bet-card");
        cards.forEach(card => {
            const matchId = card.dataset.matchId;
            const teamSelects = card.querySelectorAll(".team-bet-select");
            const diffInput = card.querySelector(".input-diff-val");
            const btnMinus = card.querySelector(".btn-stepper-minus");
            const btnPlus = card.querySelector(".btn-stepper-plus");

            teamSelects.forEach(btn => {
                btn.addEventListener("click", () => {
                    const chosenTeam = btn.dataset.team;
                    teamSelects.forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");

                    if (!this.data.predictions[matchId]) {
                        this.data.predictions[matchId] = {};
                    }
                    if (!this.data.predictions[matchId][userId]) {
                        this.data.predictions[matchId][userId] = { winner: null, diff: 3 };
                    }
                    this.data.predictions[matchId][userId].winner = chosenTeam;
                    this.data.predictions[matchId][userId].diff = parseInt(diffInput.value, 10) || 1;

                    saveBolaoData(this.data);
                    this.renderCardsView();
                    this.showToast(`Palpite salvo: ${NFL_TEAMS[chosenTeam]?.shortName} por ${diffInput.value} pts!`, "success");
                });
            });

            btnMinus?.addEventListener("click", () => {
                let cur = parseInt(diffInput.value, 10) || 1;
                if (cur > 1) {
                    diffInput.value = cur - 1;
                    this.updatePredictionDiff(matchId, userId, cur - 1);
                }
            });

            btnPlus?.addEventListener("click", () => {
                let cur = parseInt(diffInput.value, 10) || 1;
                if (cur < 99) {
                    diffInput.value = cur + 1;
                    this.updatePredictionDiff(matchId, userId, cur + 1);
                }
            });

            diffInput?.addEventListener("change", () => {
                let cur = parseInt(diffInput.value, 10) || 1;
                if (cur < 1) cur = 1;
                diffInput.value = cur;
                this.updatePredictionDiff(matchId, userId, cur);
            });
        });

        document.getElementById("btnSaveActiveUserBets")?.addEventListener("click", () => {
            saveBolaoData(this.data);
            this.showToast("Todos os palpites salvos com sucesso!", "success");
        });
    }

    updatePredictionDiff(matchId, userId, newDiff) {
        if (!this.data.predictions[matchId]) this.data.predictions[matchId] = {};
        if (!this.data.predictions[matchId][userId]) {
            this.data.predictions[matchId][userId] = { winner: null, diff: newDiff };
        } else {
            this.data.predictions[matchId][userId].diff = newDiff;
        }
        saveBolaoData(this.data);
        this.renderCardsView();
    }

    // =========================================================================
    // VISÃO 3: CLASSIFICAÇÃO GERAL & PÓDIO
    // =========================================================================
    renderLeaderboardView() {
        const mainContent = document.getElementById("mainContentArea");
        if (!mainContent) return;

        const stats = this.getParticipantsStats();

        let html = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="font-size: 2rem; font-weight: 800; color: #FFFFFF; font-family: var(--font-display);">
                    🏆 CLASSIFICAÇÃO GERAL DO BOLÃO
                </h2>
                <p style="color: var(--text-secondary); max-width: 600px; margin: 0.5rem auto 0 auto;">
                    Critérios de desempate: 1º Pontos Totais • 2º Acertos de Diferença Exata (🎯) • 3º Acertos de Vencedor
                </p>
            </div>

            <!-- PÓDIO TOP 3 -->
            <div class="leaderboard-podium">
        `;

        // 2º Lugar
        if (stats[1]) {
            const p = stats[1].participant;
            html += `
                <div class="podium-step pos-2">
                    <div class="podium-card">
                        <div class="podium-rank-badge">2</div>
                        <div class="podium-avatar">${p.avatar || "🏈"}</div>
                        <span class="podium-name">${p.name}</span>
                        <span class="podium-pts">${stats[1].totalPoints} <small style="font-size: 1rem; color: var(--text-muted);">pts</small></span>
                        <span class="podium-diff-count">🎯 ${stats[1].exactDiffCount} exatos</span>
                    </div>
                </div>
            `;
        }

        // 1º Lugar
        if (stats[0]) {
            const p = stats[0].participant;
            html += `
                <div class="podium-step pos-1">
                    <div class="podium-card">
                        <div class="podium-rank-badge">1</div>
                        <div class="podium-avatar" style="border-color: #F59E0B;">${p.avatar || "👑"}</div>
                        <span class="podium-name">${p.name}</span>
                        <span class="podium-pts" style="color: #FBBF24;">${stats[0].totalPoints} <small style="font-size: 1rem; color: var(--text-muted);">pts</small></span>
                        <span class="podium-diff-count" style="background: rgba(245,158,11,0.25);">🎯 ${stats[0].exactDiffCount} cravados</span>
                    </div>
                </div>
            `;
        }

        // 3º Lugar
        if (stats[2]) {
            const p = stats[2].participant;
            html += `
                <div class="podium-step pos-3">
                    <div class="podium-card">
                        <div class="podium-rank-badge">3</div>
                        <div class="podium-avatar">${p.avatar || "🏈"}</div>
                        <span class="podium-name">${p.name}</span>
                        <span class="podium-pts">${stats[2].totalPoints} <small style="font-size: 1rem; color: var(--text-muted);">pts</small></span>
                        <span class="podium-diff-count">🎯 ${stats[2].exactDiffCount} exatos</span>
                    </div>
                </div>
            `;
        }

        html += `
            </div>

            <!-- Tabela Completa de Classificação -->
            <div class="table-container-card" style="margin-top: 2rem;">
                <div class="table-toolbar">
                    <span style="font-weight: 700; color: #FFFFFF;">DESEMPENHO DETALHADO DOS PARTICIPANTES</span>
                </div>
                <div class="table-responsive-wrapper">
                    <table class="leaderboard-table">
                        <thead>
                            <tr>
                                <th style="width: 60px; text-align: center;">POS</th>
                                <th>PARTICIPANTE</th>
                                <th>TIME DO CORAÇÃO</th>
                                <th style="text-align: center;">JOGOS APOSTADOS</th>
                                <th style="text-align: center;">ACERTOS VENCEDOR</th>
                                <th style="text-align: center; color: #FCD34D;">ACERTOS DE DIF (🎯)</th>
                                <th style="text-align: center; color: #38BDF8;">PONTOS TOTAIS</th>
                                <th style="text-align: center;">APROVEITAMENTO</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        stats.forEach((st, idx) => {
            const p = st.participant;
            const favTeam = NFL_TEAMS[p.favTeam];
            const totalFinished = st.evaluatedMatches;
            const accuracy = totalFinished > 0 ? Math.round((st.winnerHitsCount / totalFinished) * 100) : 0;

            html += `
                <tr>
                    <td style="text-align: center; font-family: var(--font-display); font-size: 1.1rem; font-weight: 800; color: ${idx === 0 ? '#F59E0B' : '#94A3B8'};">
                        #${idx + 1}
                    </td>
                    <td>
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.3rem;">${p.avatar || "🏈"}</span>
                            <span style="font-size: 1.05rem; font-weight: 700; color: #FFFFFF;">${p.name}</span>
                        </div>
                    </td>
                    <td>
                        ${favTeam ? `
                            <div style="display: flex; align-items: center; gap: 0.5rem;">
                                <img src="${favTeam.logo}" alt="${favTeam.name}" style="width: 22px; height: 22px;">
                                <span style="font-size: 0.85rem; color: #CBD5E1;">${favTeam.name}</span>
                            </div>
                        ` : "-"}
                    </td>
                    <td style="text-align: center; font-weight: 600;">${st.totalPredictions}</td>
                    <td style="text-align: center; font-weight: 600; color: #93C5FD;">${st.winnerHitsCount}</td>
                    <td style="text-align: center; font-weight: 800; font-family: var(--font-display); font-size: 1.1rem; color: #FBBF24;">
                        🎯 ${st.exactDiffCount}
                    </td>
                    <td style="text-align: center; font-weight: 800; font-family: var(--font-display); font-size: 1.35rem; color: #38BDF8;">
                        ${st.totalPoints}
                    </td>
                    <td style="text-align: center; font-weight: 600;">
                        <span style="background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); color: #34D399; padding: 0.2rem 0.6rem; border-radius: var(--radius-full); font-size: 0.8rem;">
                            ${accuracy}%
                        </span>
                    </td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        mainContent.innerHTML = html;
    }

    // =========================================================================
    // VISÃO 4: ADMINISTRAÇÃO / LANÇAR PLACARES
    // =========================================================================
    renderAdminView() {
        const mainContent = document.getElementById("mainContentArea");
        if (!mainContent) return;

        const currentMatches = this.data.matches.filter(m => m.week === this.currentWeek);

        let html = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
                <div>
                    <h2 style="font-size: 1.5rem; font-weight: 800; color: #FFFFFF;">
                        ⚙️ Gestão de Jogos & Placares - Semana ${this.currentWeek}
                    </h2>
                    <p style="font-size: 0.85rem; color: var(--text-secondary);">
                        Área protegida por senha (<strong style="color: #38BDF8;">Pats87</strong>). Digite os placares oficiais. O sistema apura o vencedor e a diferença automaticamente!
                    </p>
                </div>
                <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <button class="btn btn-warning" id="btnSyncEspnAdminWeek" style="background: rgba(234, 179, 8, 0.15); border-color: #EAB308; color: #FACC15;">
                        ⚡ ESPN Sync (Semana ${this.currentWeek})
                    </button>
                    <button class="btn btn-primary" id="btnSyncEspnAdminAll">
                        🔄 Sync 18 Semanas
                    </button>
                    <button class="btn ${this.data.settings.autoSyncEspn ? 'btn-success' : 'btn-secondary'}" id="btnToggleAutoSyncAdmin">
                        ${this.data.settings.autoSyncEspn ? '🟢 Auto-Sync ON' : '🔴 Auto-Sync OFF'}
                    </button>
                    <button class="btn btn-secondary" id="btnAddCustomMatch">
                        ➕ Adicionar Jogo
                    </button>
                    <button class="btn btn-success" id="btnSaveAdminAllScores">
                        💾 Salvar Placares
                    </button>
                </div>
            </div>

            <div class="table-container-card">
                <div class="table-responsive-wrapper">
                    <table class="bolao-table" style="text-align: left;">
                        <thead>
                            <tr>
                                <th style="width: 50px;">SEM</th>
                                <th>DATA & HORA (BRT)</th>
                                <th style="text-align: right;">TIME VISITANTE (1)</th>
                                <th style="width: 90px; text-align: center;">PLACAR 1</th>
                                <th style="width: 90px; text-align: center;">PLACAR 2</th>
                                <th>TIME MANDANTE (2)</th>
                                <th style="text-align: center;">VENCEDOR APURADO</th>
                                <th style="text-align: center;">DIFERENÇA</th>
                                <th style="width: 100px; text-align: center;">AÇÃO</th>
                            </tr>
                        </thead>
                        <tbody>
        `;

        currentMatches.forEach(match => {
            const t1 = NFL_TEAMS[match.team1] || { name: match.team1, shortName: match.team1, logo: "" };
            const t2 = NFL_TEAMS[match.team2] || { name: match.team2, shortName: match.team2, logo: "" };
            const official = this.getMatchOfficialResult(match);

            html += `
                <tr data-match-id="${match.id}">
                    <td style="text-align: center; font-weight: 700;">${match.week}</td>
                    <td>
                        <input type="text" class="form-input input-match-date" value="${match.date}" style="width: 95px; padding: 0.3rem 0.5rem; font-size: 0.8rem;">
                        <input type="text" class="form-input input-match-time" value="${match.time}" style="width: 70px; padding: 0.3rem 0.5rem; font-size: 0.8rem;">
                    </td>
                    <td style="text-align: right;">
                        <div class="team-cell team-cell-left">
                            <span>${t1.name}</span>
                            <img src="${t1.logo}" alt="${t1.shortName}" class="table-team-logo">
                        </div>
                    </td>
                    <td style="text-align: center;">
                        <input type="number" min="0" max="99" class="form-input input-score-1" value="${match.score1 !== null ? match.score1 : ''}" placeholder="-" style="width: 65px; text-align: center; font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;">
                    </td>
                    <td style="text-align: center;">
                        <input type="number" min="0" max="99" class="form-input input-score-2" value="${match.score2 !== null ? match.score2 : ''}" placeholder="-" style="width: 65px; text-align: center; font-family: var(--font-display); font-size: 1.1rem; font-weight: 700;">
                    </td>
                    <td>
                        <div class="team-cell team-cell-right">
                            <img src="${t2.logo}" alt="${t2.shortName}" class="table-team-logo">
                            <span>${t2.name}</span>
                        </div>
                    </td>
                    <td style="text-align: center; font-weight: 700; color: #38BDF8;">
                        ${official.winner ? (NFL_TEAMS[official.winner]?.shortName || official.winner) : '-'}
                    </td>
                    <td style="text-align: center; font-family: var(--font-display); font-weight: 800; font-size: 1.1rem; color: #FBBF24;">
                        ${official.diff !== null ? official.diff : '-'}
                    </td>
                    <td style="text-align: center;">
                        <button class="btn btn-danger btn-delete-match" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" title="Remover jogo">
                            🗑️
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        mainContent.innerHTML = html;

        document.getElementById("btnSaveAdminAllScores")?.addEventListener("click", () => {
            const rows = document.querySelectorAll("tr[data-match-id]");
            rows.forEach(r => {
                const matchId = r.dataset.matchId;
                const s1Val = r.querySelector(".input-score-1").value.trim();
                const s2Val = r.querySelector(".input-score-2").value.trim();
                const dateVal = r.querySelector(".input-match-date").value.trim();
                const timeVal = r.querySelector(".input-match-time").value.trim();

                const match = this.data.matches.find(m => m.id === matchId);
                if (match) {
                    match.date = dateVal;
                    match.time = timeVal;
                    match.score1 = s1Val !== "" ? parseInt(s1Val, 10) : null;
                    match.score2 = s2Val !== "" ? parseInt(s2Val, 10) : null;
                    match.status = (match.score1 !== null && match.score2 !== null) ? "finished" : "scheduled";
                }
            });

            saveBolaoData(this.data);
            this.showToast("Placares e dados salvos com sucesso!", "success");
            this.renderAll();
        });

        document.getElementById("btnSyncEspnAdminWeek")?.addEventListener("click", () => {
            this.syncWeekFromEspn(this.currentWeek);
        });

        document.getElementById("btnSyncEspnAdminAll")?.addEventListener("click", () => {
            this.syncAllWeeksFromEspn();
        });

        document.getElementById("btnToggleAutoSyncAdmin")?.addEventListener("click", () => {
            this.toggleAutoSyncEspn();
        });

        document.getElementById("btnAddCustomMatch")?.addEventListener("click", () => {
            this.openAddMatchModal();
        });

        document.querySelectorAll(".btn-delete-match").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const row = e.currentTarget.closest("tr");
                const matchId = row.dataset.matchId;
                if (confirm("Deseja realmente remover esta partida?")) {
                    this.data.matches = this.data.matches.filter(m => m.id !== matchId);
                    delete this.data.predictions[matchId];
                    saveBolaoData(this.data);
                    this.showToast("Partida removida.", "warning");
                    this.renderAll();
                }
            });
        });
    }

    // =========================================================================
    // VISÃO 5: CONFIGURAÇÕES (EDITAR TIME DO CORAÇÃO, REGRAS, SENHA, ETC)
    // =========================================================================
    renderSettingsView() {
        const mainContent = document.getElementById("mainContentArea");
        if (!mainContent) return;

        const pWin = Number(this.data.settings.pointsWinner) || 1;
        const pDiff = Number(this.data.settings.pointsExactDiff) || 1;
        const seasonName = this.data.settings.season || "2026-2027";

        const teamOptionsHtml = (selectedTeamId) => {
            return Object.values(NFL_TEAMS)
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(t => `<option value="${t.id}" ${t.id === selectedTeamId ? 'selected' : ''}>${t.name} (${t.city})</option>`)
                .join("");
        };

        const avatarOptions = ["🏈", "⚡", "🦅", "🦁", "🔥", "👑", "🎯", "⭐", "🐺", "🛡️"];

        let html = `
            <div class="settings-container">
                <div>
                    <h2 style="font-size: 1.75rem; font-weight: 800; color: #FFFFFF; font-family: var(--font-display);">
                        ⚙️ CONFIGURAÇÕES DO BOLÃO
                    </h2>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">
                        Gerencie participantes, time do coração, regras de pontuação e segurança do grupo.
                    </p>
                </div>

                <!-- SEÇÃO 1: PARTICIPANTES & TIMES DO CORAÇÃO -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">🏈 Participantes & Time do Coração</span>
                        <span class="season-tag">${this.data.participants.length} AMIGOS CADASTRADOS</span>
                    </div>

                    <div style="display: flex; flex-direction: column; gap: 0.75rem;" id="settingsParticipantsList">
        `;

        this.data.participants.forEach(p => {
            const team = NFL_TEAMS[p.favTeam] || { name: p.favTeam, logo: "" };
            html += `
                <div class="settings-participant-row" data-user-id="${p.id}">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <select class="form-select select-part-avatar" style="width: 65px; padding: 0.4rem; font-size: 1.2rem;">
                            ${avatarOptions.map(av => `<option value="${av}" ${av === p.avatar ? 'selected' : ''}>${av}</option>`).join("")}
                        </select>
                    </div>

                    <div>
                        <input type="text" class="form-input input-part-name" value="${p.name}" placeholder="Nome" style="width: 100%; font-weight: 700;">
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <img src="${team.logo}" alt="${team.name}" class="table-team-logo img-part-team-logo" style="width: 26px; height: 26px;">
                        <select class="form-select select-part-fav-team" style="width: 100%;">
                            ${teamOptionsHtml(p.favTeam)}
                        </select>
                    </div>

                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <input type="text" class="form-input input-part-telegram" value="${p.telegramChatId || ''}" placeholder="Telegram Chat ID" style="width: 100%; font-size: 0.82rem;" title="ID numérico do Telegram ou @usuario">
                    </div>

                    <div style="display: flex; gap: 0.4rem; justify-content: flex-end;">
                        <button class="btn btn-primary btn-save-participant" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
                            💾 Salvar
                        </button>
                        ${this.data.participants.length > 1 ? `
                            <button class="btn btn-danger btn-delete-participant" style="padding: 0.4rem 0.6rem; font-size: 0.8rem;" title="Remover amigo">
                                🗑️
                            </button>
                        ` : ''}
                    </div>
                </div>
            `;
        });

        html += `
                    </div>

                    <!-- Formulário para cadastrar novo amigo -->
                    <form id="formAddFriendInSettings" style="margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid var(--border-subtle); display: flex; flex-direction: column; gap: 0.85rem;">
                        <span style="font-weight: 700; color: #38BDF8; font-size: 0.95rem;">+ Adicionar Novo Amigo</span>
                        <div class="settings-participant-row" style="background: rgba(37, 99, 235, 0.08); border-color: rgba(37, 99, 235, 0.3);">
                            <div>
                                <select id="newFriendAvatar" class="form-select" style="width: 65px; padding: 0.4rem; font-size: 1.2rem;">
                                    ${avatarOptions.map(av => `<option value="${av}">${av}</option>`).join("")}
                                </select>
                            </div>
                            <div>
                                <input type="text" id="newFriendName" class="form-input" placeholder="Nome / Apelido" required style="width: 100%;">
                            </div>
                            <div>
                                <select id="newFriendFavTeam" class="form-select" style="width: 100%;">
                                    ${teamOptionsHtml("KC")}
                                </select>
                            </div>
                            <div>
                                <input type="text" id="newFriendTelegram" class="form-input" placeholder="Telegram ID" style="width: 100%; font-size: 0.85rem;">
                            </div>
                            <div>
                                <button type="submit" class="btn btn-success" style="padding: 0.45rem 1rem; font-size: 0.85rem; width: 100%;">
                                    + Cadastrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- SEÇÃO 2: REGRAS DE PONTUAÇÃO DO BOLÃO -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">🎯 Regras de Pontuação</span>
                        <span style="font-size: 0.8rem; color: var(--text-secondary);">Ajuste os pesos dos pontos</span>
                    </div>

                    <form id="formScoringRules">
                        <div class="settings-grid-2col">
                            <div class="form-group">
                                <label class="form-label">1. Pontos por acertar quem venceu (Vitória)</label>
                                <input type="number" id="inputPtsWinner" class="form-input" min="1" max="10" value="${pWin}" required>
                                <span style="font-size: 0.75rem; color: var(--text-muted);">Padrão oficial: 1 ponto</span>
                            </div>

                            <div class="form-group">
                                <label class="form-label">2. Pontos adicionais por acertar a diferença exata (🎯 Bônus)</label>
                                <input type="number" id="inputPtsDiff" class="form-input" min="0" max="10" value="${pDiff}" required>
                                <span style="font-size: 0.75rem; color: var(--text-muted);">Padrão oficial: +1 ponto de bônus</span>
                            </div>
                        </div>

                        <div style="margin-top: 1rem; padding: 0.85rem 1rem; background: rgba(0,0,0,0.25); border-radius: var(--radius-md); font-size: 0.85rem; color: #CBD5E1;">
                            <strong>Simulação da Pontuação:</strong>
                            <ul style="margin-left: 1.25rem; margin-top: 0.4rem; line-height: 1.6;">
                                <li>Acerto de quem ganhou: <strong style="color: #93C5FD;" id="simWinPts">${pWin} ponto(s)</strong></li>
                                <li>Acerto cravado de quem ganhou + diferença exata: <strong style="color: #FCD34D;" id="simTotalPts">${pWin + pDiff} pontos</strong></li>
                                <li>Erro de vencedor: <span style="color: var(--text-muted);">0 pontos</span></li>
                            </ul>
                        </div>

                        <div style="margin-top: 1.25rem; display: flex; justify-content: flex-end;">
                            <button type="submit" class="btn btn-primary">
                                💾 Salvar Regras de Pontuação
                            </button>
                        </div>
                    </form>
                </div>

                <!-- SEÇÃO 3: SEGURANÇA E SENHA DO ADMINISTRADOR -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">🔐 Senha do Administrador</span>
                        <span style="font-size: 0.8rem; color: #F59E0B;">Senha atual configurada: <strong>${this.data.settings.adminPassword || "Pats87"}</strong></span>
                    </div>
                    <form id="formChangeAdminPassword">
                        <div class="form-group" style="max-width: 380px;">
                            <label class="form-label">Nova Senha de Administrador</label>
                            <input type="text" id="inputNewAdminPassword" class="form-input" placeholder="Digite a nova senha" value="${this.data.settings.adminPassword || "Pats87"}" required>
                        </div>
                        <div style="margin-top: 1rem; display: flex; justify-content: flex-start;">
                            <button type="submit" class="btn btn-secondary">
                                Atualizar Senha de Admin
                            </button>
                        </div>
                    </form>
                </div>

                <!-- SEÇÃO 4: INTEGRAÇÃO COM API DA ESPN (PLACARES AO VIVO) -->
                <div class="settings-card">
                    <div class="settings-card-header">
                        <span class="settings-card-title">⚡ Integração com API da ESPN</span>
                        <span style="font-size: 0.8rem; color: ${this.data.settings.autoSyncEspn ? '#34D399' : '#94A3B8'};">
                            Status Auto-Sync: <strong>${this.data.settings.autoSyncEspn ? '🟢 ATIVADO (60s)' : '🔴 DESATIVADO'}</strong>
                        </span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                        A API oficial da ESPN atualiza automaticamente placares, resultados e status dos confrontos da temporada 2026.
                        ${this.data.lastEspnSync ? `<br><span style="color: #38BDF8; font-size: 0.8rem;">🕒 Última sincronização: ${new Date(this.data.lastEspnSync).toLocaleString('pt-BR')}</span>` : ''}
                    </p>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button class="btn btn-warning" id="btnSyncEspnSettingsWeek" style="background: rgba(234, 179, 8, 0.15); border-color: #EAB308; color: #FACC15;">
                            ⚡ Sincronizar Semana ${this.currentWeek}
                        </button>
                        <button class="btn btn-primary" id="btnSyncEspnSettingsAll">
                            🔄 Sincronizar Todas as 18 Semanas
                        </button>
                        <button class="btn ${this.data.settings.autoSyncEspn ? 'btn-danger' : 'btn-success'}" id="btnToggleAutoSyncSettings">
                            ${this.data.settings.autoSyncEspn ? '🔴 Desativar Auto-Sync' : '🟢 Ativar Auto-Sync (60s)'}
                        </button>
                    </div>
                </div>

                <!-- SEÇÃO 5: BACKUP E DADOS -->
                <div class="settings-card settings-danger-zone">
                    <div class="settings-card-header">
                        <span class="settings-card-title" style="color: #F87171;">⚠️ Gerenciamento de Dados & Backup</span>
                    </div>
                    <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1.25rem;">
                        Você pode exportar e importar backups do Bolão em formato <strong>Excel (.xlsx)</strong> ou <strong>JSON</strong> para guardar seus dados, editar planilhas offline ou restaurar a qualquer momento.
                    </p>
                    <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                        <button class="btn btn-secondary" id="btnExportDataExcel" style="background: rgba(16, 185, 129, 0.15); border-color: #10B981; color: #6EE7B7;">
                            📊 Exportar Backup (Excel .xlsx)
                        </button>
                        <label class="btn btn-secondary" style="cursor: pointer; background: rgba(16, 185, 129, 0.15); border-color: #10B981; color: #6EE7B7;">
                            📥 Importar Backup (Excel .xlsx)
                            <input type="file" id="importExcelInputSettings" accept=".xlsx, .xls" style="display: none;">
                        </label>
                        <button class="btn btn-secondary" id="btnExportDataSettings">
                            💾 Exportar (JSON)
                        </button>
                        <label class="btn btn-secondary" style="cursor: pointer;">
                            📥 Importar (JSON)
                            <input type="file" id="importFileInputSettings" accept=".json" style="display: none;">
                        </label>
                        <button class="btn btn-danger" id="btnClearAllBets">
                            🧹 Limpar Todos os Palpites
                        </button>
                        <button class="btn btn-danger" id="btnResetOfficialDAZN">
                            🔄 Restaurar Tabela Oficial DAZN
                        </button>
                    </div>
                </div>
            </div>
        `;

        mainContent.innerHTML = html;

        this.bindSettingsEvents();
    }

    bindSettingsEvents() {
        // Atualizar preview dinâmico de pontuação
        const inWin = document.getElementById("inputPtsWinner");
        const inDiff = document.getElementById("inputPtsDiff");
        const simWin = document.getElementById("simWinPts");
        const simTot = document.getElementById("simTotalPts");

        const updateSim = () => {
            const w = parseInt(inWin?.value, 10) || 1;
            const d = parseInt(inDiff?.value, 10) || 0;
            if (simWin) simWin.textContent = `${w} ponto(s)`;
            if (simTot) simTot.textContent = `${w + d} pontos`;
        };
        inWin?.addEventListener("input", updateSim);
        inDiff?.addEventListener("input", updateSim);

        // Salvar regras de pontuação
        document.getElementById("formScoringRules")?.addEventListener("submit", (e) => {
            e.preventDefault();
            this.requestAdminAccess(() => {
                const w = parseInt(inWin.value, 10) || 1;
                const d = parseInt(inDiff.value, 10) || 0;
                this.data.settings.pointsWinner = w;
                this.data.settings.pointsExactDiff = d;
                saveBolaoData(this.data);
                this.showToast(`Regras atualizadas: Vitória = ${w} pt | Dif exata = +${d} pt!`, "success");
                this.renderAll();
            });
        });

        // Eventos dos botões da ESPN em Configurações
        document.getElementById("btnSyncEspnSettingsWeek")?.addEventListener("click", () => {
            this.syncWeekFromEspn(this.currentWeek);
        });

        document.getElementById("btnSyncEspnSettingsAll")?.addEventListener("click", () => {
            this.syncAllWeeksFromEspn();
        });

        document.getElementById("btnToggleAutoSyncSettings")?.addEventListener("click", () => {
            this.toggleAutoSyncEspn();
        });

        // Salvar participante individual
        document.querySelectorAll(".settings-participant-row").forEach(row => {
            const userId = row.dataset.userId;
            const nameInput = row.querySelector(".input-part-name");
            const avatarSelect = row.querySelector(".select-part-avatar");
            const teamSelect = row.querySelector(".select-part-fav-team");
            const logoImg = row.querySelector(".img-part-team-logo");
            const telegramInput = row.querySelector(".input-part-telegram");
            const saveBtn = row.querySelector(".btn-save-participant");
            const deleteBtn = row.querySelector(".btn-delete-participant");

            teamSelect?.addEventListener("change", () => {
                const t = NFL_TEAMS[teamSelect.value];
                if (t && logoImg) logoImg.src = t.logo;
            });

            saveBtn?.addEventListener("click", () => {
                const p = this.data.participants.find(part => part.id === userId);
                if (p) {
                    p.name = nameInput.value.trim() || p.name;
                    p.avatar = avatarSelect.value;
                    p.favTeam = teamSelect.value;
                    p.telegramChatId = telegramInput ? telegramInput.value.trim() : (p.telegramChatId || "");
                    saveBolaoData(this.data);
                    this.showToast(`Dados de ${p.name} atualizados com sucesso!`, "success");
                    this.renderAll();
                }
            });

            deleteBtn?.addEventListener("click", () => {
                if (confirm(`Deseja realmente remover o participante ${nameInput.value}?`)) {
                    this.requestAdminAccess(() => {
                        this.data.participants = this.data.participants.filter(part => part.id !== userId);
                        if (this.activeUserId === userId) {
                            this.activeUserId = this.data.participants[0]?.id || "";
                        }
                        saveBolaoData(this.data);
                        this.showToast("Participante removido.", "warning");
                        this.renderAll();
                    });
                }
            });
        });

        // Adicionar novo amigo
        document.getElementById("formAddFriendInSettings")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("newFriendName").value.trim();
            const avatar = document.getElementById("newFriendAvatar").value;
            const favTeam = document.getElementById("newFriendFavTeam").value;
            const telegramChatId = document.getElementById("newFriendTelegram")?.value.trim() || "";

            if (!name) return;

            const newId = "user_" + Date.now();
            this.data.participants.push({
                id: newId,
                name: name,
                avatar: avatar,
                favTeam: favTeam,
                telegramChatId: telegramChatId,
                createdAt: new Date().toISOString()
            });

            saveBolaoData(this.data);
            this.showToast(`Novo amigo ${name} cadastrado!`, "success");
            this.renderAll();
        });

        // Alterar senha de Admin
        document.getElementById("formChangeAdminPassword")?.addEventListener("submit", (e) => {
            e.preventDefault();
            this.requestAdminAccess(() => {
                const newPass = document.getElementById("inputNewAdminPassword").value.trim();
                if (newPass.length < 3) {
                    alert("A senha deve ter pelo menos 3 caracteres.");
                    return;
                }
                this.data.settings.adminPassword = newPass;
                saveBolaoData(this.data);
                this.showToast(`Senha de administrador alterada para: ${newPass}`, "success");
                this.renderAll();
            });
        });

        // Limpar todos os palpites
        document.getElementById("btnClearAllBets")?.addEventListener("click", () => {
            this.requestAdminAccess(() => {
                if (confirm("Tem certeza que deseja zerar TODAS as apostas feitas até agora?")) {
                    this.data.predictions = {};
                    saveBolaoData(this.data);
                    this.showToast("Todas as apostas foram zeradas com sucesso!", "success");
                    this.renderAll();
                }
            });
        });

        // Restaurar padrão oficial DAZN
        document.getElementById("btnResetOfficialDAZN")?.addEventListener("click", () => {
            this.requestAdminAccess(() => {
                if (confirm("Tem certeza que deseja restaurar a tabela oficial da DAZN com 0 apostas?")) {
                    this.data = JSON.parse(JSON.stringify(INITIAL_BOLAO_DATA));
                    saveBolaoData(this.data);
                    this.showToast("Tabela oficial DAZN restaurada com sucesso!", "success");
                    this.renderAll();
                }
            });
        });

        // Exportar backup JSON
        document.getElementById("btnExportDataSettings")?.addEventListener("click", () => {
            this.exportDataJson();
        });

        // Importar backup JSON
        document.getElementById("importFileInputSettings")?.addEventListener("change", (e) => {
            this.handleImportJson(e);
        });

        // Exportar backup Excel
        document.getElementById("btnExportDataExcel")?.addEventListener("click", () => {
            this.exportDataExcel();
        });

        // Importar backup Excel
        document.getElementById("importExcelInputSettings")?.addEventListener("change", (e) => {
            this.handleImportExcel(e);
        });
    }

    // =========================================================================
    // MODAIS & UTILITÁRIOS
    // =========================================================================

    openAddMatchModal() {
        const modal = document.getElementById("addMatchModal");
        if (!modal) return;

        const teamSelect1 = document.getElementById("newMatchTeam1");
        const teamSelect2 = document.getElementById("newMatchTeam2");

        const teamOptions = Object.values(NFL_TEAMS)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(t => `<option value="${t.id}">${t.name} (${t.shortName})</option>`)
            .join("");

        if (teamSelect1) teamSelect1.innerHTML = teamOptions;
        if (teamSelect2) teamSelect2.innerHTML = teamOptions;

        document.getElementById("newMatchWeek").value = this.currentWeek;
        modal.classList.add("active");
    }

    openUserModal() {
        const modal = document.getElementById("userManageModal");
        if (!modal) return;

        const userListContainer = document.getElementById("modalUserList");
        if (userListContainer) {
            userListContainer.innerHTML = this.data.participants.map(p => {
                const team = NFL_TEAMS[p.favTeam];
                const isActive = (p.id === this.activeUserId);
                return `
                    <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 1rem; background: ${isActive ? 'rgba(37,99,235,0.2)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${isActive ? '#3B82F6' : 'var(--border-subtle)'}; border-radius: var(--radius-md);">
                        <div style="display: flex; align-items: center; gap: 0.75rem;">
                            <span style="font-size: 1.5rem;">${p.avatar || "🏈"}</span>
                            <div>
                                <strong style="color: #FFFFFF; font-size: 1rem;">${p.name}</strong>
                                ${team ? `
                                    <div style="font-size: 0.75rem; color: var(--text-secondary); display: flex; align-items: center; gap: 0.3rem;">
                                        <img src="${team.logo}" style="width: 14px; height: 14px;"> ${team.name}
                                    </div>
                                ` : ''}
                            </div>
                        </div>
                        <div>
                            ${isActive ? `
                                <span style="font-size: 0.75rem; font-weight: 700; color: #38BDF8; background: rgba(56,189,248,0.15); padding: 0.25rem 0.6rem; border-radius: var(--radius-full);">ATIVO</span>
                            ` : `
                                <button class="btn btn-secondary btn-switch-user" data-user-id="${p.id}" style="padding: 0.3rem 0.75rem; font-size: 0.8rem;">
                                    Selecionar
                                </button>
                            `}
                        </div>
                    </div>
                `;
            }).join("");

            userListContainer.querySelectorAll(".btn-switch-user").forEach(b => {
                b.addEventListener("click", (e) => {
                    this.activeUserId = e.currentTarget.dataset.userId;
                    modal.classList.remove("active");
                    this.showToast(`Participante alternado para: ${this.data.participants.find(p => p.id === this.activeUserId)?.name}`, "success");
                    this.renderAll();
                });
            });
        }

        modal.classList.add("active");
    }

    exportDataJson() {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.data, null, 2));
        const downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", `bolao_nfl_2026_${new Date().toISOString().slice(0, 10)}.json`);
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
        this.showToast("Backup JSON exportado com sucesso!", "success");
    }

    handleImportJson(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const imported = JSON.parse(event.target.result);
                if (imported.participants && imported.matches) {
                    this.data = imported;
                    saveBolaoData(this.data);
                    this.showToast("Dados importados com sucesso via JSON!", "success");
                    this.renderAll();
                } else {
                    alert("Arquivo JSON inválido para o Bolão!");
                }
            } catch (err) {
                alert("Erro ao ler arquivo JSON: " + err.message);
            }
        };
        reader.readAsText(file);
    }

    exportDataExcel() {
        if (!window.XLSX) {
            alert("Biblioteca Excel não foi carregada corretamente. Verifique sua conexão com a internet.");
            return;
        }

        try {
            const wb = XLSX.utils.book_new();

            // Aba 1: Confrontos & Placares Oficiais
            const matchesData = this.data.matches.map(m => ({
                ID: m.id,
                Semana: m.week,
                Data: m.date,
                Horario: m.time,
                Visitante: m.team1,
                Placar_Visitante: m.score1 !== null && m.score1 !== undefined ? m.score1 : "",
                Mandante: m.team2,
                Placar_Mandante: m.score2 !== null && m.score2 !== undefined ? m.score2 : "",
                Status: m.status || "scheduled"
            }));
            const wsMatches = XLSX.utils.json_to_sheet(matchesData);
            XLSX.utils.book_append_sheet(wb, wsMatches, "Jogos_e_Placares");

            // Aba 2: Palpites dos Participantes
            const predictionsRows = [];
            this.data.matches.forEach(m => {
                const matchPreds = this.data.predictions[m.id] || {};
                this.data.participants.forEach(p => {
                    const pred = matchPreds[p.id] || {};
                    predictionsRows.push({
                        Jogo_ID: m.id,
                        Semana: m.week,
                        Jogo: `${m.team1} @ ${m.team2}`,
                        Participante_ID: p.id,
                        Participante_Nome: p.name,
                        Time_Apostado: pred.winner || "",
                        Diferenca_Pontos: pred.diff !== null && pred.diff !== undefined ? pred.diff : ""
                    });
                });
            });
            const wsPredictions = XLSX.utils.json_to_sheet(predictionsRows);
            XLSX.utils.book_append_sheet(wb, wsPredictions, "Palpites");

            // Aba 3: Participantes
            const participantsData = this.data.participants.map(p => ({
                ID: p.id,
                Nome: p.name,
                Avatar: p.avatar,
                Time_Coracao: p.favTeam
            }));
            const wsParticipants = XLSX.utils.json_to_sheet(participantsData);
            XLSX.utils.book_append_sheet(wb, wsParticipants, "Participantes");

            // Aba 4: Configurações do Bolão
            const settingsData = [
                { Chave: "pointsWinner", Valor: this.data.settings.pointsWinner },
                { Chave: "pointsExactDiff", Valor: this.data.settings.pointsExactDiff },
                { Chave: "season", Valor: this.data.settings.season },
                { Chave: "adminPassword", Valor: this.data.settings.adminPassword || "Pats87" }
            ];
            const wsSettings = XLSX.utils.json_to_sheet(settingsData);
            XLSX.utils.book_append_sheet(wb, wsSettings, "Configuracoes");

            const fileName = `bolao_nfl_2026_${new Date().toISOString().slice(0, 10)}.xlsx`;
            XLSX.writeFile(wb, fileName);
            this.showToast("Backup em Excel (.xlsx) exportado com sucesso!", "success");
        } catch (err) {
            console.error("Erro ao exportar Excel:", err);
            alert("Erro ao gerar planilha Excel: " + err.message);
        }
    }

    handleImportExcel(e) {
        const file = e.target.files[0];
        if (!file) return;

        if (!window.XLSX) {
            alert("Biblioteca Excel não disponível.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                // Ler Jogos_e_Placares
                if (workbook.Sheets["Jogos_e_Placares"]) {
                    const matchesRows = XLSX.utils.sheet_to_json(workbook.Sheets["Jogos_e_Placares"]);
                    matchesRows.forEach(row => {
                        const targetMatch = this.data.matches.find(m => m.id === row.ID || (m.week === row.Semana && m.team1 === row.Visitante && m.team2 === row.Mandante));
                        if (targetMatch) {
                            targetMatch.score1 = (row.Placar_Visitante !== "" && row.Placar_Visitante !== undefined && row.Placar_Visitante !== null) ? parseInt(row.Placar_Visitante, 10) : null;
                            targetMatch.score2 = (row.Placar_Mandante !== "" && row.Placar_Mandante !== undefined && row.Placar_Mandante !== null) ? parseInt(row.Placar_Mandante, 10) : null;
                            if (row.Status) targetMatch.status = row.Status;
                        }
                    });
                }

                // Ler Participantes
                if (workbook.Sheets["Participantes"]) {
                    const participantsRows = XLSX.utils.sheet_to_json(workbook.Sheets["Participantes"]);
                    participantsRows.forEach(row => {
                        let existing = this.data.participants.find(p => p.id === row.ID || p.name === row.Nome);
                        if (existing) {
                            if (row.Nome) existing.name = row.Nome;
                            if (row.Avatar) existing.avatar = row.Avatar;
                            if (row.Time_Coracao) existing.favTeam = row.Time_Coracao;
                        } else if (row.Nome) {
                            this.data.participants.push({
                                id: row.ID || ("user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4)),
                                name: row.Nome,
                                avatar: row.Avatar || "🏈",
                                favTeam: row.Time_Coracao || "KC",
                                createdAt: new Date().toISOString()
                            });
                        }
                    });
                }

                // Ler Palpites
                if (workbook.Sheets["Palpites"]) {
                    const predictionsRows = XLSX.utils.sheet_to_json(workbook.Sheets["Palpites"]);
                    predictionsRows.forEach(row => {
                        const matchId = row.Jogo_ID;
                        const userId = row.Participante_ID;
                        const winner = row.Time_Apostado;
                        const diff = row.Diferenca_Pontos;

                        if (matchId && userId && winner) {
                            if (!this.data.predictions[matchId]) {
                                this.data.predictions[matchId] = {};
                            }
                            this.data.predictions[matchId][userId] = {
                                winner: winner,
                                diff: parseInt(diff, 10) || 0,
                                updatedAt: new Date().toISOString()
                            };
                        }
                    });
                }

                // Ler Configuracoes
                if (workbook.Sheets["Configuracoes"]) {
                    const settingsRows = XLSX.utils.sheet_to_json(workbook.Sheets["Configuracoes"]);
                    settingsRows.forEach(row => {
                        if (row.Chave && row.Valor !== undefined) {
                            this.data.settings[row.Chave] = row.Valor;
                        }
                    });
                }

                saveBolaoData(this.data);
                this.showToast("Backup em Excel importado e sincronizado com sucesso!", "success");
                this.renderAll();

                // Limpa o input de arquivo
                e.target.value = "";
            } catch (err) {
                console.error("Erro ao ler Excel:", err);
                alert("Erro ao importar planilha Excel: " + err.message);
            }
        };
        reader.readAsArrayBuffer(file);
    }

    bindEvents() {
        // Navegação das abas principais
        document.querySelectorAll(".nav-tab-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const targetView = e.currentTarget.dataset.view;
                this.switchView(targetView);
            });
        });

        // Botão de usuário no cabeçalho
        document.getElementById("activeUserBtn")?.addEventListener("click", () => {
            this.openUserModal();
        });

        // Botão de Admin no cabeçalho
        document.getElementById("adminBadgeBtn")?.addEventListener("click", () => {
            if (this.isAdmin) {
                this.logoutAdmin();
            } else {
                this.requestAdminAccess(() => {
                    this.switchView("admin");
                });
            }
        });

        // Formulário de senha do admin
        document.getElementById("formAdminAuth")?.addEventListener("submit", (e) => {
            this.handleAdminAuthSubmit(e);
        });

        // Fechar modais ao clicar no X ou fora
        document.querySelectorAll(".btn-close-modal, .modal-overlay").forEach(el => {
            el.addEventListener("click", (e) => {
                if (e.target === el || el.classList.contains("btn-close-modal")) {
                    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));
                }
            });
        });

        // Formulário de Criação de Novo Jogo
        document.getElementById("formAddMatch")?.addEventListener("submit", (e) => {
            e.preventDefault();
            const week = parseInt(document.getElementById("newMatchWeek").value, 10);
            const date = document.getElementById("newMatchDate").value.trim() || "Dom 15/09";
            const time = document.getElementById("newMatchTime").value.trim() || "14:00";
            const team1 = document.getElementById("newMatchTeam1").value;
            const team2 = document.getElementById("newMatchTeam2").value;

            if (team1 === team2) {
                alert("Os dois times não podem ser iguais!");
                return;
            }

            const newMatch = {
                id: `s${String(week).padStart(2, '0')}_g${Date.now().toString().slice(-4)}`,
                week: week,
                date: date,
                time: time,
                team1: team1,
                team2: team2,
                score1: null,
                score2: null,
                status: "scheduled"
            };

            this.data.matches.push(newMatch);
            saveBolaoData(this.data);
            document.getElementById("addMatchModal")?.classList.remove("active");
            this.showToast("Novo jogo adicionado à agenda!", "success");
            this.currentWeek = week;
            this.renderAll();
        });
    }

    updateNavTabs() {
        document.querySelectorAll(".nav-tab-btn").forEach(btn => {
            btn.classList.toggle("active", btn.dataset.view === this.currentView);
        });
    }

    showToast(message, type = "info") {
        const container = document.getElementById("toastContainer");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
            <span>${message}</span>
        `;
        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(50px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
}

// Inicializa a aplicação quando a página carregar
window.addEventListener("DOMContentLoaded", () => {
    window.bolaoApp = new BolaoApp();
});
