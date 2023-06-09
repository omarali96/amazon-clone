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
  const featProducts = await fetchAPI(APIs.AllProducts, {}, {}, "GET");
for (const product of featProducts.data) {
    let objProduct = new Product(product); 
    producterContainer.push(objProduct);
}
let htmlProductContainer = document.getElementById("productContainer");

for (const key in producterContainer) {
  htmlProductContainer.innerHTML += producterContainer[key].displayProductCart(key);  
}
// filter fun 
let filterPrice = function(element, prices){

  for (const item of prices) {
    if( (Number(element.discountedPrice) >= Number(item)) && (Number(element.discountedPrice) <= (Number(item)+100)) ) return true
  }
  return false;
}

let filterColer = function(element, colors){
  for (const item of colors) {
    if(element.color.toLocaleLowerCase() == item.toLocaleLowerCase() ) return true 
  }
  return false;
}
let filterSize = function(element, sizes){
  for (const item of sizes) {
    if(element.size.toLocaleLowerCase() == item.toLocaleLowerCase() ) return true  
  }
  return false;
}

// get checked value from check pox elements
let getCheckboxValue= function (elementsName, elementLength) {
  document.getElementsByName(elementsName)[0]
  let pricesValueArray= [];
  for(let i= 0; i< elementLength; i++){
    if (document.getElementsByName(elementsName)[i].checked == true){
      let v = document.getElementsByName(elementsName)[i].value;
      pricesValueArray.push(v);
    }
  }
  if(pricesValueArray.length == 0){
      pricesValueArray.push('all');
  }
  return pricesValueArray;
}




console.log(producterContainer);
// get product container in html and add all product














let filteredProduct = producterContainer.filter(element=>{
 return filterPrice(element, [0,100,200,800,900]) && filterColer(element, ["white","green"]) && filterSize(element,["m","xs","s"])
});

console.log(filteredProduct);










//let priceValues  = document.getElementsByName("price")[0].value


    
//console.log(getCheckboxValue("size",6));

//   if (lang1.checked == true){
//     let lg1= document.getElementById("s1").value;
//     result= lg1 + " ";
//   }
//   else if (lang2.checked == true){
//     let lg2= document.getElementById("s2").value;
//     result= result + lg2 + " ";
//   }
//   else if (lang3.checked == true){
//   document.write(result);
//     let lg3= document.getElementById("s3").value;
//     result= result + lg3 ;
//   }
//    else {
//   return document.getElementById("result").innerHTML= "Select any one";
//   }
//   return document.getElementById("result").innerHTML= "You have selected " + result + " language";
// }









// const filterProducts = (
//   f1 = true,
//   f2 = true,
//   f3 = true,
//   f4 = true,
//   f5 = true,
//   products,
//   filterCriteria
// ) => {
//   if (!Array.isArray(products) || products.length === 0)
//     throw new Error("Error: products is invalid");
//   let filteredProducts = new Array();
//   switch (filterCriteria) {
//     case "price":
//       filteredProducts = products.filter(
//         (product) =>
//           (f1 && product.price <= 100) ||
//           (f2 && product.price > 100 && product.price <= 200) ||
//           (f3 && product.price > 200 && product.price <= 300) ||
//           (f4 && product.price > 300 && product.price <= 400) ||
//           (f5 && product.price > 400 && product.price <= 500)
//       );
//       break;
//     case "color":
//       filteredProducts = products.filter(
//         (product) =>
//           (f1 && product.color === "black") ||
//           (f2 && product.color === "white") ||
//           (f3 && product.color === "blue") ||
//           (f4 && product.color === "red") ||
//           (f5 && product.color === "green")
//       );
//       break;
//     case "size":
//       filteredProducts = products.filter(
//         (product) =>
//           (f1 && product.size === "XS") ||
//           (f2 && product.size === "S") ||
//           (f3 && product.size === "M") ||
//           (f4 && product.size === "L") ||
//           (f5 && product.size === "XL")
//       );
//     default:
//       break;
//   }
//   return filteredProducts;
// };

// const sortProducts = (products, sortCriteria) => {
//   let sortedProducts = new Array();
//   switch (sortCriteria) {
//     case "price":
//       sortedProducts = products.sort((a, b) => {
//         return a.price - b.price;
//       });
//       break;
//     case "popularity":
//       sortedProducts = products.sort((a, b) => {
//         return b.popularity - a.popularity; // TODO: sort by popularity
//       });
//       break;
//     case "rating":
//       sortedProducts = products.sort((a, b) => {
//         return b.rating - a.rating;
//       });
//     default:
//       break;  
//   }
//   return sortedProducts;
// };
// const showingProducts = (products, numberOfProducts) => {
//   return products.slice(0, numberOfProducts);
// };
// const calculatePages = (products, numberOfProducts) => {
//   return Math.ceil(products.length / numberOfProducts);
// };



