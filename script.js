const local = document.getElementById("local")
const descricao = document.getElementById("descricao")
const minprincipal = document.getElementById("minprincipal")
const maxprincipal = document.getElementById("maxprincipal")
const sensacao = document.getElementById("sensacao")
const vento = document.getElementById("vento")
const humidade = document.getElementById("humidade")
const city = document.getElementById("city")

const api = {
    key: "f0da505ee041e88960e4d1ceb5e8c2aa",
    link: "https://api.openweathermap.org/data/2.5/weather?",
    lang: "pt",
    units: "metric"
}


async function displayon(){
    if(city.value.length){
        const url = `${api.link}q=${city.value}&units=${api.units}&lang=${api.lang}&appid=${api.key}`;
        const response = await fetch(url);
        if (response.hasOwnProperty('erro') || response.code == 404){
            alert("Endereço Inválido")
        }else {
            const data = await response.json();
            console.log(data)
            PreencherNaTela(data);
        }
    }
}

function PreencherNaTela(dataApi){
    local.innerHTML= `${dataApi.name}, ${dataApi.sys.country}`
    descricao.innerHTML = `${(dataApi.main.temp).toFixed(0)}°C ${dataApi.weather[0].description}`
    minprincipal.innerHTML = `${(dataApi.main.temp_min).toFixed(0)}°`
    maxprincipal.innerHTML = `${(dataApi.main.temp_max).toFixed(0)}°`
    sensacao.innerHTML = `${(dataApi.main.feels_like).toFixed(0)}°C`
    vento.innerHTML = `${(dataApi.wind.speed).toFixed(0)}Km/h`
    humidade.innerHTML = `${(dataApi.main.humidity).toFixed(0)}%`
    document.querySelector(".searchResult").style.display="block";
    document.querySelector("h1").style.fontSize="30px";
}


function displayoff(){
    document.querySelector(".searchResult").style.display="none";
    document.querySelector("h1").style.fontSize="49px";
}



