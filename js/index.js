(function() {

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

let accountantCheckbox = document.querySelector("input[name=accountant]"),
    accountantValue = document.getElementById("accountant__value");

let terminalCheckbox = document.querySelector("input[name=terminal]"),
    terminalValue = document.getElementById("terminal__value");

let totalValue = document.getElementById("total__value");

let productsTotal = 0,
    ordersTotal = 0,
    accountantTotal = 35,
    terminalTotal = 5,
    packageTotal = 0;


accountantValue.innerText = accountantTotal + "$";
terminalValue.innerText = terminalTotal + "$";


/* Calculate sum */

let totalUpdate = function() {
    total  = parseInt(productsTotal) + parseInt(ordersTotal) + packageTotal + accountantTotal + terminalTotal;

    totalValue.innerText = total + "$";
}


/* Inputs products && orders */ 

productsQuantity.addEventListener("input", function() {
    
    productsPriceCalc.innerText = parseInt(productsQuantity.value).toFixed() + " * 0.5$";
    productsPriceValue.innerText = (productsQuantity.value * 0.5).toFixed(2) + "$";

    productsTotal = (productsQuantity.value * 0.5).toFixed(2);

    totalUpdate();       
});


ordersQuantity.addEventListener("input", function() {

    ordersPriceCalc.innerText = parseInt(ordersQuantity.value).toFixed() + " * 0.25$";
    ordersPriceValue.innerText = (ordersQuantity.value * 0.5).toFixed(2) + "$";

    ordersTotal = (ordersQuantity.value * 0.5).toFixed(2);

    totalUpdate();    
});


/* Checkbox accountant && terminal */


accountantCheckbox.addEventListener("change", function() {

    if(this.checked) {
        accountantTotal = 35;
        accountantValue.innerText = accountantTotal + "$"; 
    } else {
        accountantTotal = 0;
        accountantValue.innerText = accountantTotal + "$"; 
    }

    totalUpdate();
});


terminalCheckbox.addEventListener("change", function() {

    if(this.checked) {
        terminalTotal = 5;
        terminalValue.innerText = terminalTotal + "$"; 
    } else {
        terminalTotal = 0;
        terminalValue.innerText = terminalTotal + "$"; 
    }

    totalUpdate();
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
                packageTotal = 0;
        
            } else if (z.innerHTML === "Profesjonalny") {
                selectPackage.innerText = "Profesjonalny";
                selectPackageValue.innerText = "25$";
                packageTotal = 25;
        
            } else if (z.innerHTML === "Premium") {
                selectPackage.innerText = "Premium";
                selectPackageValue.innerText = "60$";
                packageTotal = 60;
            }

        totalUpdate();   

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



/* ------------------------------ Contact form validation ----------------------------------------------------------- */

let contactForm = document.querySelector(".form__area"),
    fields  = contactForm.querySelectorAll("[data-error]");

function isNotEmpty(field) {
    return field.value !== "";
}

function isEmail(field) {
    return field.value.indexOf("@") !== -1;
}

function displayErrors(errors) {
    let ul = document.querySelector("ul.contactForm-error");

    if(!ul) {
        ul = document.createElement("ul");

        ul.classList.add("contactForm-error");
    }

    ul.innerHTML = "";

    errors.forEach(function(error) {
        let li = document.createElement("li");

        li.textContent = error;

        ul.appendChild(li);
        
    });

    contactForm.parentNode.insertBefore(ul, contactForm);
}


contactForm.addEventListener("submit", function(e) {

    e.preventDefault();

    let errors = [];

    for(let i = 0; i < fields.length; i++) {
        let field = fields[i],
            isValid = false;

        if(field.type === "text") {
            isValid = isNotEmpty(field);

        } else if(field.type === "email") {
            isValid = isEmail(field);
        } 

        if(!isValid) {
            field.classList.add("contactForm-error");
            errors.push(field.dataset.error);
        } else {
            contactForm.submit();
        }
    }

    if(errors.length) {
        displayErrors(errors);
    } else {
        contactForm.submit();
    }

    console.log(errors);

}, false);

})();

