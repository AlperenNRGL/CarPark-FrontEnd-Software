
const html = `<div class="d-block">
<svg viewBox="0 0 200 200" class="svg">
    <circle class="c-seconds circle" cx="95" cy="95" r="86" />
    <circle cx="95" cy="95" r="82" class = "circle" />
    <div class="clock d-flex flex-column align-tems-center">
        <div>12/12/2022</div>
        <div>Pazartesi</div>
        <div class="fw-bold fs-3">534₺</div>
    </div>
</svg>
</div>`
const element = document.getElementById("muhasebe-list");
const muhasebeVeri = JSON.parse(localStorage.getItem("muhasebe"));
let margin  = 0;
for(let veri of muhasebeVeri){
    const oran = hesapla(veri.bakiye)
    const renk = renkBelirle(oran)
    element.insertAdjacentHTML("beforeend",html)
    element.lastChild.style.marginLeft= `${margin}px`;
    element.lastChild.children[1].children[0].innerHTML = veri.tarih;
    element.lastChild.children[1].children[1].innerHTML = veri.gun;
    element.lastChild.children[1].children[2].innerHTML = `${veri.bakiye}₺`;
    element.lastChild.children[0].children[0].style.strokeDasharray = oran + 600;
    element.lastChild.children[0].children[1].style.strokeDasharray = 1200;
    element.lastChild.children[0].children[1].style.strokeWidth = "2px";
    element.lastChild.children[0].children[0].style.stroke = renk;
    margin +=220
}

function hesapla(bakiye){
    //? Kasadaki Para Miktarı
    const miktar = `${JSON.parse(localStorage.getItem("kasadakipara"))[0]["bakiye"]}₺`
    document.querySelector(".btn-sm").innerHTML = miktar

    oran = (500 / bakiye);
    //! Aralık 538
    return 538 / oran;
}

function renkBelirle(oran){
    if(oran <=100) "rgb(226, 34, 41)"
    else if(oran <=200)return "rgb(235, 66, 67)"
    else if(oran <=300)return "rgb(241, 115, 37)"
    else if(oran <=400)return "rgb(248, 164, 30)"
    else if(oran <=500)return "rgb(253, 209, 14)"
    else return "rgb(168, 194, 58)"
}


function kasadakiParaBtn(){
    const newValue = Number(document.querySelector(".form-control").value)
    let veri = JSON.parse(localStorage.getItem("kasadakipara"))
    veri[0]["bakiye"] = newValue
    localStorage.setItem("kasadakipara",JSON.stringify(veri))
    document.querySelector(".btn-outline-danger").click()
    window.location.reload()
}