// 쿠키를 읽는 함수
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

// 서버에 쿠키 유효성을 확인하는 함수
async function validateCookie() {
    const encryptedCookie = getCookie("PHPSESSID"); // 'PHPSESSID'이라는 쿠키 이름 가정
    if (!encryptedCookie) {
        return null;
    }

    try {
        const response = await fetch('https://gimal.jgn.pe.kr/acc/validCK', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // 쿠키를 자동으로 포함
        });

        console.log("validateCookie Response status:", response.status);

        if (response.status === 200) {
            const data = await response.json();
            return data; // 사용자 닉네임과 코인 정보 반환
        } else {
            return null; // 유효하지 않은 쿠키
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return null; // 에러 처리
    }
}

// 로그인 요청 함수
async function login(id, pw) {
    try {
        console.log("Sending data:", { id, pw });
        const response = await fetch('https://gimal.jgn.pe.kr/acc/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, pw }),
            credentials: 'include' // 쿠키를 자동으로 포함하여 전송
        });

        console.log("Response status:", response.status);

        if (response.status === 200) {
            // 로그인 성공
            return true;
        } else {
            // 로그인 실패
            return false;
        }
    } catch (error) {
        console.error("Unexpected error:", error);
        return false;
    }
}

// 회원가입 요청 함수
async function register(id, email, pw) {
    try {
        const response = await fetch('https://gimal.jgn.pe.kr/acc/register', {
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
    try {
        const response = await fetch('https://gimal.jgn.pe.kr/acc/logout', {
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
