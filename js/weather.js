const API_KEY = "d88c9fb122c413c1e9f0f2dcba25e1fe";

/**
 * 현재 위치 정보 제공에 동의시
 * 날씨와 온도 정보 제공
 * @param {*} position 
 */
function onGeoSuccess(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url).then((response) => response.json()).then((data) => {
        const degree = document.querySelector("#weather span:nth-child(1)");
        const weather = document.querySelector("#weather span:nth-child(2)");
        const location = document.querySelector("#weather span:nth-child(3)");
        degree.innerText = `${Math.round(data.main.temp)}º`;
        weather.innerText = data.weather[0].main;
        weather.className = data.weather[0].main;
        location.innerText = data.name;
    });
}

/**
 * 현재 위치 정보 제공 실패시
 */
function onGeoError() {
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoError);