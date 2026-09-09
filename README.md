# 🏈 Bolão NFL 2026-2027

Aplicação web moderna, temática e elegante desenvolvida especialmente para o **Bolão da NFL (Temporada 2026-2027)**, atualizada com a **tabela oficial completa da DAZN** para as 18 semanas de confrontos, sistema de proteção por senha de administrador e aba completa de configurações.

---

## 🚀 Como Abrir e Usar

1. Basta dar um **duplo clique no arquivo [`index.html`](file:///c:/Users/Multiner/OneDrive/Área%20de%20Trabalho/NFL%202026/index.html)**.
2. Abre instantaneamente em qualquer navegador moderno (Chrome, Microsoft Edge, Firefox, etc.) sem precisar rodar comandos no terminal nem instalar pacotes.

---

## 🔐 Acesso do Administrador

- Para entrar como administrador, clique no botão **🔒 Admin** no topo direito ou clique na aba **Placares 🔒**.
- O sistema solicitará a senha. Após digitá-la corretamente, o modo admin será liberado para lançar os placares reais e alterar configurações sensíveis.

---

## 📋 Funcionalidades Principais

1. **Tabela Oficial DAZN 2026-2027 (Semana 1 à Semana 18)**:
   - Todos os confrontos oficiais extraídos diretamente do calendário da temporada 2026 da NFL.
   - Datas com dias da semana e horários oficiais no **Horário de Brasília (BRT)**.
   - Escudos oficiais em alta resolução dos 32 times da NFL.
   - Todos os jogos começam zerados e prontos para receber as apostas dos participantes.

2. **Visão Tabela Geral (Estilo Planilha)**:
   - Apresenta os confrontos da semana selecionada e colunas comparativas lado a lado para cada participante (**Angel**, **Caio**, **Dinho** e novos amigos).
   - Mostra o vencedor apostado, a diferença de pontos e os pontos obtidos em cada partida:
     - 🎯 **Dourado (Bônus Exato)**: Vencedor + Diferença de placar cravada.
     - 🔵 **Azul**: Apenas vencedor correto.
     - ⚪ **Cinza**: Erro.

3. **Visão Apostar (Cartões Interativos)**:
   - O participante logado clica diretamente no escudo do time para escolher o vencedor e ajusta a diferença de pontos nos botões `+` e `-`.

4. **Classificação Geral (Pódio & Leaderboard)**:
   - Pódio temático com os 3 primeiros colocados e tabela de classificação com critérios de desempate automáticos.

5. **Aba de Configurações**:
   - **Participantes & Times do Coração**: Altere o nome, avatar e o time do coração de qualquer amigo com menu de todas as 32 franquias da NFL.
   - **Regras de Pontuação**: Personalize os pontos por acertar o vencedor e os pontos de bônus por acertar a diferença exata.
   - **Segurança**: Altere a senha de administrador quando desejar.
   - **Backup & Dados**: Exportar e importar JSON, além de botão para limpar palpites ou restaurar a tabela oficial.

---

## 📂 Arquivos do Projeto

- `index.html`: Página principal com navegação por abas e modais.
- `style.css`: Estilização temática em modo escuro estilo NFL GameDay.
- `app.js`: Motor de regras, cálculo de pontuação, autenticação com senha e abas.
- `data.js`: Banco de dados com os 32 times e todos os 248 confrontos oficiais da temporada 2026.
