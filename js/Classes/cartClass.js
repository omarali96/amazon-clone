import { CartLine } from "../Classes/cartLineClass.js";
import { Product } from "../Classes/productClass.js";

export class Cart {
  cartLines;
  map = new Map();
  constructor(productsArr) {
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
        `http://localhost:5000/api/products/${entry[0]}`
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
    console.log(this);
    this.cartLines = arr;
  }

  get cartLines() {
    return this.cartLines;
  }

  getSubTotal() {
    return this.cartLines.reduce((acc, cartLine) => {
      if (cartLine !== null) {
        return parseFloat((acc + cartLine.getTotalPrice()).toFixed(2));
      }
      return parseFloat(acc.toFixed(2));
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
