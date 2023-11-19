let currcity = "London";
let units = "metric";

let city = document.querySelector(".weather-city");
let datetime = document.querySelector(".weather-datetime");
let weather_forecast = document.querySelector(".weather-forecast");
let weather_temperature = document.querySelector(".weather-temperature");
let weather_icon = document.querySelector(".weather-icon");
let weather_minmax = document.querySelector(".weather-minmax")
let weather_realfeel = document.querySelector(".weather-realfeel")
let weather_humidity = document.querySelector(".weather-humidity")
let weather_wind = document.querySelector(".weather-wind")
let weather_pressure = document.querySelector(".weather-pressure")

document.addEventListener('DOMContentLoaded', function() {
    getWeather();

document.querySelector(".weather-search").addEventListener('submit', e=>{
    let search = document.querySelector(".weather-searchform");
    e.preventDefault();
    currcity = search.value;
    getWeather();
    search.value = ""
})})

document.querySelector(".weather-unit-celsius").addEventListener('click', ()=>{
    if(units !== "metric"){
        units = "metric"
        getWeather()
    }
})

document.querySelector(".weather-unit-farenheit").addEventListener('click', ()=>{
    if(units !== "imperial"){
        units = "imperial"
        getWeather()
    }
})

function convertTimeStamp(timestamp, timezone){
    const convertTimeZone = timezone / 3600;
    const date = new Date(timestamp * 1000);

    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: `Etc/GMT${convertTimeZone >= 0 ? "-": "+"}${Math.abs(convertTimeZone)}`,
        hour12: true,
    }
    return date.toLocaleString("en-US", options)
}


function convertCountryCode(country){
    let regionNames = new Intl.DisplayNames(["en"], {type: "region"});
    return regionNames.of(country)
}

function getWeather(){
    const API_KEY = 'your_api_key';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${currcity}&appid=${API_KEY}&units=${units}`)
    .then(res =>  res.json())
.then(data => {
        console.log(data)
        city.innerHTML = `${data.name}, ${convertCountryCode(data.sys.country)}`
        datetime.innerHTML = convertTimeStamp(data.dt, data.timezone);
        weather_forecast.innerHTML = `<p>${data.weather[0].main}</p>`
        weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
        weather_minmax.innerHTML = `<p>Min: ${data.main.temp_min.toFixed()}&#176</p>
        <p>Max: ${data.main.temp_max.toFixed()}&#176</p>`
        weather_realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather_humidity.innerHTML = `${data.main.humidity}%`
        weather_wind.innerHTML = `${data.wind.speed} ${units === "imperial" ? "mph": "m/s"}`
        weather_pressure.innerHTML = `${data.main.pressure} hPa`
    })
    .catch(error=>{
        console.error('Error fetching data:', error);
    });
}
