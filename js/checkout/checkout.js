import { fetchAPI } from "/js/utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
 // APIs

// logout function
let logout = function (){
  localStorage.removeItem("token")
   // go to home pages
   window. location. replace("index.html");
}

// check love and cart counter in localStorage 

window.onload = function(){
  if (!localStorage.hasOwnProperty("loveCount")) {
    localStorage.setItem("loveCount", JSON.stringify(0));
  }else{
    document.getElementById('love-counter').innerHTML = Number(localStorage.getItem("loveCount"));
  }

  if (!localStorage.hasOwnProperty("addToCartArray")) {
    localStorage.setItem("addToCartArray", JSON.stringify([]));
  }else{
      document.getElementById('cart-counter').innerHTML = JSON.parse(localStorage.getItem("addToCartArray")).length; 
  }

  if (!localStorage.hasOwnProperty("token")) {
    document.getElementById("access").innerHTML = `<a class="dropdown-item" href="login.html">Sign in</a><a class="dropdown-item" href="register.html">Sign up</a>`;
  }else{
    document.getElementById("access").innerHTML = `<p class="dropdown-item" id="logout">Logout</p>`;
    document.getElementById("logout").addEventListener('click',()=>logout())
  }
};



const handleCatData = function(jsonCategories) {
  for (let i = 0; i < jsonCategories.data.length; i++) {
    const category = new Category(
      jsonCategories.data[i].name,
      jsonCategories.data[i].image,
      jsonCategories.data[i].productCount,
      jsonCategories.data[i]._id
    );
    Category.addCategory(category);
  }
  Category.displayDropDownMenu();
};



const fetchCategories = function() {
  return new Promise((resolve, reject) => {
    const jsonCategories = fetchAPI("http://localhost:5000/api/categories/", {}, {}, "GET");
    resolve(jsonCategories);
    reject(new Error("Data not found."));
  });
} // Get json data (categories) from APIs



fetchCategories()
  .then(handleCatData)
  .catch((err) => {
    console.error("Error: ", err);
  });




















const validateInput = (user) => {
  if (typeof user !== "object") throw new Error("Data type is invalid");
  const nameReg = /^[A-Za-z\s]+$/;
  const addressReg = /^[a-zA-Z0-9\s,'-]+$/;
  const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const mobileReg = /^\d{10}$/;
  const cityStateReg = /^[A-Za-z\s]+$/;
  const zipcodeReg = /^\d{5}$/;
  if (
    nameReg.test(user.firstNameInput) &&
    nameReg.test(user.lastNameInput) &&
    addressReg.test(user.address1Input) &&
    addressReg.test(user.address2Input) &&
    emailReg.test(user.emailInput) &&
    mobileReg.test(user.mobileInput) &&
    cityStateReg.test(user.stateInput) &&
    cityStateReg.test(user.cityInput) &&
    zipcodeReg.test(user.zipcodeInput)
  ) {
    return true;
  }
  return false;
};

const clearLocalStorage = ()=>{
  for(let i=0; i<localStorage.length; i++){
    const key = localStorage.key(i);
    if(key !== 'token') localStorage.removeItem(key);
  }
}
const getUserInput = () => {
  const countryInput = document.getElementById("countryInput");
  const selectedIndex = countryInput.selectedIndex;
  const selectedOption = countryInput.options[selectedIndex];
  const userData = {
    firstNameInput: document.getElementById("firstNameInput"),
    lastNameInput: document.getElementById("lastNameInput"),
    emailInput: document.getElementById("emailInput"),
    address1Input: document.getElementById("address1Input"),
    address2Input: document.getElementById("address2Input"),
    mobileInput: document.getElementById("mobileInput"),
    cityInput: document.getElementById("cityInput"),
    stateInput: document.getElementById("stateInput"),
    zipcodeInput: document.getElementById("zipcodeInput"),
    selectedCountry: selectedOption.text,
  };
  console.log(userData);
  if (validateInput(userData)) {
    if(!localStorage.token) alert('Please loggin first');
    const res = fetchAPI("http://localhost:8000/api/orders",
     {'x-access-token': localStorage.getItem('token')}
     , JSON.parse(localStorage.cart),
      "POST");
    if(res.status === 'success'){
      alert('Order is successfully placed.');
      clearLocalStorage();
      window.location.href = 'index.html';
    }
    else{
      alert('Error! Try again.');
    }
  } else {
    alert("Input is invalid");
  }
};

const handleTax = (sum, option) => {
  const Taxes = {
    paypal: 0.1,
    directcheck: 0.15,
    banktransfer: 0.05,
  };
  const subTotalElement = document.getElementById("sub-total");
  const taxElement = document.getElementById("tax");
  const total = document.getElementById("total");
  const subTotal = sum;
  let tax;
  switch (option) {
    case "paypal":
      tax = Taxes.paypal * subTotal;
      break;
    case "directcheck":
      tax = Taxes.directcheck * subTotal;
      break;
    case "banktransfer":
      tax = Taxes.banktransfer * subTotal;
      break;
    default:
      tax = Taxes.paypal * subTotal;
      break;
  }
  subTotalElement.innerHTML = subTotal;
  taxElement.innerHTML = tax;
  total.innerHTML = tax + subTotal;
};

const cartlines = JSON.parse(localStorage.getItem('cart'));
let sum = 0;
console.log(cartlines);
console.log(cartlines[0].quantity);
(function () {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = `<h6 class="mb-3">Products</h6>`;
  for (const line of cartlines) {
    sum+=line.productDiscounted * line.quantity;
    const productContainer = `<div class="d-flex justify-content-between">
        <p>${line.productName}   x (${line.quantity})</p>
        <p>$${line.productDiscounted * line.quantity}</p>
    </div>`;
    productsContainer.innerHTML += productContainer;
  }
  handleTax(sum, "paypal");
})();
(function () {
  const paypal = document.getElementById("paypal");
  const directcheck = document.getElementById("directcheck");
  const banktransfer = document.getElementById("banktransfer");
  paypal.addEventListener("change", () => {
    handleTax(sum, "paypal");
  });
  directcheck.addEventListener("change", () => {
    handleTax(sum, "directcheck");
  });
  banktransfer.addEventListener("change", () => {
    handleTax(sum, "banktransfer");
  });
})();
(function () {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", () => {
    getUserInput();
  });
})();
