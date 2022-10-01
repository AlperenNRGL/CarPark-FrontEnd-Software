veresiyeleriListele()
function veresiyeleriListele() {
    let liste = JSON.parse(localStorage.getItem("veresiye"))
    for (let veresiye of liste) {
        html = `
        <tr>
            <td class="fw-bold fs-5 plaka">${veresiye.plaka}</td>
            <td>${veresiye.tarih}</td>
            <td class="fw-bold fs-5">${veresiye.miktar}₺</td>
            <td><button type="button" class="btn btn-outline-success p-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"class="bi bi-trash3" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"></path></svg> Veresiye Öde</button></td>
        </tr>`
        document.querySelector("tbody").insertAdjacentHTML("afterbegin", html)
    }
}


for (let veresiye of document.querySelectorAll(".btn-outline-success")) {
    veresiye.addEventListener("click", (e) => {
        const element = e.target.parentElement.parentElement;
        const plaka = element.children[0].textContent
        const tarih = element.children[1].textContent
        const miktar = element.children[2].textContent.replace("₺", "")
        document.getElementById("modal-btn").click()
        document.querySelector(".modal-body").innerHTML = `<b>${plaka}</b> plakalın aracın <b>${miktar}</b>₺ veresiye borcunu ödemek istediğinize emin misiniz ?`
        document.getElementById("veresiye-sil").addEventListener("click", (e) => {
            veresiyeSil(plaka, tarih, miktar)
            element.remove();
        })
    })
}


function veresiyeSil(plaka, tarih, ucret) {
    liste = JSON.parse(localStorage.getItem("veresiye"))
    for (let index in liste) {
        if (liste[index].plaka == plaka && liste[index].miktar == ucret && liste[index].tarih == tarih)
            liste.splice(index, 1)
    }
    localStorage.setItem("veresiye", JSON.stringify(liste))
    document.getElementById("modal-close").click();
    showMessages();
    kasadakiPara(Number(ucret))
}

function kasadakiPara(bakiye){
    let veri = JSON.parse(localStorage.getItem("kasadakipara"))
    let old = Number(veri[0].bakiye)
    old += bakiye
    veri[0].bakiye = old
    localStorage.setItem("kasadakipara",JSON.stringify(veri))
}


function showMessages(){
    document.getElementById("alert").classList.add("show");
    setTimeout(()=>{
        document.getElementById("alert").classList.replace("show","hide");
    },1500)
}
