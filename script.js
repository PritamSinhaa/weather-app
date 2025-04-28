const apiKey = "88d8b284c5cd95491dd944a4f9b21f10";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "./Icons/clouds.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "./Icons/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "./Icons/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "./Icons/mist.png";
    } else {
      weatherIcon.src = "./Icons/clear.png"; // add a fallback if needed
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  if (searchBox.value.trim() !== "") {
    checkWeather(searchBox.value);
  }
});

searchBox.addEventListener("keyup", (event) => {
    if (event.key === "Enter" && searchBox.value.trim() !== "") {
      checkWeather(searchBox.value);
    }
  });