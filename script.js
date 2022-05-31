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
    link:{
        local: "http://api.openweathermap.org/geo/1.0/direct?",
        previsao_atual: "http://api.openweathermap.org/data/2.5/weather?",
        previsao_longo:"http://api.openweathermap.org/data/2.5/forecast?"
    },
    lang: "pt",
    units: "metric"
}


async function displayon(){
    if(city.value.length){

        //URL para pegar latitude, longitude e nomes da cidade
        const local_Url = `${api.link.local}q=${city.value}&units=${api.units}&lang=${api.lang}&appid=${api.key}`;
        const response_local = await fetch(local_Url);
        if (response_local.hasOwnProperty('erro') || response_local.cod == 401){
            alert("Endereço Inválido")
        }else {

            const data_local = await response_local.json();
            console.log(data_local)
            // Pegar a previsão do dia
            const atual_Url= `${api.link.previsao_atual}lat=${data_local[0].lat}&lon=${data_local[0].lon}&units=${api.units}&lang=${api.lang}&appid=${api.key}`;
            const response_atual = await fetch(atual_Url);

            //URL para preencher os dias da semana
            const longo_Url = `${api.link.previsao_longo}lat=${data_local[0].lat}&lon=${data_local[0].lon}&cnt=50&units=${api.units}&lang=${api.lang}&appid=${api.key}`;
            const response_longo = await fetch(longo_Url);

            if ((response_longo.hasOwnProperty('erro') || response_longo.cod == 401) 
            && (response_atual.hasOwnProperty('erro') || response_atual.cod == 401)){
                alert("Endereço Inválido")
            }else{
                const data_atual = await response_atual.json()
                console.log(data_atual)
                const data_longo = await response_longo.json();
                console.log(data_longo)
                PreencherNaTela(data_local, data_atual, data_longo);
            }
        }
    }
}








function PreencherNaTela(local_Api, atual, longo){
    local.innerHTML= `${local_Api[0].name}, ${local_Api[0].state}, ${local_Api[0].country}`
    descricao.innerHTML = `${(atual.main.temp).toFixed(0)}°C ${atual.weather[0].description}`
    minprincipal.innerHTML = `${(atual.main.temp_min).toFixed(0)}°`
    maxprincipal.innerHTML = `${(atual.main.temp_max).toFixed(0)}°`
    sensacao.innerHTML = `${(atual.main.feels_like).toFixed(0)}°C`
    vento.innerHTML = `${(atual.wind.speed).toFixed(0)}Km/h`
    humidade.innerHTML = `${(atual.main.humidity).toFixed(0)}%`



    document.querySelector(".searchResult").style.display="block";
    document.querySelector("h1").style.fontSize="30px";
}







function displayoff(){
    document.querySelector(".searchResult").style.display="none";
    document.querySelector("h1").style.fontSize="49px";
}



