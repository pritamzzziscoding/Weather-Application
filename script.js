const imgData = {
    "01d" : "clear-d.png",
    "01n" : "clear-n.png",
    "02d" : "few-cloud-d.png",
    "02n" : "few-cloud-n.png",
    "03d" : "cloud.png",
    "03n" : "cloud.png",
    "04d" : "strong-cloud.png",
    "04n" : "strong-cloud.png",
    "09d" : "rain.png",
    "09n" : "rain.png",
    "10d" : "rain-d.png",
    "10n" : "rain-n.png",
    "11d" : "thunder.png",
    "11n" : "thunder.png",
    "13d" : "snow-d.png",
    "13n" : "snow-n.png",
    "50d" : "mist.png",
    "50n" : "mist.png",
}

let city = "Delhi";
let imgUrl = "./image/";

const loca = document.querySelector(".loca");
const temperature = document.querySelector(".temperature");
const actual_feel = document.querySelector(".actual-feel");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const main_img = document.querySelector(".main-img");
const button = document.querySelector("button");
const input = document.querySelector("input");
const description = document.querySelector(".description");
let body = document.querySelector("body");

const update = async (city)=>{
    if(city == ""){
        return;
    }
    let finalURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=82d8bf78175d789127768303eec2939b&units=metric`;
    let promise = await fetch(finalURL);
    let data = await promise.json();
    if(data.cod == 404){
        alert("Enter a Valid City");
    }else{
        loca.innerText = data.name;
        temperature.innerText = Math.round(data.main.temp) + "°C";
        actual_feel.innerText = "feels like "+Math.round(data.main.feels_like) + "°C";
        wind.innerText = data.wind.speed + " km/hr";
        humidity.innerText = data.main.humidity +"%";
        main_img.src = imgUrl + imgData[data.weather[0].icon];
        description.innerText = data.weather[0].main;
    }
}

button.addEventListener("click", ()=>{
    city = input.value;
    update(city);
});

body.addEventListener("keydown", (type)=>{
    if(type.key == 'Enter'){
        city = input.value;
        update(city);
    }
});

update(city);