if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("./service.js")
        .then(() => console.log("Service Worker Registered"))
        .catch((error) => console.error("Service Worker Registration Failed:", error));
}

const apiKey = "f8fd208d12dc923b87f6bc1679bc9eb3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-text-btn");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}&units=metric`);
        
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            const data = await response.json();

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            const weatherCondition = data.weather[0].main.toLowerCase();

            if (weatherCondition === "clouds") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/8691/8691186.png";
            } else if (weatherCondition === "clear") {
                weatherIcon.src = "https://cdn-icons-png.flaticon.com/512/3222/3222800.png";
            } else if (weatherCondition === "rain") {
                weatherIcon.src = "https://png.pngtree.com/png-vector/20191118/ourmid/pngtree-rain-icon-creative-design-template-png-image_1998625.jpg";
            } else if (weatherCondition === "drizzle") {
                weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_84KQXmp500bsQiAZJteVNyzLSVAL4wQrHg&s";
            } else if (weatherCondition === "mist") {
                weatherIcon.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVBo-A8TUle17EJMoZRCO0j_6l7SpscruN6w&s";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred. Please try again.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city !== "") {
        checkWeather(city);
    } else {
        alert("Please enter a city name");
    }
});
