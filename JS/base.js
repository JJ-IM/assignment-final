const BACKEND_URL = 'http://view.colio.net:8888';
const MAINTENANCE_MODE = 1; // 유지보수 모드를 켜둡니다

// 쿠키를 읽는 함수
function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

// 로그인 상태를 확인하는 함수
function checkLogin() {
    return getCookie("username") !== null;
}

// 유지보수 모드 확인 함수
function isMaintenanceMode() {
    return MAINTENANCE_MODE === 1;
}
