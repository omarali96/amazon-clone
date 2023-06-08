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

console.log(producterContainer[0].displayProductCart());
let parent = document.getElementById("parent");
//console.log(producterContainer);
// for (pro of producterContainer) {
//   console.log(pro.displayProductCart());
// }




  // 'use strict';
// import { fetchAPI } from "../utils/fetch_api.js";
// import { Product } from "../Classes/productClass.js";
// //import { Category } from "../Classes/categoryClass.js";
// const APIs = {
// // categories: 'http://localhost:8000/api/categories/',
//     featAllProducts: 'http://localhost:5000/api/products/',
//     //featProducts: 'http://localhost:8000/api/products/getFeatured',
//    // recProducts: 'http://localhost:8000/api/products/getRecent',
// }; // APIs

// // (async function () {
// //     const jsonCategories = await fetchAPI(APIs.categories, {}, {}, 'GET');
// //     console.log(jsonCategories);
// //     for(let i = 0; i < jsonCategories.data.length; i++) {
// //         const category = new Category(
// //             jsonCategories.data[i].name,
// //             jsonCategories.data[i].image,
// //             jsonCategories.data[i].productCount,
// //             jsonCategories.data[i]._id,
// //         );
// //         Category.categories.push(category);
// //     }
// //     console.log(Category.categories);
// //    // localStorage.setItem('categories', JSON.stringify(Category.categories));
// // })(); // Get json data (categories) from APIs

// (async function () {
//     const featProducts = await fetchAPI(APIs.featAllProducts, {}, {}, 'GET');
//   //  localStorage.setItem('featuredProducts', JSON.stringify(featProducts.data.slice(0,8)));
//     console.log(featProducts.data);
// })(); // Get json data (featured products) from APIs


// // (async function () {
// //     const recProducts = await fetchAPI(APIs.recProducts, {}, {}, 'GET');
// //     localStorage.setItem('recentProducts', JSON.stringify(recProducts.data.slice(0,8)));
// //     console.log(recProducts.data.slice(0,8));
// // })(); // Get json data (recent products) from APIs
