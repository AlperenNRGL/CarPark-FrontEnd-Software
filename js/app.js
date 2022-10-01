const ui = new Ui()
window.addEventListener("DOMContentLoaded", () => {
    veriTabanlarıKontrolEt();
    plakalarıgöster();
    ui.input_plaka.focus()
})

ui.input_plaka.addEventListener("keyup", (e) => {
    getToLocalStroage();
    let girilenPlaka = ui.input_plaka.value.toUpperCase();
    if (e.key == "Enter") {
        keyEnter(girilenPlaka);
        return;
    } else if (e.key == "ArrowDown" || e.key == "ArrowUp") {
        keyArrow(e.key);
        return;
    }

    filter(girilenPlaka);
})

function aracturu(e) {
    tur = e.textContent;

}

function keyEnter(girilenPlaka) {
    if (!document.querySelector(".table-primary")) {
        document.getElementById("modal-body-plaka").innerHTML = girilenPlaka;
        document.getElementById("arac-turu-modal").click()
        document.querySelector(".arac-turu-modal").addEventListener("keyup", function tıklama(e) {
            if (e.key == "Enter") {
                document.querySelector(".btn-taksi").click();
                document.querySelector(".arac-turu-modal").removeEventListener("keyup", tıklama);
            }
        })
        function modalKapanma(){
            setTimeout(()=>{
                let newCar = new Araba(girilenPlaka, new Date().getTime(), tur)
                let liste = getToLocalStroage();
                liste.push(newCar)
                saveToLocalStroage(liste);
                plakalarıgöster();
                ui.input_plaka.value = ""
                ui.input_plaka.focus();
                showMessages(`<img width="35" height="35" src="../images/icons8-ok-50.png"> <b>${girilenPlaka}</b> plakalı araç giriş yaptı.`, "bg-success")
                islemGecmisiEkle(newCar);

            },50)
        }
        document.querySelector(".arac-turu-modal").addEventListener("hide.bs.modal", modalKapanma)
        
        document.querySelector(".arac-turu-modal").addEventListener("hidden.bs.modal", () =>{
            document.querySelector(".arac-turu-modal").removeEventListener("hide.bs.modal",modalKapanma)
        })
        document.querySelector(".arac-uyari").classList.replace("d-block","d-none")
    } else {
        let element = document.querySelector(".table-primary").children[0];
        document.getElementById("plaka-input").value = element.textContent;
        element.children[0].click();
    }


}

function keyArrow(key) {
    //! Ui nesnesi üzerinden aldığın zaman olmuyor çünkü sürekli değişkenlik gösteriyor.
    const element = document.querySelector(".table-primary");
    const tbody = document.querySelector("tbody")
    if (key == "ArrowUp") {
        if (tbody.firstChild == element)
            return;
        element.previousElementSibling.classList.add("table-primary");
    } else {
        if (tbody.lastChild == element)
            return;
        element.nextElementSibling.classList.add("table-primary")
    }
    element.classList.remove("table-primary");

}

function saveToLocalStroage(liste) {
    localStorage.setItem("otopark", JSON.stringify(liste))
}

numberPlate = []
function getToLocalStroage() {
    let data = localStorage.getItem("otopark");
    numberPlate = JSON.parse(data);
    return JSON.parse(data);
}

function filter(girilenPlaka) {
    filterPlate = []
    document.querySelector(".arac-uyari").classList.replace("d-block","d-none")
    for (let plaka of numberPlate) {
        if (plaka.plaka.includes(girilenPlaka)) {
            filterPlate.push(plaka)
            plakalarıgöster(filterPlate);
        }
    }
    if (filterPlate.length == 0) {
        document.querySelector("tbody").innerHTML = ""
        document.querySelector(".arac-uyari").classList.replace("d-none","d-block")
    }
}

function plakalarıgöster(liste) {

    const element = document.querySelector("tbody");
    element.innerHTML = "";
    for (let plaka of liste || getToLocalStroage()) {
        // html = `<button class="list-group-item list-group-item-action fw-boldx" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${plaka.plaka}</button>`
        html = `<tr>
        <td><button class="list-group-item fs-5 list-group-item-action fw-bold fw-boldx" data-bs-toggle="modal" data-bs-target="#staticBackdrop">${plaka.plaka}</button></td>
        <td class = "fs-5">${plaka.girissaati}</td>
        <td class = "fs-5 turler">${plaka.tur}</td>
      </tr>`
        element.insertAdjacentHTML("afterbegin", html)
    }
    
    element.firstChild?element.firstChild.classList.add("table-primary"):""

    for (let tur of document.querySelectorAll(".turler")) {
        tur.textContent == "Kamyonet" ? tur.classList.add("text-danger") : ""
    }
}

function cıkısyap(veresiye) {
    getToLocalStroage();
    const plaka = ui.input_plaka.value
    for (let index in numberPlate) {
        if (numberPlate[index].plaka == plaka) {
            numberPlate[index]["cıkıssaati"] = zamanFormatı()
            islemGecmisiEkle(numberPlate[index])
            const ucret = ucretHesapla(süreHesapla(numberPlate[index]["giriszamani"]), numberPlate[index]["tur"])
            muhasebe(ucret);
            veresiye?kasadakiPara(ucret):"";
            numberPlate.splice(index, 1)
            break;
        }
    }
    saveToLocalStroage(numberPlate)
    ui.close.click();
    showMessages(`<img width="35" height="35" src="../images/icons8-box-important-48.png"> <b>${plaka}</b> plakalı araç çıkış yaptı.`, "bg-warning");
    veresiye ? veresiyeSil(plaka) : "";
    ui.input_plaka.value = ""
    ui.input_plaka.focus()
    plakalarıgöster();
}

function zamanFormatı() {
    const d = new Date();
    const gün = d.getDate();
    const ay = d.getMonth() + 1;
    const yıl = d.getFullYear();
    const saat = d.getHours();
    const dakika = d.getMinutes();
    return `${gün}/${ay}/${yıl} ${saat}:${dakika}`;
}

function showMessages(message, tur) {
    document.querySelector(".toast").classList.replace("hide", "show");
    document.querySelector(".toast-body").innerHTML = message
    document.querySelector(".toast-body").classList.add(tur)
    setTimeout(() => {
        document.getElementById("toast-close").click();
        document.querySelector(".toast-body").classList.remove(tur)

    }, 1000)
}

function veresiyeyap() {
    const ucret = document.getElementById("ucret").textContent;
    const plaka = ui.input_plaka.value
    let newVeresiye = new Veresiye(plaka, ucret)
    let liste = JSON.parse(localStorage.getItem("veresiye"))
    liste.push(newVeresiye)
    localStorage.setItem("veresiye", JSON.stringify(liste))
    cıkısyap(false);
    showMessages(`<img width="35" height="35" src="../images/icons8-deposit-64.png"> <b>${plaka}</b> plakalı araç veresiye yazıldı`, "bg-danger")
}

function enterBekleme(element) {
    element.addEventListener("keyup", function tıklama(e) {
        if (e.key == "Enter") {
            cıkısyap(true);
            document.querySelector(".modal").removeEventListener("keyup", tıklama);
        }
    })

}

function veresiyeSil(veri) {
    let liste = JSON.parse(localStorage.getItem("veresiye"));
    for (let index in liste) {
        //!
        if (liste[index].plaka == veri) {
            liste.splice(index, 1)
        }
    }
    localStorage.setItem("veresiye", JSON.stringify(liste))
}

function islemGecmisiEkle(veri) {
    let islemlistesi = JSON.parse(localStorage.getItem("islemler"))
    islemlistesi.push(veri)
    localStorage.setItem("islemler", JSON.stringify(islemlistesi))
}

function muhasebe(bakiye) {
    const tarih = new Date();
    const zaman = `${tarih.getDate()}/${tarih.getMonth() + 1}/${tarih.getFullYear()}`
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const gun = days[tarih.getDay()];
    let liste = JSON.parse(localStorage.getItem("muhasebe"));
    let degisiklikYap = true;
    for (let index in liste) {
        if (liste[index]["tarih"] == zaman) {
            liste[index]["bakiye"] += bakiye
            degisiklikYap = false;
            break;
        }
    }
    if (degisiklikYap) {
        liste.push({ "tarih": zaman, "bakiye": bakiye, "gun": gun })
    }
    localStorage.setItem("muhasebe", JSON.stringify(liste))
}

function veriTabanlarıKontrolEt(){

    if(!localStorage.getItem("otopark")){
        localStorage.setItem("otopark",JSON.stringify([]))
    }
    if(!localStorage.getItem("veresiye")){
        localStorage.setItem("veresiye",JSON.stringify([]))
    }
    if(!localStorage.getItem("muhasebe")){
        localStorage.setItem("muhasebe",JSON.stringify([]))
    }
    if(!localStorage.getItem("islemler")){
        localStorage.setItem("islemler",JSON.stringify([]))
    }
    if(JSON.parse(localStorage.getItem("islemler")).length > 2000){
        let liste = JSON.parse(localStorage.getItem("islemler"))
        console.warn("İşlem geçmişi temizlendi !")
        liste.splice(0,JSON.parse(localStorage.getItem("islemler").length - 50));
        localStorage.setItem("islemler",JSON.stringify(liste))
    }
}

function kasadakiPara(bakiye){
    let veri = JSON.parse(localStorage.getItem("kasadakipara"))
    let old = Number(veri[0].bakiye)
    old += bakiye
    veri[0].bakiye = old
    localStorage.setItem("kasadakipara",JSON.stringify(veri))
}



