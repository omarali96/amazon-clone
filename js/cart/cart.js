import { Cart } from "../Classes/cartClass.js";

function updateArrayOnIncrease(ID){
  const addToCartArray = JSON.parse(localStorage.addToCartArray);
  addToCartArray.push(ID);
  localStorage.addToCartArray = JSON.stringify(addToCartArray);
}
function updateArrayOnDelete(ID){
  const addToCartArray = JSON.parse(localStorage.addToCartArray);
  for(const id of addToCartArray){
    if(id===ID){
      addToCartArray = addToCartArray.filter((product)=> product === ID);
      break;
    }
  }
  localStorage.addToCartArray = JSON.stringify(addToCartArray);
}

function updateArrayOnDecrease(ID){
  const addToCartArray = JSON.parse(localStorage.addToCartArray);
  for(let i=0;i<addToCartArray.length; i++){
    if(addToCartArray[i] === ID){
      addToCartArray.splice(i,1);
      break;
    }
  }
  localStorage.addToCartArray = JSON.stringify(addToCartArray);
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
        updateArrayOnDelete(cart.cartLines[elementID].product.id);
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
          updateArrayOnDecrease(cartline.product.id);
        } else {
          const tableRow = element.parentNode.parentNode.parentNode.parentNode;
          tableRow.remove();
          updateArrayOnDelete(cartline.product.id);
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
        updateArrayOnIncrease(cartline.product.id);
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
