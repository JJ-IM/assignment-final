document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

function loadContent() {
    const contentDiv = document.getElementById('content');
    if (isMaintenanceMode() || checkLogin()) {
        let betAmount = 50;

        contentDiv.innerHTML = `
            <div class="afterMain-container">
                <div class="afterMain-box">
                    <div class="afterNav-box">
                        <div class="afterLogo">
                            <img src="../assets/img/main/BlackJack.png" alt="BJ_Logo" class="afterLogo-img clickable-img" id="blackjack-logo">
                        </div>
                        <div class="afterMenu">
                            <div class="button-wrapper">
                                <a href="./Ranking.html" class="button">
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
                                <a href="./Play.html" class="button clicked">
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
                            <h2 class="top-title">Play</h2>
                        </div>
                        <div class="content-box">
                            <div class="game-buttons">
                                <button class="game-button" id="single-play-button">싱글 플레이</button>
                                <button class="game-button" id="multi-play-button">멀티플레이</button>
                            </div>
                            <div class="betting-box">
                                <button class="betting-arrow" id="bet-decrease">
                                    <img src="../assets/img/game/arrow_back.svg" alt="Decrease Bet">
                                </button>
                                <div class="betting-amount" id="bet-amount">${betAmount}</div>
                                <button class="betting-arrow" id="bet-increase">
                                    <img src="../assets/img/game/arrow_forward.svg" alt="Increase Bet">
                                </button>
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

        document.getElementById('bet-increase').addEventListener('click', function() {
            betAmount += 5;
            document.getElementById('bet-amount').textContent = betAmount;
        });

        document.getElementById('bet-decrease').addEventListener('click', function() {
            if (betAmount > 50) {
                betAmount -= 5;
                document.getElementById('bet-amount').textContent = betAmount;
            }
        });

        document.getElementById('single-play-button').addEventListener('click', function() {
            window.location.href = `./game.html?bet=${betAmount}`;
        });

        document.getElementById('multi-play-button').addEventListener('click', function() {
            alert('이 기능은 구현중입니다');
        });
    } else {
        alert("로그인을 해주세요");
        window.location.href = '../';
    }
}
