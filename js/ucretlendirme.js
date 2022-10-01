const tbody = document.querySelectorAll("tbody")
for (let btn of tbody) {
    btn.addEventListener("click", (e) => {
        const button = e.target.parentElement.querySelector("button");
        document.querySelector(".plaka-input").value = e.target.textContent;
        document.querySelector(".table-primary").classList.remove("table-primary");
        button.parentElement.parentElement.classList.add("table-primary")
        button.click()
        for (let index in numberPlate) {
            if (numberPlate[index].plaka == e.target.textContent) {
                const zaman = süreHesapla(numberPlate[index].giriszamani)
                const ucret = ucretHesapla(zaman,numberPlate[index].tur);
                let veresiyeler = veresiyeHesapla(e.target.textContent);
                let totalVeresiye = veresiyeYazdır(veresiyeler,ucret)
                document.getElementById("info").innerHTML = `<b>${e.target.textContent}</b> plakalı araç <b>${zaman.clock}</b> saat, <b>${zaman.minute}</b> dakikadır burada.`
                document.getElementById("ucret").innerHTML = `<b>${ucret}</b>`
                enterBekleme(document.querySelector(".modal"));
                break;
            }
        }
    })
}
function süreHesapla(giriszamani) {
    const second = Math.floor((new Date().getTime() - giriszamani) / 1000)
    let minute = Math.floor(second / 60);
    const clock = Math.floor(minute / 60);
    minute > 60 ? minute = minute % 60 : minute;
    let zaman = { clock: clock, minute: minute, }
    return zaman;
}

function ucretHesapla(zaman,tur) {
    //TODO 0.5 saat 12tl 1 saat 15tl 2 saat 20tl 3 saat 25tl 4 saat 30tl 5 saat 35tl
    //TODO 6 saat or 12 saat 40tl 

    let totalMinute = (zaman.clock * 60) + zaman.minute;

    let ucret;
    if (totalMinute <= 30) {
        ucret = 12;
    } else if (totalMinute <= 60) {
        ucret = 15;
    } else if (totalMinute <= 120) {
        ucret = 20;
    } else if (totalMinute <= 180) {
        ucret = 25;;
    } else if (totalMinute <= 240) {
        ucret = 30;
    } else if (totalMinute <= 300) {
        ucret = 35;
    } else if (totalMinute <= 1440){
        ucret = 40;
    }else if(totalMinute > 1440){
        ucret = 40;
        let gunSayisi = Math.floor(totalMinute / 1440)
        console.log(gunSayisi);
        gunSayisi !=0? ucret +=gunSayisi*30:console.log("gün olmadı");
    }


    if(tur == "Kamyonet"){
        ucret += 5
    }
    return ucret;
}

function veresiyeHesapla(girilenPlaka) {
    let veresiyeler = [];
    for (let arac of JSON.parse(localStorage.getItem("veresiye"))) {
        if (girilenPlaka == arac.plaka) {
            veresiyeler.push(arac)
        }
    }
    return veresiyeler;
}

function veresiyeYazdır(veresiyeler,ucret) {
    document.getElementById("veresiye-ucret").innerHTML = ""
    document.getElementById("total-veresiye").innerHTML = ""
    document.getElementById("ucret").innerHTML = ""
    document.getElementById("total-ucret").innerHTML = ""
    document.getElementById("otopark-ucret").innerHTML = ""
    let totalVeresiye = 0;
    for (let veresiye of veresiyeler) {
        totalVeresiye += Number(veresiye.miktar)
        html = `<small class = "d-block text-danger">Veresiye Ücreti: <span id="veresiye-ucret">${veresiye.miktar}</span>₺ Veresiye Tarihi: <span id="veresiye-tarihi">${veresiye.tarih}</span></small>`
        document.getElementById("veresiye-ucret").insertAdjacentHTML("afterbegin", html)
    }
    if (veresiyeler.length != 0) {
        document.getElementById("total-veresiye").innerHTML = `Toplam veresiye ücreti: <b>${totalVeresiye}</b>₺`
        document.getElementById("total-ucret").innerHTML = `Toplam Ücret: <b>${totalVeresiye + ucret}</b>₺`
        document.getElementById("otopark-ucret").insertAdjacentHTML("afterbegin",`<button type="button" class="btn btn-primary" onclick= "cıkısyap(false)" id="otopark-ucret">Otopark Ücreti</button>`)
    }
    return totalVeresiye;
}