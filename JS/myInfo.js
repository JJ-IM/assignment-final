document.addEventListener('DOMContentLoaded', function() {
    loadContent();
});

function loadContent() {
    const contentDiv = document.getElementById('content');
    if (isMaintenanceMode() || checkLogin()) {
        const username = getCookie("username");
        const email = getCookie("email");
        const nickname = getCookie("nickname");

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
                                <a href="./Play.html" class="button">
                                    <img src="../assets/img/navbar/Play.svg" alt="Play" class="button-icon">
                                    <span class="button-text"> 시작 </span>
                                </a>
                            </div>
                            <div class="button-wrapper">
                                <a href="./Mypage.html" class="button clicked">
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
                                <div class="user-name">${username}</div>
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
                        <h2>마이페이지</h2>
                        <form id="user-form">
                            <div class="form-group">
                                <label for="nickname">닉네임:</label>
                                <input type="text" id="nickname" name="nickname" value="${nickname}" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="email">이메일:</label>
                                <input type="email" id="email" name="email" value="${email}" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="password">비밀번호:</label>
                                <input type="password" id="password" name="password" class="form-control">
                            </div>
                            <button type="submit" class="btn btn-primary">정보 수정</button>
                            <button type="button" id="logout" class="btn btn-secondary">로그아웃</button>
                            <button type="button" id="delete-account" class="btn btn-danger">회원 탈퇴</button>
                        </form>
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
        document.getElementById('logout').addEventListener('click', function() {
            window.location.href = './Logout.html';
        });
        document.getElementById('delete-account').addEventListener('click', function() {
            if (confirm('정말로 탈퇴하시겠습니까?')) {
                deleteAccount();
            }
        });
        document.getElementById('user-form').addEventListener('submit', function(event) {
            event.preventDefault();
            updateUser();
        });
    } else {
        alert("로그인을 해주세요");
        window.location.href = '../';
    }
}

// 유저 정보 업데이트 함수
function updateUser() {
    const nickname = document.getElementById('nickname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch(`${BACKEND_URL}/acc/updateUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nickname, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('정보가 성공적으로 수정되었습니다.');
        } else {
            alert('정보 수정에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error updating user information:', error);
    });
}

// 회원 탈퇴 함수
function deleteAccount() {
    fetch(`${BACKEND_URL}/acc/deleteUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('회원 탈퇴가 성공적으로 처리되었습니다.');
            window.location.href = '../';
        } else {
            alert('회원 탈퇴에 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error deleting account:', error);
    });
}
