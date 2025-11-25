var clima = document.getElementById('clima');
var maxmin = document.getElementById('maxmin')
var temp = document.getElementById('temp');
var humidity = document.getElementById('humidity');
var nascerDoSol = document.getElementById('nascer-do-sol')
var chanceChuva = document.getElementById('chance-chuva')
var porDoSol = document.getElementById('por-do-sol')
var vento = document.getElementById('vento')

var remetenteAlert = document.getElementById('remetente')
var eventoAlert = document.getElementById('evento')
var descricaoAlert = document.getElementById('descricao')
var duracaoAlert = document.getElementById('duracao')

var dia1 = document.getElementById("dia1"), dia2 = document.getElementById("dia2"), dia3 = document.getElementById("dia3"), dia4 = document.getElementById("dia4"), dia5 = document.getElementById("dia5"), dia6 = document.getElementById("dia6"), dia7 = document.getElementById("dia7")

var chanceChuvaDia1 = document.getElementById("chance-chuva-dia1"), chanceChuvaDia2 = document.getElementById("chance-chuva-dia2"), chanceChuvaDia3 = document.getElementById("chance-chuva-dia3"),chanceChuvaDia4 = document.getElementById("chance-chuva-dia4"),chanceChuvaDia5 = document.getElementById("chance-chuva-dia5"),chanceChuvaDia6 = document.getElementById("chance-chuva-dia6"),chanceChuvaDia7 = document.getElementById("chance-chuva-dia7")

var maxminDia1 = document.getElementById('maxmin1'), 
maxminDia2 = document.getElementById('maxmin2'),
maxminDia3 = document.getElementById('maxmin3'),
maxminDia4 = document.getElementById('maxmin4'),
maxminDia5 = document.getElementById('maxmin5'),
maxminDia6 = document.getElementById('maxmin6'),
maxminDia7 = document.getElementById('maxmin7')

const dias = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"]
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Ago", "Set", "Out", "Nov", "Dez"]

async function getDataPtn() {
    const url = "https://api.openweathermap.org/data/2.5/onecall?lat=-13.4557&lon=-39.4212&units=metric&appid=5796abbde9106b7da4febfae8c44c232&lang=pt_br";

    const url2 = "https://api.openweathermap.org/data/2.5/weather?lat=-13.4557&lon=-39.4212&units=metric&appid=5796abbde9106b7da4febfae8c44c232&lang=pt_br"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();

        var climaValue = result.current.weather[0].description
        clima.innerText = climaValue

        var tempValue = result.current.temp
        temp.innerText = Math.round(tempValue) + "ºC";

        var humidityValue = result.current.humidity
        humidity.innerText = "Umidade: " + humidityValue + "%"

        var nascerDoSolValue = new Date(result.current.sunrise * 1000);
        nascerDoSol.innerText = nascerDoSolValue.getHours() + "h" + ":" + nascerDoSolValue.getMinutes() + "min";

        var porDoSolValue = new Date(result.current.sunset * 1000);
        porDoSol.innerText = porDoSolValue.getHours() + "h" + ":" + porDoSolValue.getMinutes() + "min";

        
        var ventoValue = result.current.wind_speed
        vento.innerText = "Vento: " + ventoValue + "m/s";

        //var remetenteValue = result.alerts[0].sender_name
        //remetenteAlert.innerText = remetenteValue

        //verificando se existe alerts
        if(result?.alerts){
            var eventoValue = result.alerts[0].event
        }

        // se o evento retornar nulo, <div> alert é desativada
        if(eventoValue != null){
            eventoAlert.innerText = "Alerta de " + eventoValue

            var descricaoValue = result.alerts[0].description
            descricaoAlert.innerText = descricaoValue

            var inicioAlert = new Date(result.alerts[0].start * 1000)
            var fimAlert = new Date(result.alerts[0].end * 1000)

            duracaoAlert.innerText = "Entre " + inicioAlert.toLocaleDateString() + " das " + inicioAlert.toLocaleTimeString() + " até o dia " + fimAlert.toLocaleDateString() + " às " + fimAlert.toLocaleTimeString();
        }else document.getElementById('alerts').style.display = "none"

        maxmin.innerText = "Min " + Math.round(result.daily[0].temp.min) + "º / " + "Max " + Math.round(result.daily[0].temp.max) + "º"

        //chance de chuva para o dia atual, pega o primeiro objeto .daily
        chanceChuva.innerText = "Chuva: " + (result.daily[0].pop * 100) + "%"

        var dia1Value = new Date(result.daily[1].dt * 1000)
        dia1.innerText = dias[dia1Value.getDay()] + ", " + dia1Value.getDate() + "/" + dia1Value.getMonth()
        maxminDia1.innerText = Math.round(result.daily[1].temp.min) + " / " + Math.round(result.daily[1].temp.max) + " ºC"

        var dia2Value = new Date(result.daily[2].dt * 1000)
        dia2.innerText = dias[dia2Value.getDay()] + ", " + dia2Value.getDate() + "/" + dia2Value.getMonth()
        maxminDia2.innerText = Math.round(result.daily[2].temp.min) + " / " + Math.round(result.daily[2].temp.max) + " ºC"
        
        var dia3Value = new Date(result.daily[3].dt * 1000)
        dia3.innerText = dias[dia3Value.getDay()] + ", " + dia3Value.getDate() + "/" + dia3Value.getMonth()
        maxminDia3.innerText = Math.round(result.daily[3].temp.min) + " / " + Math.round(result.daily[3].temp.max) + " ºC"

        var dia4Value = new Date(result.daily[4].dt * 1000)
        dia4.innerText = dias[dia4Value.getDay()] + ", " + dia4Value.getDate() + "/" + dia4Value.getMonth()
        maxminDia4.innerText = Math.round(result.daily[4].temp.min) + " / " + Math.round(result.daily[4].temp.max) + " ºC"

        var dia5Value = new Date(result.daily[5].dt * 1000)
        dia5.innerText = dias[dia5Value.getDay()] + ", " + dia5Value.getDate() + "/" + dia5Value.getMonth()
        maxminDia5.innerText = Math.round(result.daily[5].temp.min) + " / " + Math.round(result.daily[5].temp.max) + " ºC"

        var dia6Value = new Date(result.daily[6].dt * 1000)
        dia6.innerText = dias[dia6Value.getDay()] + ", " + dia6Value.getDate() + "/" + dia6Value.getMonth()
        maxminDia6.innerText = Math.round(result.daily[6].temp.min) + " / " + Math.round(result.daily[6].temp.max) + " ºC"

        var dia7Value = new Date(result.daily[7].dt * 1000)
        dia7.innerText = dias[dia7Value.getDay()] + ", " + dia7Value.getDate() + "/" + dia7Value.getMonth() 
        maxminDia7.innerText = Math.round(result.daily[7].temp.min) + " / " + Math.round(result.daily[7].temp.max) + " ºC"

        chanceChuvaDia1.innerText = "Chuva: " + Math.round((result.daily[1].pop) * 100) + "%"
        chanceChuvaDia2.innerText = "Chuva: " + Math.round((result.daily[2].pop) * 100) + "%"
        chanceChuvaDia3.innerText = "Chuva: " + Math.round((result.daily[3].pop) * 100) + "%"
        chanceChuvaDia4.innerText = "Chuva: " + Math.round((result.daily[4].pop)) * 100 + "%"
        chanceChuvaDia5.innerText = "Chuva: " + Math.round((result.daily[5].pop) * 100) + "%"
        chanceChuvaDia6.innerText = "Chuva: " + Math.round((result.daily[6].pop)) * 100 + "%"
        chanceChuvaDia7.innerText = "Chuva: " + Math.round((result.daily[7].pop)) * 100 + "%"


    } catch (error) {
        console.error(error.message);
    }
}
getDataPtn()

//atualizar a cada 3 minutos
setInterval(getDataPtn, 60000*3)

