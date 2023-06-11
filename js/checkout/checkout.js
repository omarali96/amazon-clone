import { fetchAPI } from "/js/utils/fetch_api.js";
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
  if (validateInput(userData)) {
    if(!localStorage.token) alert('Please loggin first');
    const res = fetchAPI("http://localhost:8000/api/orders",
     {'x-access-token': localStorage.getItem('token')}
     , JSON.parse(localStorage.cart),
      "POST");
    if(res.status === 'success'){
      alert('Order is successfully placed.');
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
