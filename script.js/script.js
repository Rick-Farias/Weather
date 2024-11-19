const apiKey = '92b98a5b0a2764d8fa14c164147e86a5'


const city = document.querySelector("#city")
const date = document.querySelector("#date")
const icon = document.querySelector("#icon")
const temperature = document.querySelector("#temperature")
const climate = document.querySelector("#climate")
const humidity = document.querySelector("#humidity")
const wind = document.querySelector("#wind")
const back = document.querySelector("#back")
const containerSearch = document.querySelector("#containerSearch")
const exit = document.querySelector("#exit")
const search = document.querySelector("#search")
const btnSearch = document.querySelector("#btnSearch")
const cityInput = document.querySelector("#cityInput")
const container = document.querySelector("#container")
const locationElement = document.querySelector("#location")
const card = document.querySelector("#card")
const msg = document.querySelector("#msg")

city.addEventListener('click', ()=>{
    containerSearch.classList.remove('hide')
})

btnSearch.addEventListener('click', ()=>{
    const cityValue = cityInput.value
    getWeather(cityValue)
    cityInput.value = ""
    
})

exit.addEventListener('click', ()=>{
    containerSearch.classList.add('hide')
})

const  getWeather = async (cityValue) =>{

    if(cityValue == ""){
        msg.innerText = "Enter a city!"
    }else{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&lang=pt-br`
        const res = await fetch (url).then( (response)=>{
            if(!response.ok){
                throw Error(response.statusText)
            }
            msg.innerText = ""
            return response
        }).catch((err)=>{
            msg.innerText = "Enter a real city!"
        })
        const data = await res.json()
        console.log(data)
        insertValues(data, cityValue)
    }
        
    
}

function currentData(){
    const dateNow = new Date()
    const option = { 
        weekday: 'short',
        day: 'numeric',
        month: 'long' }
    const dateFomart = dateNow.toLocaleDateString('en-US', option)

    return dateFomart
}

function insertValues(data, cityValue){
    const weather = data.weather
    const main = data.main
    const windData = data.wind

    city.innerText = cityValue
    date.innerText = currentData()
    humidity.innerText = `${main.humidity}%`
    wind.innerText = `${windData.speed}km/h`
    temperature.innerText = `${parseInt(main.temp - 273,15)}°`
    containerSearch.classList.add('hide')
    climate.innerText = weather[0].main

    const horas = new Date().getHours()
    
    if(horas <= 18 && horas >= 6){
        switch(weather[0].main){
            case "Rain":
            icon.innerHTML = `<img src="./PNG/512/day_rain.png" alt="">`
            document.body.style.backgroundColor = "#FFF"
            back.style.backgroundColor = "#839deb"
            break
    
            case "Clear":
            icon.innerHTML = `<img src="./PNG/512/day_clear.png" alt="">`
            document.body.style.backgroundColor = "#FFF"
            back.style.backgroundColor = "#faa508"
            break

            case "Clouds":
            icon.innerHTML = `<img src="./PNG/512/cloudy.png" alt="">`
            document.body.style.backgroundColor = "#FFF"
            back.style.backgroundColor = "#6b6869"
            break
        }
    }else{
        switch(weather[0].main){
            case "Rain":
            icon.innerHTML = `<img src="./PNG/512/night_full_moon_rain.png" alt="">`
            document.body.style.backgroundColor = "#577ae4"
            back.style.backgroundColor = "#1d44b8"
            locationElement.style.color = "#FFF"
            date.style.color = "#FFF"
            card.style.color = "#FFF"
            break
    
            case "Clear":
            icon.innerHTML = `<img src="./PNG/512/night_full_moon_clear.png" alt="">`
            document.body.style.backgroundColor = "#577ae4"
            back.style.backgroundColor = "#1d44b8"
            locationElement.style.color = "#FFF"
            date.style.color = "#FFF"
            card.style.color = "#FFF"
            break

            case "Clouds":
            icon.innerHTML = `<img src="./PNG/512/night_full_moon_partial_cloud.png" alt="">`
            document.body.style.backgroundColor = "#577ae4"
            back.style.backgroundColor = "#6b6869"
            locationElement.style.color = "#FFF"
            date.style.color = "#FFF"
            card.style.color = "#FFF"
            break
    }
}
}

window.onload = function() {
  
    const horas = new Date().getHours()
    
    if(horas <= 18){
        icon.innerHTML = `<img src="./PNG/512/day_clear.png" alt="">`
        container.style.backgroundColor = "#FFF"
        back.style.backgroundColor = "#faa508"
    }else{
        icon.innerHTML = `<img src="./PNG/512/night_full_moon_clear.png" alt="">`
        document.body.style.backgroundColor = "#577ae4"
        back.style.backgroundColor = "#1d44b8"
        locationElement.style.color = "#FFF"
        date.style.color = "#FFF"
        card.style.color = "#FFF"
    }
    
  };