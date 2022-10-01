const element = document.querySelector("tbody");



for(let islem of JSON.parse(localStorage.getItem("islemler"))){
    if(islem["cıkıssaati"]){
        html = `
        <tr class="text-danger">
            <td>${islem["plaka"]}</td>
            <td>${islem["girissaati"]} - ${islem["cıkıssaati"]}</td>
            <td>${islem["tur"]}</td>
        </tr>`
    }else{
        html = `
        <tr class="text-success">
            <td>${islem["plaka"]}</td>
            <td>${islem["girissaati"]}</td>
            <td>${islem["tur"]}</td>
        </tr>`
    }
    element.insertAdjacentHTML("afterbegin",html)
}