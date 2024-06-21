// 서버에 쿠키 유효성을 확인하는 함수
async function validateCookie() {
    if (isMaintenanceMode()) {
        return { username: 'dummyUser', coins: 1000, email: 'dummy@example.com', nickname: 'dummyNick' };
    }
    const encryptedCookie = getCookie("PHPSESSID");
    if (!encryptedCookie) {
        return null;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/acc/validCK`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'omit'
        });

        console.log("validateCookie Response status:", response.status);

        if (response.status === 200) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return null;
    }
}

// 로그인 요청 함수
async function login(id, pw) {
    if (isMaintenanceMode()) {
        return true;
    }
    try {
        console.log("Sending data:", { id, pw });
        const response = await fetch(`${BACKEND_URL}/acc/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, pw }),
            credentials: 'omit'
        });

        console.log("Response status:", response.status);

        if (response.status === 200) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return false;
    }
}

// 회원가입 요청 함수
async function register(id, email, pw) {
    if (isMaintenanceMode()) {
        return { success: true };
    }
    try {
        const response = await fetch(`${BACKEND_URL}/acc/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, email, pw })
        });

        console.log("Response status:", response.status);

        if (response.status === 200) {
            return { success: true };
        } else if (response.status === 403) {
            return { success: false, message: "이미 가입된 유저 정보입니다." };
        } else if (response.status === 400) {
            return { success: false, message: "회원가입 실패: 잘못된 요청입니다." };
        } else if (response.status === 491) {
            return { success: false, message: "회원가입 실패: 입력된 정보가 제한사항을 초과했습니다." };
        } else {
            return { success: false, message: "회원가입 실패: 알 수 없는 오류가 발생했습니다." };
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return { success: false, message: "회원가입 실패: 서버와의 통신 중 오류가 발생했습니다." };
    }
}

// 로그아웃 로직
async function logout() {
    if (isMaintenanceMode()) {
        alert("로그아웃되었습니다.");
        window.location.href = '../';
        return;
    }
    try {
        const response = await fetch(`${BACKEND_URL}/acc/logout`, {
            method: 'POST',
            credentials: 'include'
        });
        if (response.status === 200) {
            alert("로그아웃되었습니다.");
            window.location.href = '../';
        } else {
            alert("로그아웃에 실패했습니다.");
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        alert("로그아웃 중 오류가 발생했습니다.");
    }
}
