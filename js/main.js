//!Ana Seçiciler - Main Selectors

const plusBtn = document.querySelectorAll(".plus");
const minusBtn = document.querySelectorAll(".minus");
const removeBtn = document.querySelectorAll(".remove");
const salePrice = document.querySelectorAll(".orange-span");
const originalPrice = document.querySelectorAll(".overline-span");
const cartItem = document.querySelectorAll(".cart-item");
const numberCount = document.querySelectorAll(".number");
const cart = document.querySelector(".cart");
const itemTotal = document.querySelectorAll(".item-total");
const totalSection = document.querySelector("#total-section");
const loaderAnimation = document.querySelector('.loader')

//! Toplam Bölümü Seçicileri - Total Section Selectors
const subTotal = document.querySelector("#subtotal");
const vat = document.getElementById("vat");
const shipping = document.getElementById("shipping");
const sum = document.getElementById("sum-price");

//!Varsayılan Değerler

let prevCount = null;
let nextCount = null;
let subTotalPrice = 0;
let newItemTotal = 0;
let newSalePrice = 0;
let newOriginalPrice = 0;

//!Varsayılan Ürün Değerleri

const cartItems = [
  {
    name: "Vintage Backpack",
    price: 94.99,
    sale: 54.99,
  },
  {
    name: "Levi Shoes",
    price: 124.99,
    sale: 74.99,
  },
  {
    name: "Antique Clock",
    price: 124.99,
    sale: 44.99,
  },
];

/*
Kullanılan i parametreleri ürünlerin index(sıra) numaralarıdır.
Event Listenerlar ile butonlara tıklanma olayı tanımlanırken
i parametresi, çalıştırılacak fonksiyonlara gönderilir. Event Listener'ların içerisinden "bind" işlemi yapılarak, çalıştıralacak fonksiyon işaret edilir. "this" kelimesi global scope'da kullanıldığı için, "bind" işlemi ile fonksiyonun çalıştırılacağı scope belirtilir. İkinci argument olarak ise, fonksiyona gönderilecek parametreler belirtilir.(örn i)
*/

//!Ürün Bazlı Fiyat Hesabı Fonksiyonu

const calculatePricesHandler = (i) => { 

  //Fiyat Hesaplamaları
  newOriginalPrice = cartItems[i].price * nextCount;
  originalPrice[i].innerText = newOriginalPrice.toFixed(2);
  newSalePrice = cartItems[i].sale * nextCount;
  salePrice[i].innerText = newSalePrice.toFixed(2);

  //Ürün bazlı Toplam fiyatları güncelle
  newItemTotal = newSalePrice;
  itemTotal[i].innerText = newItemTotal.toFixed(2);
  
  //Sepet Boş Olduğunda Sepeti Temizle
  subTotalPrice < 1 ? totalSection.remove() : null;
  subTotalPrice < 1 ? emptyCartHandler() : null;
};

//!Toplam Bölümü Hesaplamaları Fonksiyonu

const calculateSubTotalTaxShipping = () => {
  //Sepet Toplam Bölümü Fiyatlarını Güncelle
  subTotal.innerText = subTotalPrice.toFixed(2);
  vat.innerText = (subTotalPrice * 0.18).toFixed(2);
  shipping.innerText = (subTotalPrice * 0.1).toFixed(2);
  sum.innerText = (subTotalPrice * 1.28).toFixed(2);
}

//!Pozitif Fiyat Hesabı Fonksiyonu

const calculatePositivePrices = (i) => {
  // Artı Butonu ile Sepet Toplam Fiyatlarını Güncelle
  subTotalPrice += cartItems[i].sale;
  calculateSubTotalTaxShipping();
  calculatePricesHandler(i);
};

//!Negatif Fiyat Hesabı Fonksiyonu

const calculateNegativePrices = (i) => {
  // Eksi Butonu ile Sepet Toplam Fiyatlarını Güncelle
  subTotalPrice -= cartItems[i].sale;
  calculateSubTotalTaxShipping();
  calculatePricesHandler(i);
};

//!Artırma Butonu Fonksiyonu

const plusButtonHandler = (i) => {
  //Şimdiki değere 1 ekle
  prevCount = numberCount[i].innerHTML;
  nextCount = ++prevCount;
  numberCount[i].innerHTML = nextCount;

  //Fiyatları güncelle
  calculatePositivePrices(i);
};

//!Azaltma Butonu Fonksiyonu

const minusButtonHandler = (i) => {
  //Şimdiki değerden 1 çıkar
  prevCount = numberCount[i].innerHTML;
  nextCount = --prevCount;
  numberCount[i].innerHTML = nextCount;

  //Fiyatları güncelle
  calculateNegativePrices(i);

  //Eğer 0 adet ise ürünü 200ms gecikmeyle sil
  nextCount < 1 
  ?setTimeout(() => {
    cartItem[i].remove();
  }, 200)
   : null
}

//!Silme Butonu Fonksiyonu

const removeButtonHandler = (i) => {
  //Ürünü 200ms gecikmeyle sil
  setTimeout(() => {
    cartItem[i].remove();
  }, 200);

  //Sepet Toplam Fiyatlarını Güncelle
  subTotalPrice -= (cartItems[i].sale * numberCount[i].innerHTML);
  calculateSubTotalTaxShipping();

  //Sepet Toplam Bölümü Fiyatlarını Güncelle
  calculatePricesHandler(i);
};

//!Boş Sepet Uyarısı Fonksiyonu

const emptyCartHandler = () => {
  const emptyCart = document.createElement("div");
  emptyCart.classList.add("empty-cart");
  emptyCart.innerHTML = "<h2>Your cart is empty</h2>";
  cart.appendChild(emptyCart);
};

const loadingHandler = () => {
  //*Loading animasyonu göster
  cartItem.forEach((item) => {
    item.classList.add("remove-items")
  },
  totalSection.classList.add("remove-items"),
  )

  //*2 saniye sonra loading animasyonunu kaldır
  setInterval(() => {
    loaderAnimation.remove();
    cartItem.forEach((item) => {
      item.classList.remove("remove-items")
    },
    totalSection.classList.remove("remove-items"),
    )
  },2000)
}

//! Dummy Data Fonksiyonu

const dummyDataHandler = () => {
    loadingHandler()
    //Ürün bazlı Toplam fiyatları ilk yüklemede getir
  itemTotal.forEach((item, index) => {
    item.innerText = cartItems[index].sale;
  });

  //Sepet Ara Toplam Bölümü Fiyatını ilk yüklemede getir
  subTotal.innerText = subTotalPrice.toFixed(2);

  //Ürün Toplam Bölümü Fiyatlarını ilk yüklemede getir
  itemTotal.forEach((item) => {
    subTotalPrice += parseFloat(item.innerText);
    subTotal.innerText = subTotalPrice.toFixed(2);
  });

  //Toplam Bölümü Fiyatlarını ilk yüklemede getir
  vat.innerText = (subTotalPrice * 0.18).toFixed(2);
  shipping.innerText = (subTotalPrice * 0.1).toFixed(2);
  sum.innerText = (subTotalPrice * 1.28).toFixed(2);
}

//!Event Listeners

// Plus Button Event Listener
plusBtn.forEach((btn, index) => {
  btn.addEventListener("click", plusButtonHandler.bind(this, index));
});

// Eksi Butonu Event Listener
minusBtn.forEach((btn, index) => {
  btn.addEventListener("click", minusButtonHandler.bind(this, index));
});

// Silme Butonu Event Listener
removeBtn.forEach((btn, index) => {
  btn.addEventListener("click", removeButtonHandler.bind(this, index));
});

//!Sayfa her yüklendiğinde gelen varsayılan değerler 

document.addEventListener("DOMContentLoaded", dummyDataHandler);
