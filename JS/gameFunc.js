// gameFunc.js

document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

function loadContent() {
    const contentDiv = document.getElementById('content');
    if (isMaintenanceMode() || checkLogin()) {
        const initialState = getInitialDummyState();

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
                        <div class="game-table">
                            <div class="cards" id="dealer-cards"></div>
                            <div>딜러 총합: <span id="dealer-total">0</span></div>
                            <div class="cards" id="player-cards"></div>
                            <div>플레이어 총합: <span id="player-total">0</span></div>
                            <div class="controls">
                                <button id="hit">Hit</button>
                                <button id="stand">Stand</button>
                                <button id="die">Die</button>
                                <button id="double-down">Double Down</button>
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

        renderInitialState(initialState);

        document.getElementById('hit').addEventListener('click', function() {
            hit(initialState);
        });
        document.getElementById('stand').addEventListener('click', function() {
            alert("Stand 기능은 구현 중입니다.");
        });
        document.getElementById('die').addEventListener('click', function() {
            alert("Die 기능은 구현 중입니다.");
        });
        document.getElementById('double-down').addEventListener('click', function() {
            alert("Double Down 기능은 구현 중입니다.");
        });
    } else {
        alert("로그인을 해주세요");
        window.location.href = '../';
    }
}

function renderInitialState(state) {
    const dealerCardsDiv = document.getElementById('dealer-cards');
    const playerCardsDiv = document.getElementById('player-cards');
    dealerCardsDiv.innerHTML = '';
    playerCardsDiv.innerHTML = '';

    state.dealer.forEach(card => {
        dealerCardsDiv.innerHTML += `<div class="card">${card.value} ${card.suit}</div>`;
    });

    state.player.forEach(card => {
        playerCardsDiv.innerHTML += `<div class="card">${card.value} ${card.suit}</div>`;
    });

    document.getElementById('dealer-total').textContent = state.dealerTotal;
    document.getElementById('player-total').textContent = state.playerTotal;
}

function hit(state) {
    if (state.deck.length > 0) {
        const newCard = state.deck.shift();
        state.player.push(newCard);
        state.playerTotal = calculateTotal(state.player);
        renderInitialState(state);
    } else {
        alert("덱에 더 이상 카드가 없습니다.");
    }
}
