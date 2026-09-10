// =============================================================================
// BOLÃƒO NFL 2026-2027 - BANCO DE DADOS OFICIAL DA TEMPORADA 2026-2027
// CalendÃ¡rio Oficial DAZN / NFL
// =============================================================================

const NFL_TEAMS = {
    KC: { id: "KC", name: "Kansas City Chiefs", shortName: "Chiefs", city: "Kansas City", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/kc.png", color: "#E31837", altColor: "#FFB81C" },
    BAL: { id: "BAL", name: "Baltimore Ravens", shortName: "Ravens", city: "Baltimore", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/bal.png", color: "#241773", altColor: "#000000" },
    PHI: { id: "PHI", name: "Philadelphia Eagles", shortName: "Eagles", city: "Philadelphia", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/phi.png", color: "#004C54", altColor: "#A5ACAF" },
    GB: { id: "GB", name: "Green Bay Packers", shortName: "Packers", city: "Green Bay", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/gb.png", color: "#203731", altColor: "#FFB612" },
    CHI: { id: "CHI", name: "Chicago Bears", shortName: "Bears", city: "Chicago", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/chi.png", color: "#0B162A", altColor: "#C83803" },
    TEN: { id: "TEN", name: "Tennessee Titans", shortName: "Titans", city: "Tennessee", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ten.png", color: "#0C2340", altColor: "#4B92DB" },
    NO: { id: "NO", name: "New Orleans Saints", shortName: "Saints", city: "New Orleans", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/no.png", color: "#D3BC8D", altColor: "#101820" },
    CAR: { id: "CAR", name: "Carolina Panthers", shortName: "Panthers", city: "Carolina", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/car.png", color: "#0085CA", altColor: "#101820" },
    ATL: { id: "ATL", name: "Atlanta Falcons", shortName: "Falcons", city: "Atlanta", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/atl.png", color: "#A71930", altColor: "#000000" },
    PIT: { id: "PIT", name: "Pittsburgh Steelers", shortName: "Steelers", city: "Pittsburgh", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/pit.png", color: "#FFB612", altColor: "#101820" },
    BUF: { id: "BUF", name: "Buffalo Bills", shortName: "Bills", city: "Buffalo", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/buf.png", color: "#00338D", altColor: "#C60C30" },
    ARI: { id: "ARI", name: "Arizona Cardinals", shortName: "Cardinals", city: "Arizona", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ari.png", color: "#97233F", altColor: "#000000" },
    CIN: { id: "CIN", name: "Cincinnati Bengals", shortName: "Bengals", city: "Cincinnati", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cin.png", color: "#FB4F14", altColor: "#000000" },
    NE: { id: "NE", name: "New England Patriots", shortName: "Patriots", city: "New England", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ne.png", color: "#002244", altColor: "#C60C30" },
    IND: { id: "IND", name: "Indianapolis Colts", shortName: "Colts", city: "Indianapolis", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/ind.png", color: "#002C5F", altColor: "#A2AAAD" },
    HOU: { id: "HOU", name: "Houston Texans", shortName: "Texans", city: "Houston", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/hou.png", color: "#03202F", altColor: "#A71930" },
    MIA: { id: "MIA", name: "Miami Dolphins", shortName: "Dolphins", city: "Miami", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/mia.png", color: "#008E97", altColor: "#FC4C02" },
    JAX: { id: "JAX", name: "Jacksonville Jaguars", shortName: "Jaguars", city: "Jacksonville", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/jax.png", color: "#006778", altColor: "#D7A22A" },
    NYG: { id: "NYG", name: "New York Giants", shortName: "Giants", city: "New York", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyg.png", color: "#0B2265", altColor: "#A71930" },
    MIN: { id: "MIN", name: "Minnesota Vikings", shortName: "Vikings", city: "Minnesota", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/min.png", color: "#4F2683", altColor: "#FFC62F" },
    LAC: { id: "LAC", name: "Los Angeles Chargers", shortName: "Chargers", city: "Los Angeles", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lac.png", color: "#0080C6", altColor: "#FFC20E" },
    LV: { id: "LV", name: "Las Vegas Raiders", shortName: "Raiders", city: "Las Vegas", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lv.png", color: "#000000", altColor: "#A5ACAF" },
    SEA: { id: "SEA", name: "Seattle Seahawks", shortName: "Seahawks", city: "Seattle", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sea.png", color: "#002244", altColor: "#69BE28" },
    DEN: { id: "DEN", name: "Denver Broncos", shortName: "Broncos", city: "Denver", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/den.png", color: "#FB4F14", altColor: "#002244" },
    CLE: { id: "CLE", name: "Cleveland Browns", shortName: "Browns", city: "Cleveland", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/cle.png", color: "#311D00", altColor: "#FF3C00" },
    DAL: { id: "DAL", name: "Dallas Cowboys", shortName: "Cowboys", city: "Dallas", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/dal.png", color: "#041E42", altColor: "#869397" },
    TB: { id: "TB", name: "Tampa Bay Buccaneers", shortName: "Buccaneers", city: "Tampa Bay", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/tb.png", color: "#D50A0A", altColor: "#34302B" },
    WSH: { id: "WSH", name: "Washington Commanders", shortName: "Commanders", city: "Washington", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/wsh.png", color: "#5A1414", altColor: "#FFB612" },
    LAR: { id: "LAR", name: "Los Angeles Rams", shortName: "Rams", city: "Los Angeles", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/lar.png", color: "#003594", altColor: "#FFA300" },
    DET: { id: "DET", name: "Detroit Lions", shortName: "Lions", city: "Detroit", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/det.png", color: "#0076B6", altColor: "#B0B7BC" },
    NYJ: { id: "NYJ", name: "New York Jets", shortName: "Jets", city: "New York", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/nyj.png", color: "#125740", altColor: "#000000" },
    SF: { id: "SF", name: "San Francisco 49ers", shortName: "49ers", city: "San Francisco", logo: "https://a.espncdn.com/i/teamlogos/nfl/500/sf.png", color: "#AA0000", altColor: "#B3995D" }
};

const INITIAL_BOLAO_DATA = {
    settings: {
        season: "2026-2027",
        pointsWinner: 1,
        pointsExactDiff: 1,
        timezone: "America/Sao_Paulo",
        adminPassword: "Pats87",
        autoSyncEspn: false
    },
    auditLogs: [],
    predictions: {},
    participants: [
        { id: "user_angel", name: "Angel", avatar: "\u{1F3C8}", favTeam: "KC", createdAt: "2026-09-01T10:00:00Z" },
        { id: "user_caio", name: "Caio", avatar: "\u{26A1}", favTeam: "LAC", createdAt: "2026-09-01T10:00:00Z" },
        { id: "user_dinho", name: "Dinho", avatar: "\u{1F985}", favTeam: "PHI", createdAt: "2026-09-01T10:00:00Z" }
    ],
            matches: [
    {
        "id": "s01_g01",
        "score1": null,"team2":  "SEA",
        "score2":  null,
        "team1":  "NE",
        "time":  "21:20",
        "date":  "Qua, 9/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g02",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "SF",
        "time":  "21:35",
        "date":  "Qui, 10/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g03",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "CHI",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g04",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "TB",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g05",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "BAL",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g06",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "BUF",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g07",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "NO",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g08",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g09",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "ATL",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g10",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "CLE",
        "time":  "14:00",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g11",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "ARI",
        "time":  "17:25",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g12",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "GB",
        "time":  "17:25",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g13",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "MIA",
        "time":  "17:25",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g14",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "WSH",
        "time":  "17:25",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g15",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "DAL",
        "time":  "21:20",
        "date":  "Dom, 13/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s01_g16",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "DEN",
        "time":  "21:15",
        "date":  "Seg, 14/09",
        "status":  "scheduled",
        "week":  1
    },
    {
        "id":  "s02_g01",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "DET",
        "time":  "21:15",
        "date":  "Qui, 17/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g02",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "MIN",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g03",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "PHI",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g04",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "GB",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g05",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "CAR",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g06",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "NO",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g07",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "CIN",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g08",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "CLE",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g09",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "PIT",
        "time":  "14:00",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g10",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "LV",
        "time":  "17:05",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g11",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "JAX",
        "time":  "17:05",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g12",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "WSH",
        "time":  "17:25",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g13",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "SEA",
        "time":  "17:25",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g14",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "IND",
        "time":  "21:20",
        "date":  "Dom, 20/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s02_g15",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "NYG",
        "time":  "21:15",
        "date":  "Seg, 21/09",
        "status":  "scheduled",
        "week":  2
    },
    {
        "id":  "s03_g01",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "ATL",
        "time":  "21:15",
        "date":  "Qui, 24/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g02",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "KC",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g03",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "HOU",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g04",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "TEN",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g05",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "NE",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g06",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "CIN",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g07",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "CAR",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g08",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g09",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "SEA",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g10",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "LAC",
        "time":  "14:00",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g11",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "MIN",
        "time":  "17:05",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g12",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "BAL",
        "time":  "17:25",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g13",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "LV",
        "time":  "17:25",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g14",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "LAR",
        "time":  "21:20",
        "date":  "Dom, 27/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s03_g15",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "PHI",
        "time":  "21:15",
        "date":  "Seg, 28/09",
        "status":  "scheduled",
        "week":  3
    },
    {
        "id":  "s04_g01",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "IND",
        "time":  "10:30",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g02",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "TEN",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g03",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "ARI",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g04",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "JAX",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g05",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "NE",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g06",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "DAL",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g07",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "LAR",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g08",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "GB",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g09",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "14:00",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g10",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "MIA",
        "time":  "17:05",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g11",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "LAC",
        "time":  "17:25",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g12",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "KC",
        "time":  "17:25",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g13",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "DET",
        "time":  "21:20",
        "date":  "Dom, 4/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s04_g14",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "ATL",
        "time":  "21:15",
        "date":  "Seg, 5/10",
        "status":  "scheduled",
        "week":  4
    },
    {
        "id":  "s05_g01",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "TB",
        "time":  "21:15",
        "date":  "Qui, 8/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g02",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "PHI",
        "time":  "10:30",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g03",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "LV",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g04",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "HOU",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g05",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "CLE",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g06",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "IND",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g07",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "CIN",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g08",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "MIN",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g09",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "NYG",
        "time":  "14:00",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g10",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "DEN",
        "time":  "17:05",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g11",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "CHI",
        "time":  "17:25",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g12",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "DET",
        "time":  "17:25",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g13",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "SF",
        "time":  "17:25",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g14",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "BAL",
        "time":  "21:20",
        "date":  "Dom, 11/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s05_g15",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "BUF",
        "time":  "21:15",
        "date":  "Seg, 12/10",
        "status":  "scheduled",
        "week":  5
    },
    {
        "id":  "s06_g01",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "SEA",
        "time":  "21:15",
        "date":  "Qui, 15/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g02",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "HOU",
        "time":  "10:30",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g03",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g04",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "PIT",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g05",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "CAR",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g06",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "CHI",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g07",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "TEN",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g08",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "NO",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g09",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "BAL",
        "time":  "14:00",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g10",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "ARI",
        "time":  "17:05",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g11",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "LAC",
        "time":  "17:25",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g12",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "BUF",
        "time":  "17:25",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s06_g13",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "DAL",
        "time":  "21:20",
        "date":  "Dom, 18/10",
        "status":  "scheduled",
        "week":  6
    },
    {
        "id":  "s07_g01",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "NE",
        "time":  "21:15",
        "date":  "Qui, 22/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g02",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "PIT",
        "time":  "10:30",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g03",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "CLE",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g04",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "MIA",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g05",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "IND",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g06",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "CIN",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g07",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "NYG",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g08",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "TB",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g09",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "SF",
        "time":  "14:00",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g10",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "DEN",
        "time":  "17:50",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g11",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "LAR",
        "time":  "17:25",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g12",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "GB",
        "time":  "17:25",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g13",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "KC",
        "time":  "21:20",
        "date":  "Dom, 25/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s07_g14",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "DAL",
        "time":  "21:15",
        "date":  "Seg, 26/10",
        "status":  "scheduled",
        "week":  7
    },
    {
        "id":  "s08_g01",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "CAR",
        "time":  "21:15",
        "date":  "Qui, 29/10",
        "status":  "scheduled",
        "week":  8
    },
    {
        "id":  "s08_g02",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "CHI",
        "time":  "21:15",
        "date":  "Seg, 2/11",
        "status":  "scheduled",
        "week":  8
    },
    {
        "id":  "s09_g01",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "JAX",
        "time":  "22:15",
        "date":  "Qui, 5/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g02",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "CIN",
        "time":  "11:30",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g03",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g04",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "CLE",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g05",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "DEN",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g06",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "DAL",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g07",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "DET",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g08",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "NYG",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g09",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "LAR",
        "time":  "15:00",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g10",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "HOU",
        "time":  "18:05",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g11",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "ARI",
        "time":  "18:25",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g12",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "GB",
        "time":  "18:25",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g13",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "TB",
        "time":  "22:20",
        "date":  "Dom, 8/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s09_g14",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "BUF",
        "time":  "22:15",
        "date":  "Seg, 9/11",
        "status":  "scheduled",
        "week":  9
    },
    {
        "id":  "s10_g01",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "WSH",
        "time":  "22:15",
        "date":  "Qui, 12/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g02",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "NE",
        "time":  "11:30",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g03",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "BUF",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g04",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "MIA",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g05",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "KC",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g06",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "MIN",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g07",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "JAX",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g08",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "HOU",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g09",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "CAR",
        "time":  "15:00",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g10",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "LAR",
        "time":  "18:05",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g11",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "SEA",
        "time":  "18:05",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g12",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "SF",
        "time":  "18:25",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g13",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "PIT",
        "time":  "22:20",
        "date":  "Dom, 15/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s10_g14",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "LAC",
        "time":  "22:15",
        "date":  "Seg, 16/11",
        "status":  "scheduled",
        "week":  10
    },
    {
        "id":  "s11_g01",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "IND",
        "time":  "22:15",
        "date":  "Qui, 19/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g02",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "ARI",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g03",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "TB",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g04",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "JAX",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g05",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "MIA",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g06",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "TEN",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g07",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "BAL",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g08",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "NO",
        "time":  "15:00",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g09",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "18:05",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g10",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "PIT",
        "time":  "18:25",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g11",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "LV",
        "time":  "18:25",
        "date":  "Dom, 22/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s11_g12",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "CIN",
        "time":  "22:15",
        "date":  "Seg, 23/11",
        "status":  "scheduled",
        "week":  11
    },
    {
        "id":  "s12_g01",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "GB",
        "time":  "22:00",
        "date":  "Qua, 25/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g02",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "CHI",
        "time":  "15:00",
        "date":  "Qui, 26/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g03",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "PHI",
        "time":  "18:30",
        "date":  "Qui, 26/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g04",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "KC",
        "time":  "22:20",
        "date":  "Qui, 26/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g05",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "DEN",
        "time":  "17:00",
        "date":  "Sex, 27/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g06",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "BAL",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g07",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "NO",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g08",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g09",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "ATL",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g10",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "NYG",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g11",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "LV",
        "time":  "15:00",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g12",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "TEN",
        "time":  "18:05",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g13",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "WSH",
        "time":  "18:25",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g14",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "NE",
        "time":  "22:20",
        "date":  "Dom, 29/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s12_g15",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "CAR",
        "time":  "22:15",
        "date":  "Seg, 30/11",
        "status":  "scheduled",
        "week":  12
    },
    {
        "id":  "s13_g01",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "KC",
        "time":  "22:15",
        "date":  "Qui, 3/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g02",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "DET",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g03",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "LAC",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g04",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "WSH",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g05",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "CIN",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g06",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "SF",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g07",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "GB",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g08",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "JAX",
        "time":  "15:00",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g09",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "PHI",
        "time":  "18:05",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g10",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "MIA",
        "time":  "18:05",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g11",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "CAR",
        "time":  "18:25",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g12",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "BUF",
        "time":  "18:25",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g13",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "HOU",
        "time":  "22:20",
        "date":  "Dom, 6/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s13_g14",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "DAL",
        "time":  "22:15",
        "date":  "Seg, 7/12",
        "status":  "scheduled",
        "week":  13
    },
    {
        "id":  "s14_g01",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "MIN",
        "time":  "22:15",
        "date":  "Qui, 10/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g02",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "DEN",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g03",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "ATL",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g04",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "CHI",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g05",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "HOU",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g06",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "NO",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g07",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "IND",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g08",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "TB",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g09",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "TEN",
        "time":  "15:00",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g10",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "LAC",
        "time":  "18:05",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g11",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "KC",
        "time":  "18:25",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g12",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "NYG",
        "time":  "18:25",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g13",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "BUF",
        "time":  "22:20",
        "date":  "Dom, 13/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s14_g14",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "PIT",
        "time":  "22:15",
        "date":  "Seg, 14/12",
        "status":  "scheduled",
        "week":  14
    },
    {
        "id":  "s15_g01",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "SF",
        "time":  "22:15",
        "date":  "Qui, 17/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g02",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "JAX",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g03",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "BAL",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g04",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "CLE",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g05",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "IND",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g06",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "MIA",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g07",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "NO",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g08",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "CIN",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g09",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "ATL",
        "time":  "15:00",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g10",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "18:05",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g11",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "DAL",
        "time":  "18:25",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g12",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "DEN",
        "time":  "18:25",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g13",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "DET",
        "time":  "22:20",
        "date":  "Dom, 20/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s15_g14",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "NE",
        "time":  "22:15",
        "date":  "Seg, 21/12",
        "status":  "scheduled",
        "week":  15
    },
    {
        "id":  "s16_g01",
        "score1":  null,
        "team2":  "PHI",
        "score2":  null,
        "team1":  "HOU",
        "time":  "22:15",
        "date":  "Qui, 24/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g02",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "GB",
        "time":  "15:00",
        "date":  "Sex, 25/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g03",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "BUF",
        "time":  "18:30",
        "date":  "Sex, 25/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g04",
        "score1":  null,
        "team2":  "SEA",
        "score2":  null,
        "team1":  "LAR",
        "time":  "22:15",
        "date":  "Sex, 25/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g05",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "TB",
        "time":  "TBD",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g06",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "WSH",
        "time":  "TBD",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g07",
        "score1":  null,
        "team2":  "PIT",
        "score2":  null,
        "team1":  "CAR",
        "time":  "TBD",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g08",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "CIN",
        "time":  "TBD",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g09",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "NE",
        "time":  "15:00",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g10",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "CLE",
        "time":  "15:00",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g11",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "LAC",
        "time":  "15:00",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g12",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "ARI",
        "time":  "15:00",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g13",
        "score1":  null,
        "team2":  "LV",
        "score2":  null,
        "team1":  "TEN",
        "time":  "18:05",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g14",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "SF",
        "time":  "18:25",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g15",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "JAX",
        "time":  "22:20",
        "date":  "Dom, 27/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s16_g16",
        "score1":  null,
        "team2":  "DET",
        "score2":  null,
        "team1":  "NYG",
        "time":  "22:15",
        "date":  "Seg, 28/12",
        "status":  "scheduled",
        "week":  16
    },
    {
        "id":  "s17_g01",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "BAL",
        "time":  "22:15",
        "date":  "Qui, 31/12",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g02",
        "score1":  null,
        "team2":  "TB",
        "score2":  null,
        "team1":  "LAR",
        "time":  "TBD",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g03",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "DEN",
        "time":  "TBD",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g04",
        "score1":  null,
        "team2":  "LAC",
        "score2":  null,
        "team1":  "KC",
        "time":  "TBD",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g05",
        "score1":  null,
        "team2":  "JAX",
        "score2":  null,
        "team1":  "WSH",
        "time":  "TBD",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g06",
        "score1":  null,
        "team2":  "MIA",
        "score2":  null,
        "team1":  "BUF",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g07",
        "score1":  null,
        "team2":  "TEN",
        "score2":  null,
        "team1":  "PIT",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g08",
        "score1":  null,
        "team2":  "NYJ",
        "score2":  null,
        "team1":  "MIN",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g09",
        "score1":  null,
        "team2":  "ATL",
        "score2":  null,
        "team1":  "NO",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g10",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "SEA",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g11",
        "score1":  null,
        "team2":  "CLE",
        "score2":  null,
        "team1":  "IND",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g12",
        "score1":  null,
        "team2":  "DAL",
        "score2":  null,
        "team1":  "NYG",
        "time":  "15:00",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g13",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "team1":  "LV",
        "time":  "18:05",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g14",
        "score1":  null,
        "team2":  "CHI",
        "score2":  null,
        "team1":  "DET",
        "time":  "18:25",
        "date":  "Dom, 3/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s17_g15",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "HOU",
        "time":  "22:15",
        "date":  "Seg, 4/01",
        "status":  "scheduled",
        "week":  17
    },
    {
        "id":  "s18_g01",
        "score1":  null,
        "team2":  "BUF",
        "score2":  null,
        "team1":  "NYJ",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g02",
        "score1":  null,
        "team2":  "IND",
        "score2":  null,
        "team1":  "JAX",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g03",
        "score1":  null,
        "team2":  "KC",
        "score2":  null,
        "team1":  "LV",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g04",
        "score1":  null,
        "team2":  "HOU",
        "score2":  null,
        "team1":  "TEN",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g05",
        "score1":  null,
        "team2":  "DEN",
        "score2":  null,
        "team1":  "LAC",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g06",
        "score1":  null,
        "team2":  "NE",
        "score2":  null,
        "team1":  "MIA",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g07",
        "score1":  null,
        "team2":  "CIN",
        "score2":  null,
        "team1":  "CLE",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g08",
        "score1":  null,
        "team2":  "BAL",
        "score2":  null,
        "team1":  "PIT",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g09",
        "score1":  null,
        "team2":  "MIN",
        "score2":  null,
        "team1":  "CHI",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g10",
        "score1":  null,
        "team2":  "GB",
        "score2":  null,
        "team1":  "DET",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g11",
        "score1":  null,
        "team2":  "WSH",
        "score2":  null,
        "team1":  "DAL",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g12",
        "score1":  null,
        "team2":  "NO",
        "score2":  null,
        "team1":  "TB",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g13",
        "score1":  null,
        "team2":  "NYG",
        "score2":  null,
        "team1":  "PHI",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g14",
        "score1":  null,
        "team2":  "LAR",
        "score2":  null,
        "team1":  "SEA",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g15",
        "score1":  null,
        "team2":  "CAR",
        "score2":  null,
        "team1":  "ATL",
        "time":  "TBD",
        "date":  "Dom, 10/01",
        "status":  "scheduled",
        "week":  18
    },
    {
        "id":  "s18_g16",
        "score1":  null,
        "team2":  "ARI",
        "score2":  null,
        "status":  "scheduled",
        "week":  18
    }
]
,
    predictions: {}
};

// =============================================================================
// CONEXÃO COM A NUVEM SUPABASE (SINCRONIZAÇÃO EM TEMPO REAL)
// =============================================================================
const SUPABASE_URL = "https://lvdzifguxgxtufmmluco.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2ZHppZmd1eGd4dHVmbW1sdWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5ODY4OTgsImV4cCI6MjEwNDU2Mjg5OH0.MeoIJHK040eKzNTIuOMEQNjUXB-sLoxd02treJ2UlUI";

let supabaseClient = null;
if (window.supabase) {
    try {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    } catch (err) {
        console.error("Erro ao inicializar Supabase:", err);
    }
}

function loadBolaoData() {
    try {
        const saved = localStorage.getItem("nfl_bolao_2026_data_v2");
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.matches && parsed.matches.length > 0) {
                // Garante que a lista de partidas esteja sempre sincronizada com a tabela oficial (datas, times, horas e status)
                parsed.matches = INITIAL_BOLAO_DATA.matches;

                if (!parsed.settings) parsed.settings = {};
                if (!parsed.settings.adminPassword) parsed.settings.adminPassword = "Pats87";
                if (!parsed.auditLogs) parsed.auditLogs = [];
                if (!parsed.predictions) parsed.predictions = {};
                
                // Atualiza o storage com os dados corrigidos
                saveBolaoData(parsed);
                return parsed;
            }
        }
    } catch (e) {
        console.error("Erro ao carregar dados do localStorage:", e);
    }
    return JSON.parse(JSON.stringify(INITIAL_BOLAO_DATA));
}

let cachedUserIp = null;
async function fetchUserIp() {
    if (cachedUserIp) return cachedUserIp;
    try {
        const res = await fetch("https://api.ipify.org?format=json");
        if (res.ok) {
            const json = await res.json();
            if (json && json.ip) {
                cachedUserIp = json.ip;
                return cachedUserIp;
            }
        }
    } catch (e) {
        console.warn("Não foi possível obter o IP via ipify:", e);
    }
    cachedUserIp = "Desconhecido/Local";
    return cachedUserIp;
}

function parseMatchKickoffDate(match) {
    if (!match || !match.date || !match.time) return null;
    try {
        // Formatos aceitos ex: "Qua, 9/09", "Qui, 10/09", "10/09", "10/09/2026"
        const parts = match.date.split(",");
        const datePart = (parts.length > 1 ? parts[1] : parts[0]).trim();
        const dateSegments = datePart.split("/").map(s => s.trim());

        const day = parseInt(dateSegments[0], 10);
        const month = parseInt(dateSegments[1], 10) - 1;

        const timeParts = match.time.split(":").map(s => s.trim());
        const hour = parseInt(timeParts[0], 10);
        const min = parseInt(timeParts[1], 10);

        if (isNaN(day) || isNaN(month) || isNaN(hour) || isNaN(min)) {
            return null;
        }

        let year;
        if (dateSegments.length >= 3 && !isNaN(parseInt(dateSegments[2], 10))) {
            year = parseInt(dateSegments[2], 10);
        } else if (match.year && !isNaN(parseInt(match.year, 10))) {
            year = parseInt(match.year, 10);
        } else {
            const now = new Date();
            const currentYear = now.getFullYear();
            // Se o mês for setembro (8) a dezembro (11), usa o ano atual
            year = (month >= 8) ? currentYear : (currentYear + 1);
        }

        const d = new Date(year, month, day, hour, min, 0);
        return isNaN(d.getTime()) ? null : d;
    } catch (err) {
        console.error("Erro ao converter data do jogo:", err);
        return null;
    }
}

function isMatchLockedByTime(match) {
    if (!match) return false;
    // Jogo encerrado ou com placar preenchido trava
    if (match.status === "finished" || match.status === "in_progress") return true;
    if (match.score1 !== null && match.score1 !== undefined && match.score1 !== "") return true;

    const kickoffDate = parseMatchKickoffDate(match);
    if (!kickoffDate) return false;

    // Compara o horário atual com o horário de kickoff do jogo
    return Date.now() >= kickoffDate.getTime();
}

function saveBolaoData(data) {
    try {
        localStorage.setItem("nfl_bolao_2026_data_v2", JSON.stringify(data));
    } catch (e) {
        console.error("Erro ao salvar dados no localStorage:", e);
    }

    if (supabaseClient) {
        supabaseClient
            .from("nfl_bolao_store")
            .upsert({ id: "main_data", data: data, updated_at: new Date().toISOString() })
            .then(({ error }) => {
                if (error) console.error("Erro ao sincronizar com nuvem (Supabase):", error);
            });
    }
}

async function fetchRemoteBolaoData() {
    if (!supabaseClient) return null;
    try {
        const { data, error } = await supabaseClient
            .from("nfl_bolao_store")
            .select("data")
            .eq("id", "main_data")
            .single();

        if (error) {
            console.warn("Nenhum dado remoto encontrado ainda ou erro ao buscar:", error.message);
            return null;
        }

        if (data && data.data) {
            if (!data.data.auditLogs) data.data.auditLogs = [];
            localStorage.setItem("nfl_bolao_2026_data_v2", JSON.stringify(data.data));
            return data.data;
        }
    } catch (err) {
        console.error("Exceção ao buscar dados remotos:", err);
    }
    return null;
}

function setupRealtimeSubscription(onRemoteUpdateCallback) {
    if (!supabaseClient) return;

    supabaseClient
        .channel("public:nfl_bolao_store")
        .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "nfl_bolao_store", filter: "id=eq.main_data" },
            (payload) => {
                if (payload.new && payload.new.data) {
                    const newData = payload.new.data;
                    if (!newData.auditLogs) newData.auditLogs = [];
                    localStorage.setItem("nfl_bolao_2026_data_v2", JSON.stringify(newData));
                    if (onRemoteUpdateCallback) {
                        onRemoteUpdateCallback(newData);
                    }
                }
            }
        )
        .subscribe();
}