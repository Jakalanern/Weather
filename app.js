const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inputAlert = $(".input_alert")
const title = $(".title")
const form = $(".form")
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

let currentCity = ""
form.addEventListener("submit", function (e) {
  e.preventDefault()
  //
  currentCity = cityInput.value
  // Clear input field
  cityInput.value = ""

  // Fetch weather with currentCity and store it in result
  let result = fetchWeather(currentCity, apiKey)
  // Inside result we fetch data and display content
  console.log(result)
  result
    .then((data) => {
      inputAlert.style.display = "none"
      if (data.location.region && data.location.region === "California") {
        data.location.region = "CA"
      }
      console.log(data)
      // Display weather box
      weatherBox.style.display = "initial"
      // Display weather info text
      city.innerHTML = `${data.location.name}, ${data.location.region}`
      condition.innerHTML = `Condition: ${data.current.condition.text}`
      temp.innerHTML = `Current temp: ${data.current.temp_f}° F`
      feelsLike.innerHTML = `Feels like: ${data.current.feelslike_f}° F`
      humidity.innerHTML = `Humidity: ${data.current.humidity}%`
      windSpeed.innerHTML = `Wind Speed: ${data.current.wind_mph} Mph`
    })
    .catch((err) => {
      inputAlert.style.display = "initial"
      console.log("ERROR:", err)
    })
})
async function fetchWeather(city, key) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key} &q=${city}&aqi=no`
  )
  const data = await response.json()
  return data
}
