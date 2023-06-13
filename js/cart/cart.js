import { Cart } from "../Classes/cartClass.js";
import { fetchAPI } from "../utils/fetch_api.js";
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



/* This code is making a GET request to the API endpoint "http://localhost:5000/api/categories/" to
fetch data about product categories. Once the data is retrieved, it calls the function
"handleCatData" to process the data and create Category objects. If there is an error in fetching
the data, it logs the error to the console. */
fetchCategories()
  .then(handleCatData)
  .catch((err) => {
    console.error("Error: ", err);
  });


  function updateArrayOnIncrease(ID){
    let addToCartArray = JSON.parse(localStorage.addToCartArray);
    addToCartArray.push(ID);
    localStorage.addToCartArray = JSON.stringify(addToCartArray);
    document.getElementById('cart-counter').innerHTML = JSON.parse(localStorage.getItem("addToCartArray")).length;
  }
  function updateArrayOnDelete(ID){
    let addToCartArray = JSON.parse(localStorage.addToCartArray);
    for(const id of addToCartArray){
      if(id===ID){
        addToCartArray = addToCartArray.filter((product)=> product !== ID);
        break;
      }
    }
    localStorage.addToCartArray = JSON.stringify(addToCartArray);
    document.getElementById('cart-counter').innerHTML = JSON.parse(localStorage.getItem("addToCartArray")).length;

  }
  
  function updateArrayOnDecrease(ID){
    let addToCartArray = JSON.parse(localStorage.addToCartArray);
    for(let i=0;i<addToCartArray.length; i++){
      if(addToCartArray[i] === ID){
        addToCartArray.splice(i,1);
        break;
      }
     
    }
    localStorage.addToCartArray = JSON.stringify(addToCartArray);
    document.getElementById('cart-counter').innerHTML = JSON.parse(localStorage.getItem("addToCartArray")).length;
  }
  
  (function () {
    const productArray = JSON.parse(localStorage.getItem("addToCartArray"));
    const cart = new Cart(productArray);
    cart.fetchData().then(() => {
      cart.displayTable();
      const subTotalElement = document.getElementById("sub-total");
      subTotalElement.innerHTML = "$" + cart.getSubTotal();
      const deleteBtns = document.querySelectorAll('[id^="remove"]');
      const decBtns = document.querySelectorAll('[id^="decrement"]');
      const incBtns = document.querySelectorAll('[id^="increment"]');
      for (const element of Array.from(deleteBtns)) {
        element.addEventListener("click", () => {
          const elementID = element.id.slice(-1);
          const tableRow = element.parentNode.parentNode;
          tableRow.remove();
          updateArrayOnDelete(cart.cartLines[elementID].id);
          cart.deleteCartLine(elementID);
          const subTotalElement = document.getElementById("sub-total");
          subTotalElement.innerHTML = "$" + cart.getSubTotal();
        });
      }
      for (const element of Array.from(decBtns)) {
        element.addEventListener("click", () => {
          const elementID = element.id.slice(-1);
          const cartline = cart.cartLines[elementID];
          cartline.decrement();
          if (cartline.quantity !== 0) {
            const quantityDiv = element.parentNode.parentNode;
            const inputElement = quantityDiv.querySelector("input");
            inputElement.value = cartline.quantity;
            updateArrayOnDecrease(cartline.id);
          } else {
            const tableRow = element.parentNode.parentNode.parentNode.parentNode;
            tableRow.remove();
            updateArrayOnDelete(cartline.id);
            cart.deleteCartLine(elementID);
            
          }
          const subTotalElement = document.getElementById("sub-total");
          subTotalElement.innerHTML = "$" + cart.getSubTotal();
        });
      }
      for (const element of Array.from(incBtns)) {
        element.addEventListener("click", () => {
          const elementID = element.id.slice(-1);
          const cartline = cart.cartLines[elementID];
          cartline.increment();
          const quantityDiv = element.parentNode.parentNode;
          const inputElement = quantityDiv.querySelector("input");
          inputElement.value = cartline.quantity;
          const subTotalElement = document.getElementById("sub-total");
          subTotalElement.innerHTML = "$" + cart.getSubTotal();
          updateArrayOnIncrease(cartline.id);
        });
      }
      localStorage.setItem('cart',JSON.stringify(cart.cartLines));
      console.log(JSON.parse(localStorage.getItem('cart'))[0].quantity);
    });
  })();
  
  const checkoutBtn = document.getElementById('checkout-button');
  checkoutBtn.addEventListener('click',()=>{
    if(!localStorage.token) window.location.href = 'login.html';
    else window.location.href='checkout.html';
  });
  