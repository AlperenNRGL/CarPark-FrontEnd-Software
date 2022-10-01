//TODO Araba nesnesi oluştur.
//* => Araba nesnesinin fonksiyonları <=
//? Süre hesaplama 
//? Ücret hesaplama 
//!İki tane fonskiyon olacak bunlar; özel müşteri ve nrmal nüştreri için ayrı fonksiyonlar olacak. 
//* Nesnelerde arabanın özel müşteri olup olmadığını kontrol etmek için özel bir değişken oluştur.



class Araba{
    constructor(plaka, giriszamani,tur){
        this.plaka = plaka;
        this.giriszamani = giriszamani;
        this.girissaati = zamanFormatı();
        this.tur = tur;
    }
}

class Veresiye{
    constructor(plaka, miktar){
        this.plaka = plaka;
        this.miktar = miktar;
        this.tarih = zamanFormatı();
    }
}






