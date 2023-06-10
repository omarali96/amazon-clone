import { Cart } from "../Classes/cartClass.js";
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
        if (cartline.quantity !== 1) {
          const quantityDiv = element.parentNode.parentNode;
          const inputElement = quantityDiv.querySelector("input");
          inputElement.value = cartline.quantity;
        } else {
          const tableRow = element.parentNode.parentNode.parentNode.parentNode;
          tableRow.remove();
          cart.deleteCartLine(elementID);
          const subTotalElement = document.getElementById("sub-total");
        subTotalElement.innerHTML = "$" + cart.getSubTotal();
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
      });
    }
  });
})();

const checkoutBtn = document.getElementById('checkout-button');
checkoutBtn.addEventListener('click',()=>window.location.href='checkout.html');
