import { fetchAPI } from "../utils/fetch_api";

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
  console.log(userData);
  if (validateInput(userData)) {
    if(!localStorage.token){
      alert("Please login first");
    }
    fetchAPI("http://localhost:5000/api/orders",
     {'x-acces-token': localStorage.getItem('token')}
     , JSON.parse(localStorage.cart),
      "POST");
  } else {
    alert("Input is invalid");
  }
};

const handleTax = (cart, option) => {
  const Taxes = {
    paypal: 0.1,
    directcheck: 0.15,
    banktransfer: 0.5,
  };
  const subTotalElement = document.getElementById("sub-total");
  const taxElement = document.getElementById("tax");
  const total = document.getElementById("total");
  const subTotal = cart.getSubTotal();
  let tax;
  switch (option) {
    case "paypad":
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

const cart = JSON.parse(localStorage.getItem("cart"));
(function () {
  const productsContainer = document.getElementById("products-container");
  productsContainer.innerHTML = `<h6 class="mb-3">Products</h6>`;
  for (const cartline of cart.cartLines) {
    const productContainer = `<div class="d-flex justify-content-between">
        <p>${cartline.product.name}   x (${cartline.quantity})</p>
        <p>$${cartline.getTotalPrince()}</p>
    </div>`;
    productsContainer.innerHTML += productContainer;
  }
  handleTax(cart, "paypal");
})();
(function () {
  const paypal = document.getElementById("paypal");
  const directcheck = document.getElementById("directcheck");
  const banktransfer = document.getElementById("banktransfer");
  paypal.addEventListener("change", () => {
    handleTax(cart, "paypal");
  });
  directcheck.addEventListener("change", () => {
    handleTax(cart, "directcheck");
  });
  banktransfer.addEventListener("change", () => {
    handleTax(cart, "banktransfer");
  });
})();
(function () {
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  placeOrderBtn.addEventListener("click", () => {
    getUserInput();
  });
})();
