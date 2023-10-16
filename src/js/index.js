const api_key = "8a644e3582d37c0d049c0cc0a519a51a";
const apiCountryUrl = "https://countryflagsapi.com/png/";

const inputSearch = document.querySelector(".input-search");
const buttonSearch = document.querySelector(".lupa");

const cityName = document.querySelector(".city");
const currentTemperature = document.querySelector(".current-temperature");
const currentWeather = document.querySelector(".weather");
const imageCountry = document.querySelector(".country");
const iconWeather = document.querySelector(".weather-icon");
const currentHumidity = document.querySelector(".humidity-value");
const currentWind = document.querySelector(".wind-value");
const fellsLike = document.querySelector(".feels-like-value");

const searchResult = document.querySelector(".search-result");
const cityNotFound = document.querySelector(".city-not-found");

buttonSearch.addEventListener("click", () => {
  const city = inputSearch.value;
  showWeatherData(city);
  inputSearch.value = "";
});
inputSearch.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;
    showWeatherData(city);
    inputSearch.value = "";
  }
});

async function getWeatrherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}&lang=pt_br`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
}

async function showWeatherData(city) {
  const data = await getWeatrherData(city);

  if (data) {
    cityName.innerHTML = data.name;
    currentTemperature.innerHTML = parseInt(data.main.temp) + "°C";
    currentWeather.innerHTML = data.weather[0].description;
    currentHumidity.innerHTML = data.main.humidity + "%";
    currentWind.innerHTML = data.wind.speed + "km/h";
    fellsLike.innerHTML = parseInt(data.main.feels_like) + "°C";
    iconWeather.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

    cityNotFound.innerHTML = "";
    searchResult.classList.remove("hide");
  } else {
    cityNotFound.innerHTML = "Localidade não encontrada";
    searchResult.classList.add("hide");
  }
}
