const DUMMY_HISTORY_DATA = [
    'Win', 'Draw', 'Lose', 'Win', 'Draw', 'Lose', 'Draw', 'Draw', 'Draw', 'Draw'
];

const DUMMY_RANKING_DATA = [
    { nickname: '더미1', totalMatch: 10, totalWin: 5, totalLose: 5 },
    { nickname: '더미2', totalMatch: 9, totalWin: 4, totalLose: 5 },
    { nickname: '더미3', totalMatch: 8, totalWin: 4, totalLose: 4 },
    { nickname: '더미4', totalMatch: 7, totalWin: 3, totalLose: 4 },
    { nickname: '더미5', totalMatch: 6, totalWin: 3, totalLose: 3 },
    { nickname: '더미6', totalMatch: 5, totalWin: 2, totalLose: 3 },
    { nickname: '더미7', totalMatch: 4, totalWin: 2, totalLose: 2 },
    { nickname: '더미8', totalMatch: 3, totalWin: 1, totalLose: 2 },
    { nickname: '더미9', totalMatch: 2, totalWin: 1, totalLose: 1 },
    { nickname: '더미10', totalMatch: 1, totalWin: 0, totalLose: 1 },
    { nickname: '더미11', totalMatch: 0, totalWin: -1, totalLose: 0 }
];

// 게임 기록 데이터를 불러오는 함수
function loadHistory() {
    if (MAINTENANCE_MODE) {
        console.log('Maintenance mode is ON, loading dummy data');
        renderHistoryData(DUMMY_HISTORY_DATA);
        return;
    }

    fetch(`${BACKEND_URL}/acc/getHistory`)
        .then(response => response.json())
        .then(data => {
            renderHistoryData(data);
        })
        .catch(error => {
            console.error('Error fetching history data:', error);
            renderHistoryData(DUMMY_HISTORY_DATA);
        });
}

// 랭킹 데이터를 불러오는 함수
function loadRanking() {
    if (MAINTENANCE_MODE) {
        console.log('Maintenance mode is ON, loading dummy data');
        renderRankingData(DUMMY_RANKING_DATA);
        return;
    }

    fetch(`${BACKEND_URL}/acc/getRank`)
        .then(response => response.json())
        .then(data => {
            renderRankingData(data);
        })
        .catch(error => {
            console.error('Error fetching ranking data:', error);
            renderRankingData(DUMMY_RANKING_DATA);
        });
}

// 게임 기록 데이터 렌더링 함수
function renderHistoryData(data) {
    const historyList = document.getElementById('history-list');
    const lastGameElement = document.getElementById('last-game');
    const recentWinRateElement = document.getElementById('recent-win-rate');
    const overallWinRateElement = document.getElementById('overall-win-rate');

    while (data.length < 10) {
        data.push(DUMMY_HISTORY_DATA[data.length % DUMMY_HISTORY_DATA.length]);
    }

    const lastGame = data[0];
    lastGameElement.textContent = lastGame === 'Win' ? '승리' : lastGame === 'Lose' ? '패배' : '무승부';

    const recentGames = data.slice(0, 5);
    const recentWins = recentGames.filter(result => result === 'Win').length;
    const recentWinRate = Math.round((recentWins / recentGames.length) * 100);
    recentWinRateElement.textContent = `${recentWinRate}%`;

    const totalGames = data.length;
    const totalWins = data.filter(result => result === 'Win').length;
    const overallWinRate = Math.round((totalWins / totalGames) * 100);
    overallWinRateElement.textContent = `${overallWinRate}%`;

    data.forEach((result, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('history-item');
        listItem.innerHTML = `
            <div class="history-game-number">${data.length - index}</div>
            <div class="history-result-box">
                <div class="history-result win ${result === 'Win' ? 'highlight' : ''}">승리</div>
                <div class="history-result draw ${result === 'Draw' ? 'highlight' : ''}">무승부</div>
                <div class="history-result lose ${result === 'Lose' ? 'highlight' : ''}">패배</div>
            </div>
        `;
        historyList.appendChild(listItem);
    });
}

// 랭킹 데이터 렌더링 함수
function renderRankingData(data) {
    const rankingList = document.getElementById('ranking-list');

    data.forEach((rank, index) => {
        const listItem = document.createElement('li');
        listItem.classList.add('ranking-item');
        listItem.innerHTML = `
            <div class="rank">${index + 1}</div>
            <div class="nickname">${rank.nickname}</div>
            <div class="total-match">${rank.totalMatch}</div>
            <div class="total-win">${rank.totalWin}</div>
            <div class="total-lose">${rank.totalLose}</div>
        `;
        rankingList.appendChild(listItem);
    });
}

function isMaintenanceMode() {
    return MAINTENANCE_MODE === 1;
}
