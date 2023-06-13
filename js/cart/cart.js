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



/* This code block is an immediately invoked function expression (IIFE) that is responsible for
displaying the user's cart on the webpage. It retrieves the cart data from local storage, creates a
new Cart object, fetches the data for each product in the cart, and then displays the cart table on
the webpage. It also adds event listeners to the delete, decrement, and increment buttons on each
cart line, which update the cart data in local storage and the cart table on the webpage. Finally,
it updates the cart data in local storage with any changes made and updates the cart counter on the
webpage. */

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
          localStorage.cart=JSON.stringify(cart.cartLines);
          upadateCounter();
        } else {
          const tableRow = element.parentNode.parentNode.parentNode.parentNode;
          tableRow.remove();
          cart.deleteCartLine(elementID);

        }
        const subTotalElement = document.getElementById("sub-total");
        subTotalElement.innerHTML = "$" + cart.getSubTotal();
      });
    }
    for (const element of Array.from(incBtns)) {
      element.addEventListener("click", () => {
        const elementID = element.id.slice(-1);
        console.log("elementID",elementID);
        const cartline = cart.cartLines[elementID];
        cartline.increment();
        const quantityDiv = element.parentNode.parentNode;
        const inputElement = quantityDiv.querySelector("input");
        inputElement.value = cartline.quantity;
        localStorage.cart=JSON.stringify(cart.cartLines);
        upadateCounter();
        const subTotalElement = document.getElementById("sub-total");
        subTotalElement.innerHTML = "$" + cart.getSubTotal();
      });
    }
    localStorage.setItem('cart',JSON.stringify(cart.cartLines));
    
  });
})();

/* This code is selecting the HTML element with the ID "checkout-button" and adding an event listener
to it. When the button is clicked, the code checks if there is a "token" key in the localStorage
object. If there is no "token" key, the user is redirected to the "login.html" page. If there is a
"token" key, the user is redirected to the "checkout.html" page. This code is essentially handling
the logic for the checkout button on the webpage. */
const checkoutBtn = document.getElementById('checkout-button');
checkoutBtn.addEventListener('click',()=>{
  if(!localStorage.token) window.location.href = 'login.html';
  else window.location.href='checkout.html';
});


/**
 * The function updates the cart counter on a webpage based on the quantity of items in the user's cart
 * stored in local storage.
 */
function upadateCounter(){
  let cartArr= JSON.parse(localStorage.getItem("cart"));
  let updatedCounter=0;  
  for(let i=0;i<cartArr.length;i++){
    updatedCounter+=cartArr[i].quantity;
  }
  
  document.getElementById('cart-counter').innerHTML = updatedCounter;

}
