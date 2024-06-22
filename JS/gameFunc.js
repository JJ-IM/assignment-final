// gameFunc.js

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const betAmount = parseInt(urlParams.get('bet'), 10) || 50;
    loadContent(betAmount);
});

function loadContent(betAmount) {
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
            hit(initialState, betAmount);
        });
        document.getElementById('stand').addEventListener('click', function() {
            stand(initialState, betAmount);
        });
        document.getElementById('die').addEventListener('click', function() {
            die(initialState, betAmount);
        });
        document.getElementById('double-down').addEventListener('click', function() {
            doubleDown(initialState, betAmount);
        });

        checkInitialGameOver(initialState, betAmount);
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
        dealerCardsDiv.innerHTML += `<div class="card"><img src="../assets/img/game/Cards/${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.svg" alt="${card.value} ${card.suit}" /></div>`;
    });

    state.player.forEach(card => {
        playerCardsDiv.innerHTML += `<div class="card"><img src="../assets/img/game/Cards/${card.value.toLowerCase()}_of_${card.suit.toLowerCase()}.svg" alt="${card.value} ${card.suit}" /></div>`;
    });

    document.getElementById('dealer-total').textContent = state.dealerTotal;
    document.getElementById('player-total').textContent = state.playerTotal;
}

function hit(state, betAmount) {
    if (state.gameOver) return;

    if (state.deck.length > 0) {
        const newCard = state.deck.shift();
        state.player.push(newCard);
        state.playerTotal = calculateTotal(state.player);
        renderInitialState(state);
        checkGameOver(state, betAmount, false);
    } else {
        alert("덱에 더 이상 카드가 없습니다.");
    }
}

function stand(state, betAmount) {
    if (state.gameOver) return;

    while (state.dealerTotal < 17) {
        const newCard = state.deck.shift();
        state.dealer.push(newCard);
        state.dealerTotal = calculateTotal(state.dealer);
    }
    renderInitialState(state);
    checkGameOver(state, betAmount, true);
}

function die(state, betAmount) {
    if (state.gameOver) return;

    state.gameOver = true;
    renderInitialState(state);
    setTimeout(() => {
        alert(`플레이어가 다이했습니다. 베팅 금액의 75%(${Math.round(betAmount * 0.75)})을(를) 잃습니다.`);
        redirectToPlay();
    }, 300);
}

function doubleDown(state, betAmount) {
    if (state.gameOver) return;

    const doubleBetAmount = betAmount * 2;
    state.doubleDown = true;
    state.doubleBetAmount = doubleBetAmount;
    if (state.deck.length > 0) {
        const newCard = state.deck.shift();
        state.player.push(newCard);
        state.playerTotal = calculateTotal(state.player);
        renderInitialState(state);
        if (state.playerTotal > 21) {
            state.gameOver = true;
            setTimeout(() => {
                alert(`플레이어가 버스트했습니다. 베팅 금액의 2배(${doubleBetAmount})을(를) 잃었습니다.`);
                redirectToPlay();
            }, 300);
        } else {
            stand(state, doubleBetAmount);
        }
    } else {
        alert("덱에 더 이상 카드가 없습니다.");
    }
}

function checkInitialGameOver(state, betAmount) {
    if (state.dealerTotal === 21 && state.dealer.length === 2 && state.playerTotal === 21 && state.player.length === 2) {
        state.gameOver = true;
        setTimeout(() => {
            alert("딜러와 플레이어 모두 블랙잭입니다. 무승부입니다.");
            redirectToPlay();
        }, 300);
    } else if (state.dealerTotal === 21 && state.dealer.length === 2) {
        state.gameOver = true;
        setTimeout(() => {
            alert("딜러가 블랙잭입니다! 딜러가 이겼습니다.");
            redirectToPlay();
        }, 300);
    } else if (state.playerTotal === 21 && state.player.length === 2) {
        state.gameOver = true;
        setTimeout(() => {
            alert(`플레이어가 블랙잭입니다! 베팅 금액 ${betAmount}을(를) 얻었습니다.`);
            redirectToPlay();
        }, 300);
    }
}

function checkGameOver(state, betAmount, showDealer) {
    if (state.gameOver) return;

    renderInitialState(state);

    if (state.playerTotal > 21) {
        state.gameOver = true;
        setTimeout(() => {
            alert(`플레이어가 버스트했습니다. 베팅 금액 ${state.doubleDown ? state.doubleBetAmount : betAmount}을(를) 잃었습니다.`);
            redirectToPlay();
        }, 300);
    } else if (state.dealerTotal > 21) {
        state.gameOver = true;
        setTimeout(() => {
            alert(`딜러가 버스트했습니다. 플레이어가 이겼습니다! 베팅 금액 ${state.doubleDown ? state.doubleBetAmount : betAmount}을(를) 얻었습니다.`);
            redirectToPlay();
        }, 300);
    } else if (showDealer) {
        if (state.dealerTotal > state.playerTotal) {
            setTimeout(() => {
                alert(`딜러가 이겼습니다. 베팅 금액 ${state.doubleDown ? state.doubleBetAmount : betAmount}을(를) 잃었습니다.`);
                redirectToPlay();
            }, 300);
        } else if (state.dealerTotal < state.playerTotal) {
            setTimeout(() => {
                alert(`플레이어가 이겼습니다! 베팅 금액 ${state.doubleDown ? state.doubleBetAmount : betAmount}을(를) 얻었습니다.`);
                redirectToPlay();
            }, 300);
        } else {
            setTimeout(() => {
                alert("무승부입니다.");
                redirectToPlay();
            }, 300);
        }
    }
}

function redirectToPlay() {
    setTimeout(() => {
        window.location.href = './Play.html';
    }, 300);
}

function calculateTotal(cards) {
    let total = 0;
    let aces = 0;
    cards.forEach(card => {
        const value = card.value.toLowerCase();
        if (value === 'a') {
            aces += 1;
            total += 11;
        } else if (['k', 'q', 'j'].includes(value)) {
            total += 10;
        } else {
            total += parseInt(value, 10);
        }
    });
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
}
