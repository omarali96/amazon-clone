import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
const cartlines = JSON.parse(localStorage.getItem('cart'));
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

/**
 * The function validates user input data based on regular expressions and returns true if all inputs
 * match the expected format.
 * @returns a boolean value - `true` if all the input fields match their respective regular
 * expressions, and `false` otherwise.
 */
const validateInput = (user) => {
  if (typeof user !== "object") throw new Error("Data type is invalid");
  const nameReg = /^[a-z ,.'-]+$/i;
  const addressReg = /^[A-Za-z0-9'\.\-\s\,]+$/;
  const emailReg = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/;
  const mobileReg = /^[0-9]{11}$/;
  const cityReg = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]*)/;
  const stateReg=/[A-Za-z]*$/
  const zipcodeReg = /^[0-9]{5}$/;
  if (
    //     address1Input
    // :
    // "17  Ibrahim Saif from Ali Heiba"
    // address2Input
    // :
    // "asd"
    // cityInput
    // :
    // "Victoria, Alexandria"
    // emailInput
    // :
    // "oamr@gmail.com"
    // firstNameInput
    // :
    // "omar"
    // lastNameInput
    // :
    // "ali"
    // mobileInput
    // :
    // "01012107754"
    // selectedCountry
    // :
    // "Egypt"
    // stateInput
    // :
    // "alex"
    // zipcodeInput
    // :
    // "21628
    nameReg.test(user.firstNameInput) &&
    nameReg.test(user.lastNameInput) &&
    addressReg.test(user.address1Input) &&
    addressReg.test(user.address2Input) &&
    emailReg.test(user.emailInput) &&
    mobileReg.test(user.mobileInput) &&
    stateReg.test(user.stateInput) &&
    cityReg.test(user.cityInput) &&
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
}/**
 * The function gets user input, validates it, and sends a POST request to a server to place an order
 */

const  getUserInput = async () => {
  const countryInput = document.getElementById("countryInput");
  const selectedIndex = countryInput.selectedIndex;
  const selectedOption = countryInput.options[selectedIndex];
  const userData = {
    firstNameInput: document.getElementById("firstNameInput").value,
    lastNameInput: document.getElementById("lastNameInput").value,
    emailInput: document.getElementById("emailInput").value,
    address1Input: document.getElementById("address1Input").value,
    address2Input: document.getElementById("address2Input").value,
    mobileInput: document.getElementById("mobileInput").value,
    cityInput: document.getElementById("cityInput").value,
    stateInput: document.getElementById("stateInput").value,
    zipcodeInput: document.getElementById("zipcodeInput").value,
    selectedCountry: selectedOption.text
};
const subTotalElement = document.getElementById("sub-total");
const taxElement = document.getElementById("tax");
const total = document.getElementById("total");
const subTotal = subTotalElement.innerHTML;
const tax = taxElement.innerHTML;
const totalPrice = total.innerHTML;
const date = new Date();
const order_details = [];
const user_id = localStorage.user_id;
for(const line of cartlines){
  const product = {};
  product.product_id = line.id;
  product.price = line.productDiscounted;
  product.qty = line.quantity;
  order_details.push(product);
}
  console.log(userData);
  if (validateInput(userData)) {
    if(!localStorage.token) {
      alert("Please login first");
    }
    const body = {
      shipping_info:userData,
      sub_total_price:subTotal,
      shipping:tax,
      sub_total_price:totalPrice,
      user_id:user_id,
      order_date:date,
      order_details:order_details
    }
    console.log(body);
    const res = await fetchAPI("http://localhost:5000/api/orders",{ 'x-access-token': localStorage.getItem('token')}
     , body, "POST");
      
      console.log(res);
    if(res.status === 'success'){
      alert('Order is successfully placed.');
      localStorage.removeItem("cart")
      localStorage.removeItem("loveCount")
      localStorage.removeItem("addToCartArray")
      localStorage.removeItem("user_id")
      window.location.href = 'index.html';
    }else{
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
  subTotalElement.innerHTML = parseFloat(subTotal.toFixed(2)) ;
  taxElement.innerHTML = parseFloat(tax.toFixed(2));
  total.innerHTML = parseFloat((tax + subTotal).toFixed(2));
};


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
