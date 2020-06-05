/* Input nr products && orders */

let productsQuantity = document.getElementById("calc__input--quantityProducts"),
    ordersQuantity = document.getElementById("calc__input--quantityOrders");

productsQuantity.min = 0;
productsQuantity.max = 100;

ordersQuantity.min = 0;
ordersQuantity.max = 1000;

let productsPriceCalc  = document.getElementById("products__price--calc"),
    productsPriceValue = document.getElementById("products__price--value"),
    ordersPriceCalc  = document.getElementById("orders__price--calc"),
    ordersPriceValue = document.getElementById("orders__price--value");


productsQuantity.addEventListener("change", function(e) {
    let productsQuantityValue = e.target.value,
        productsPrice = productsQuantityValue * 0.5;
    console.log(productsQuantityValue);
    console.log(productsPrice);

    return productsPriceCalc.innerText = productsQuantityValue + " * 0.5$",
           productsPriceValue.innerText = productsPrice + "$";
});


ordersQuantity.addEventListener("change", function(e) {
    let ordersQuantityValue = e.target.value;
    let ordersPrice = ordersQuantityValue * 0.25;
    console.log(ordersQuantityValue);
    console.log(ordersPrice);

    return ordersPriceCalc.innerText = ordersQuantityValue + " * 0.25$",
           ordersPriceValue.innerText = ordersPrice + "$";
});


/* Select package */

let calcSelect = document.querySelector(".calc__select"),
    selectPackage = document.getElementById("package__select--option"),
    selectPackageValue = document.getElementById("package__select--value");

calcSelect.addEventListener("change", function(e) {

    if(e.target.value === "basic") {
        selectPackage.innerText = "Podstawowy";
        selectPackageValue.innerText = "0$";

    } else if (e.target.value === "professional") {
        selectPackage.innerText = "Profesjonalny";
        selectPackageValue.innerText = "25$";

    } else if (e.target.value === "premium") {
        selectPackage.innerText = "Premium";
        selectPackageValue.innerText = "60$";
    }
});


/* Checkbox accountant && terminal */

let accountantCheckbox = document.querySelector("input[name=accountant]"),
    accountantValue = document.getElementById("accountant__value");

accountantCheckbox.addEventListener("change", function() {

    if(this.checked) {
        accountantValue.innerText = "35$"; 
    } else {
        accountantValue.innerText = "0$";
    }
});


let terminalCheckbox = document.querySelector("input[name=terminal]"),
    terminalValue = document.getElementById("terminal__value");

terminalCheckbox.addEventListener("change", function() {

    if(this.checked) {
        terminalValue.innerText = "$5"; 
    } else {
        terminalValue.innerText = "$0";
    }
});


/* Calculate sum */

let total = document.getElementById("total__value");


// total.innerText = parseInt(productsPriceValue.value) + parseInt(ordersPriceValue) + parseInt(selectPackageValue);


/* Select */

calcSelect.addEventListener("click", function() {

    if(this.className === "calc__select") {

    }

});



