document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

function loadContent() {
    const contentDiv = document.getElementById('content');
    if (isMaintenanceMode() || checkLogin()) {
        contentDiv.innerHTML = `
            <div class="afterMain-container">
                <div class="afterMain-box">
                    <div class="afterNav-box">
                        <div class="afterLogo">
                            <img src="../assets/img/main/BlackJack.png" alt="BJ_Logo" class="afterLogo-img clickable-img" id="blackjack-logo">
                        </div>
                        <div class="afterMenu">
                            <div class="button-wrapper">
                                <a href="./Ranking.html" class="button clicked">
                                    <img src="../assets/img/navbar/Ranking.svg" alt="Ranking" class="button-icon">
                                    <span class="button-text"> 랭킹 </span>
                                </a>
                            </div>
                            <div class="button-wrapper">
                                <a href="./History.html" class="button">
                                    <img src="../assets/img/navbar/History.svg" alt="History" class="button-icon">
                                    <span class="button-text"> 기록 </span>
                                </a>
                            </div>
                            <div class="button-wrapper">
                                <a href="./Play.html" class="button">
                                    <img src="../assets/img/navbar/Play.svg" alt="Play" class="button-icon">
                                    <span class="button-text"> 시작 </span>
                                </a>
                            </div>
                            <div class="button-wrapper">
                                <a href="./Mypage.html" class="button">
                                    <img src="../assets/img/navbar/Mypage.svg" alt="Mypage" class="button-icon">
                                    <span class="button-text"> 정보 </span>
                                </a>
                            </div>
                        </div>
                        <div class="afterUser">
                            <div class="afterProfile">
                                <img src="../assets/img/main/userPro.png" alt="Profile" class="afterProfile-img">
                            </div>
                            <div class="afterUserdata">
                                <div class="user-name">
                                    ${getCookie("username")}
                                </div>
                                <div class="user-coins">
                                    <img src="../assets/img/main/Coin.png" alt="coinsImg" class="afterCoins-img">
                                    <div class="coins-info">
                                        ${getCookie("coins") ? getCookie("coins").slice(0, 5) : "err.."}
                                    </div>
                                    <div class="afterCoinsPlus">
                                        <img src="../assets/img/navbar/Plus.svg" alt="coinsPlus" class="afterCoinsPlus-svg clickable-img" id="go-to-shop">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="afterContent-box">
                        <div class="title-box">
                            <h2 class="top-title">Ranking</h2>
                        </div>
                        <div class="content-box">
                            <div class="ranking-header">
                                <div class="rank">순위</div>
                                <div class="nickname">닉네임</div>
                                <div class="total-match">판수</div>
                                <div class="total-win">승리 횟수</div>
                                <div class="total-lose">패배 횟수</div>
                            </div>
                            <div class="ranking-list-container">
                                <ul id="ranking-list" class="ranking-list"></ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.getElementById('blackjack-logo').addEventListener('click', function() {
            window.location.href = '../';
        });
        document.getElementById('go-to-shop').addEventListener('click', function() {
            window.location.href = './Shop.html';
        });
        loadRanking();
    } else {
        alert("로그인을 해주세요");
        window.location.href = '../';
    }
}

function loadRanking() {
    if (isMaintenanceMode()) {
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
