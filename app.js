const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const inputAlert = $(".input_alert")
const title = $(".title")
const form = $(".form")
const cityInput = $(".city_input")
const weatherBox = $(".weather_box")
const cityName = $(".city")
const condition = $(".condition")
const temp = $(".temp")
const feelsLike = $(".feels-like")
const humidity = $(".humidity")
const windSpeed = $(".wind_speed")
const apiKey = "7f12af95f0864390b17170115222105 "
const body = $(".body")
// ACCOUNT CREATION AND LOGIN
let defaultCity
let accounts = []
let loggedIn = false
let usernameAlert = $(".username-alert")
let passwordAlert = $(".password-alert")
let noAccountAlert = $(".no-account-alert")
let signupUsernameAlert = $(".signup-username-alert")
let signupPasswordAlert = $(".signup-password-alert")
let incorrectLoginAlert = $(".incorrect-login-alert")
let allAccountInputs = $$(".account-input")
let allAlerts = $$(".alert")
let loginBtn = $(".login-btn")
let profileBtn = $(".profile-btn")
let profileDropdown = $(".profile-dropdown")
let dropdownForm = $(".dropdown-form")
let dropdownInput = $(".dropdown-input")
// CREATE
const signUpScreen = $(".sign-up-screen")
const signUpBtn = $(".sign-up")
const signUpForm = $(".sign-up-form")
const createUsernameInput = $(".create-username")
const createPasswordInput = $(".create-password")
// LOGIN
const loginScreen = $(".login-screen")
const loginForm = $(".login-form")
const usernameLoginInput = $(".username-login")
const passwordLoginInput = $(".password-login")
// ******************************

if (localStorage.getItem("accounts")) {
  accounts = JSON.parse(localStorage.getItem("accounts"))
}

if (localStorage.getItem("loggedIn")) {
  loggedIn = localStorage.getItem("loggedIn")
  loginBtn.style.display = "none"
}

if (localStorage.getItem("default-city")) {
  defaultCity = localStorage.getItem("default-city")
}

VANTA.CLOUDS({
  el: "#body",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.0,
  minWidth: 200.0,
  scale: 1.0,
})

loginBtn.addEventListener("click", function () {
  loginScreen.style.display = "flex"
})

if (defaultCity === undefined) {
  console.log("UNDEFINED")
} else {
  console.log("DEFAULT CITY: ", defaultCity)
  dropdownInput.value = defaultCity
}

let currentCity = ""
if (defaultCity !== undefined) {
  searchAndLoadWeather(defaultCity)
}
form.addEventListener("submit", function (e) {
  e.preventDefault()
  currentCity = cityInput.value
  // Clear input field
  cityInput.value = ""
  searchAndLoadWeather(currentCity)
})

function searchAndLoadWeather(city) {
  // Fetch weather with currentCity and store it in result
  let result = fetchWeather(city, apiKey)
  // Inside result we fetch data and display content
  result
    .then((data) => {
      inputAlert.style.display = "none"
      if (data.location.region && data.location.region === "California") {
        data.location.region = "CA"
      }
      // Display weather box
      weatherBox.style.display = "initial"
      // Display weather info text
      cityName.innerHTML = `${data.location.name}, ${data.location.region}`
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
}

// ************ LOGIN SYSTEM ****************
allAccountInputs.forEach((input) => {
  input.addEventListener("input", function () {
    hideAlerts()
  })
})

if (loggedIn === false) {
  loginBtn.style.display = "initial"
  signUpForm.addEventListener("submit", function (e) {
    e.preventDefault()
    if (createUsernameInput.value.length < 3) {
      signupAlertUsername()
      console.log("USERNAME MUST BE LONGER THAN 2 CHARACTERS")
    } else if (createPasswordInput.value.length < 6) {
      signupAlertPassword()
      console.log("PASSWORD MUST BE LONGER THAN 5 CHARACTERS")
    } else {
      // CREATE ACCOUNT
      let newAccount = new Account(
        createUsernameInput.value,
        createPasswordInput.value
      )
      // Push new account into arr
      accounts.push(newAccount)
      // Clear input fields
      createUsernameInput.value = ""
      usernameLoginInput.value = ""
      createPasswordInput.value = ""
      passwordLoginInput.value = ""
      // Store accounts arr in localStorage
      localStorage.setItem("accounts", JSON.stringify(accounts))
      // Close sign up page
      signUpScreen.style.display = "none"
      loginScreen.style.display = "flex"
    }
  })

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault()
    // IF ACCOUNT EXISTS LETS DO THIS CONDITIONAL
    if (accounts.length === 0) {
      alertNoAccount()
      console.log("YOUR DEVICE DOES NOT HAVE AN ACCOUNT")
      console.log("PLEASE SIGN UP")
    } else {
      if (usernameLoginInput.value.length < 3) {
        alertUsername()
        console.log("USERNAME MUST BE LONGER THAN 2 CHARACTERS")
      } else if (passwordLoginInput.value.length < 5) {
        alertPassword()
        console.log("PASSWORD MUST BE LONGER THAN 5 CHARACTERS")
      } else {
        accounts.forEach((account) => {
          if (
            usernameLoginInput.value === account.username &&
            passwordLoginInput.value === account.password
          ) {
            loginSuccessful()
          } else {
            alertIncorrectLogin()
          }
        })
      }
    }
  })
} else {
  profileBtn.style.display = "flex"
  profileBtn.addEventListener("click", function () {
    profileDropdown.style.display === "flex"
      ? (profileDropdown.style.display = "none")
      : (profileDropdown.style.display = "flex")
  })
}

$(".vanta-canvas").addEventListener("click", function () {
  profileDropdown.style.display = "none"
})

dropdownForm.addEventListener("submit", function (e) {
  if (dropdownInput.value !== "") {
    defaultCity = dropdownInput.value
    localStorage.setItem("default-city", dropdownInput.value)
  }
})

profileDropdown.addEventListener("click", function (e) {
  e.stopPropagation()
})

function hideAlerts() {
  allAlerts.forEach((alert) => {
    alert.style.display = "none"
  })
}

function alertIncorrectLogin() {
  incorrectLoginAlert.style.display = "flex"
}

function signupAlertUsername() {
  signupUsernameAlert.style.display = "flex"
}

function signupAlertPassword() {
  signupPasswordAlert.style.display = "flex"
}

function alertUsername() {
  usernameAlert.style.display = "flex"
}

function alertPassword() {
  passwordAlert.style.display = "flex"
}

function alertNoAccount() {
  noAccountAlert.style.display = "flex"
}

function loginSuccessful() {
  loggedIn = true
  localStorage.setItem("loggedIn", true)
  loginScreen.style.display = "none"
  signUpScreen.style.display = "none"
}

signUpBtn.addEventListener("click", function () {
  signUpScreen.style.display = "flex"
  loginScreen.style.display = "none"
})

// ***************************************

// FETCH Async Function
async function fetchWeather(city, key) {
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${key} &q=${city}&aqi=no`
  )
  const data = await response.json()
  return data
}

// ACCOUNT OBJECT CONSTRUCTOR
function Account(username, password) {
  this.username = username
  this.password = password
}
