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


/* Select */

let select  = document.getElementsByClassName("calc__select");


for(let i = 0; i < select.length; i++) {
    
    let selectElem = select[i].getElementsByTagName("select")[0],
        selectInput = document.createElement("div");
    /* For each element, create a new <div> that will act as the selected item: */

    selectInput.setAttribute("class", "select-selected");
    selectInput.innerHTML = selectElem.options[selectElem.selectedIndex].innerHTML;
    select[i].appendChild(selectInput);

    /* For each element, create a new <div> that will contain the option list: */
    let optionList = document.createElement("div");
    optionList.setAttribute("class", "select-items select-hide");

    for(let j = 1; j < selectElem.length; j++) {

    /* For each option in the original select element,
    create a new <div> that will act as an option item: */
        let optionItem = document.createElement("div");
        optionItem.innerHTML = selectElem.options[j].innerHTML;

        optionItem.addEventListener("click", function() {

        /* When an item is clicked, update the original select box,
        and the selected item: */

            let x, y, z;
            x = this.parentNode.parentNode.getElementsByTagName("select")[0];
            z = this.parentNode.previousSibling;

            for(let i = 0; i < x.length; i++) {

                if(x.options[i].innerHTML == this.innerHTML) {
                    x.selectedIndex = i;
                    z.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                
                    for(let k = 0; k < y.length; k++) {
                        y[k].removeAttribute("class");
                    }
                    this.setAttribute("class", "same-as-selected");
                    break;
                }
            }
            z.click();

            /* Select package and set values */

            let selectPackage = document.getElementById("package__select--option"),
                selectPackageValue = document.getElementById("package__select--value");

            if(z.innerHTML === "Podstawowy") {
                selectPackage.innerText = "Podstawowy";
                selectPackageValue.innerText = "0$";
        
            } else if (z.innerHTML === "Profesjonalny") {
                selectPackage.innerText = "Profesjonalny";
                selectPackageValue.innerText = "25$";
        
            } else if (z.innerHTML === "Premium") {
                selectPackage.innerText = "Premium";
                selectPackageValue.innerText = "60$";
            }
        });
        optionList.appendChild(optionItem);
    }
    select[i].appendChild(optionList);


    selectInput.addEventListener("click", function(e) {

    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active");
    });
}

function closeAllSelect(elem) {
  
    let selectItems = document.getElementsByClassName("select-items"),
        selectSelected = document.getElementsByClassName("select-selected"),
        arrNo = [];
 
    for (let i = 0; i < selectSelected.length; i++) {
      if (elem == selectSelected[i]) {
        arrNo.push(i)
      } else {
        selectSelected[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < selectItems.length; i++) {
      if (arrNo.indexOf(i)) {
        selectItems[i].classList.add("select-hide");
      } 
    }
  }

  document.addEventListener("click", closeAllSelect);


/* Calculate sum */


let total = document.getElementById("total__value"),
    productsTotal = document.getElementById("products__price--value"),
    ordersTotal = document.getElementById("orders__price--value"),
    packageTotal = document.getElementById("package__select--value"),
    accountantTotal = document.getElementById("accountant__value"),
    terminalTotal = document.getElementById("terminal__value");
  
total.innerText = parseInt(productsTotal.innerText) + parseInt(ordersTotal.innerText) + parseInt(packageTotal.innerText) + parseInt(accountantTotal.innerText) + parseInt(terminalTotal.innerText) + "$";

// total.innerText = parseInt(productsPriceValue.value) + parseInt(ordersPriceValue) + parseInt(selectPackageValue);
