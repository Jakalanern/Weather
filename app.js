const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const cityInput = $(".city_input")
const weatherBox = $(".weather_box")
const city = $(".city")
const condition = $(".condition")
const temp = $(".temp")
const feelsLike = $(".feels-like")
const humidity = $(".humidity")
const windSpeed = $(".wind_speed")
const apiKey = "7f12af95f0864390b17170115222105 "
const body = $(".body")
let lat = 33.4672
let lon = 117.6981

let currentCity = ""
cityInput.addEventListener("input", function () {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      currentCity = cityInput.value
      cityInput.value = ""
      if (currentCity !== "") {
        let result = fetchWeather(currentCity, apiKey)
        result.then((data) => {
          if (data.location.region === "California") {
            data.location.region = "CA"
          }
          console.log(data)
          // Display weather box
          weatherBox.style.display = "initial"
          // Display weather info text
          city.innerHTML = `${data.location.name}, ${data.location.region}`
          condition.innerHTML = `<b>Condition:</b> ${data.current.condition.text}`
          temp.innerHTML = `<b>Current temp:</b> ${data.current.temp_f}° F`
          feelsLike.innerHTML = `<b>Feels like:</b> ${data.current.feelslike_f}° F`
          humidity.innerHTML = `<b>Humidity:</b> ${data.current.humidity}%`
          windSpeed.innerHTML = `<b>Wind Speed:</b> ${data.current.wind_mph} Mph`
        })
      }
    }
  })
})

async function fetchWeather(city, key) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${apiKey} &q=${currentCity}&aqi=no`
  )
  const data = await response.json()
  return data
}

// https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}
// Waiting for API key to work ^^^^^^^^
