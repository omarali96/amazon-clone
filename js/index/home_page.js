"use strict";
import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
import { Product } from "../Classes/productClass.js";
const APIs = {
  categories: "http://localhost:8000/api/categories/",
  featProducts: "http://localhost:8000/api/products/getFeatured",
  recProducts: "http://localhost:8000/api/products/getRecent",
}; // APIs

const display = (products, parentID) =>{
  const firstEight = products.data.slice(0, 8);
  const productsArr = firstEight.map((product) => new Product(product));
  const parentDiv = document.getElementById(parentID);
  for(let i=0;i<productsArr.length;i++){
    const productCard = productsArr[i].displayProductCart(i);
    parentDiv.innerHTML += productCard; 
  }
}

const fetchCategories = function() {
  return new Promise((resolve, reject) => {
    const jsonCategories = fetchAPI(APIs.categories, {}, {}, "GET");
    resolve(jsonCategories);
    reject(new Error("Data not found."));
  });
} // Get json data (categories) from APIs

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
  const sortedCat = Category.getFourSortedCat();
  console.log(sortedCat)
  Category.displayCategoryElements(sortedCat);
};

fetchCategories()
  .then(handleCatData)
  .catch((err) => {
    console.error("Error: ", err);
  });

(async function () {
  const featProducts = await fetchAPI(APIs.featProducts, {}, {}, "GET");
  display(featProducts, "featured-products");
})(); // Get json data (featured products) from APIs

(async function () {
  const recProducts = await fetchAPI(APIs.recProducts, {}, {}, "GET");
  display(recProducts, "recent-products")
})(); // Get json data (recent products) from APIs

(function(){
   let loveCount = localStorage.setItem ('loveCount',JSON.stringify(0));
   console.log("loveCount",loveCount);
    
})();

