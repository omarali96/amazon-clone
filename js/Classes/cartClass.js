// export class Cart{
//     #productName;
//     #discountedPrice;
//     #quantity;
//     #totalPrice;
//     #image;

//     constructor(productName, discountedPrice, quantity, totalPrice, image){
//         this.#productName = productName;
//         this.#discountedPrice = discountedPrice;
//         this.#quantity = quantity;
//         this.#totalPrice = totalPrice;
//         this.#image = image;
//     }

//     get productName(){
//         return this.#productName;
//     }

//     set productName(productName){
//         this.#productName = productName;
//     }

//     get discountedPrice(){
//         return this.#discountedPrice;
//     }

//     set discountedPrice(discountedPrice){
//         this.#discountedPrice = discountedPrice;
//     }

//     get quantity(){
//         return this.#quantity;
//     }

//     set quantity(quantity){
//         this.#quantity = quantity;
//     }

//     get totalPrice(){
//         return this.#totalPrice;
//     }

//     set totalPrice(totalPrice){
//         this.#totalPrice = this.#discountedPrice * this.#quantity;
//     }

//     get image(){
//         return this.#image;
//     }

//     set image(image){
//         this.#image = image;
//     }

//     // increment & decrement

// }
import { CartLine } from "../Classes/cartLineClass.js";
import { Product } from "../Classes/productClass.js";

export class Cart {
  cartLines;

  constructor(productsArr) {
    this.map = new Map();

    for (const productID of productsArr) {
      if (this.map.has(productID)) {
        let val = this.map.get(productID);
        val++;
        this.map.set(productID, val);
      } else {
        this.map.set(productID, 1);
      }
    }
  }

  async fetchData() {
    const tempArr = [];
    const quantities = [];

    for (const entry of this.map) {
      const response = await fetch(
        `http://localhost:8000/api/products/${entry[0]}`
      );
      const jsonData = await response.json();
      tempArr.push(jsonData.data);
      quantities.push(entry[1]);
    }

    this.processData(tempArr, quantities);
  }

  processData(productsArr, quantitiesArr) {
    const arr = [];

    for (let i = 0; i < productsArr.length; i++) {
      const product = new Product(productsArr[i]);
      const cartLine = new CartLine(product, quantitiesArr[i]);
      arr.push(cartLine);
    }
    this.cartLines = arr;
  }

  getCartLines() {
    return this.cartLines;
  }

  getSubTotal() {
    return this.cartLines.reduce((acc, cartLine) => {
      if (cartLine !== null) {
        return acc + cartLine.getTotalPrice();
      }
      return acc;
    }, 0);
  }
  displayTable() {
    const productsTableBody = document.getElementById("products");
    let i = 0;
    for (const cartLine of this.cartLines) {
      const cartLineHTML = cartLine.displayHTML(i);
      productsTableBody.innerHTML += cartLineHTML;
      i++;
    }
  }
  deleteCartLine(index) {
    this.cartLines[index] = null;
  }
}
