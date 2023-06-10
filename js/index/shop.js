"use strict";
import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
import { Product } from "../Classes/productClass.js";
const APIs = {
  categories: "http://localhost:5000/api/categories/",
  featProducts: "http://localhost:5000/api/products/getFeatured",
  recProducts: "http://localhost:5000/api/products/getRecent",
  AllProducts: "http://localhost:5000/api/products",
}; // APIs
let producterContainer = [];
let filteredProduct = [];
const featProducts = await fetchAPI(APIs.AllProducts, {}, {}, "GET");
for (const product of featProducts.data) {
  let objProduct = new Product(product);
  producterContainer.push(objProduct);
}
let htmlProductContainer = document.getElementById("productContainer");

for (const key in producterContainer) {
  htmlProductContainer.innerHTML += producterContainer[key].displayProductCart(key,'All');
}
// filter fun 
let filterPrice = function (element, prices) {
  if (prices.includes("all")) return true;
  for (const item of prices) {
    if ((Number(element.discountedPrice) >= Number(item)) && (Number(element.discountedPrice) <= (Number(item) + 100))) return true
  }
  return false;
}

let filterColer = function (element, colors) {
  if (colors.includes("all")) return true;
  for (const item of colors) {
    if (element.color.toLocaleLowerCase() == item.toLocaleLowerCase()) return true
  }
  return false;
}
let filterSize = function (element, sizes) {
  if (sizes.includes("all")) return true;
  for (const item of sizes) {
    if (element.size.toLocaleLowerCase() == item.toLocaleLowerCase()) return true
  }
  return false;
}



// get checked value from check pox elements
let getCheckboxValue = function (elementsName, elementLength) {
  document.getElementsByName(elementsName)[0]
  let pricesValueArray = [];
  for (let i = 0; i < elementLength; i++) {
    if (document.getElementsByName(elementsName)[i].checked == true) {
      let v = document.getElementsByName(elementsName)[i].value;
      pricesValueArray.push(v);
    }
  }
  if (pricesValueArray.length == 0) {
    pricesValueArray.push('all');
  }
  return pricesValueArray;
}

let renderProductWithFilter = function () {
  // get checked prices 
  let priceArray = getCheckboxValue('price', 6);
  let colorArray = getCheckboxValue('color', 6);
  let sizeArray = getCheckboxValue('size', 6);
  filteredProduct = producterContainer.filter(element => {
    return filterPrice(element, priceArray) && filterColer(element, colorArray) && filterSize(element, sizeArray)
  });
  htmlProductContainer.innerHTML = "";
  for (const key in filteredProduct) {
    htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  }
}
// filter action on element 
document.getElementById("priceForm").addEventListener('click', function (e) {
  e.preventDefault();
  renderProductWithFilter();
});
document.getElementById("colorForm").addEventListener('click', function (e) {
  e.preventDefault();
  renderProductWithFilter();
});
document.getElementById("sizeForm").addEventListener('click', function (e) {
  e.preventDefault();
  renderProductWithFilter();
});

// sort action on element 
document.getElementById("sortPrice").addEventListener('click', function (e) {
  e.preventDefault();
  if(filteredProduct.length == 0){
    filteredProduct = producterContainer.map(e=>e);
  }
  filteredProduct.sort((a, b) => a.price > b.price ? 1 : b.price > a.price ? -1 : 0);
  htmlProductContainer.innerHTML = "";
  for (const key in filteredProduct) {
    htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  }

});

document.getElementById("sortPopularity").addEventListener('click', function (e) {
  e.preventDefault();
  if(filteredProduct.length == 0){
    filteredProduct = producterContainer.map(e=>e);
  }
  filteredProduct.sort((a, b) => a.ratingCount < b.ratingCount ? 1 : b.ratingCount < a.ratingCount ? -1 : 0);
  htmlProductContainer.innerHTML = "";
  for (const key in filteredProduct) {
    htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  }

});
document.getElementById("sortRating").addEventListener('click', function (e) {
  e.preventDefault();
  if(filteredProduct.length == 0){
    filteredProduct = producterContainer.map(e=>e);
  }
  filteredProduct.sort((a, b) => a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0);
  htmlProductContainer.innerHTML = "";
  for (const key in filteredProduct) {
    htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  }

});

// pagination and showing menu 
console.log(producterContainer);