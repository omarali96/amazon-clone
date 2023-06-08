"use strict";
import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
const APIs = {
  categories: "http://localhost:8000/api/categories/",
  featProducts: "http://localhost:8000/api/products/getFeatured",
  recProducts: "http://localhost:8000/api/products/getRecent",
}; // APIs

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
  localStorage.setItem(
    "featuredProducts",
    JSON.stringify(featProducts.data.slice(0, 8))
  );
})(); // Get json data (featured products) from APIs

(async function () {
  const recProducts = await fetchAPI(APIs.recProducts, {}, {}, "GET");
  localStorage.setItem(
    "recentProducts",
    JSON.stringify(recProducts.data.slice(0, 8))
  );
})(); // Get json data (recent products) from APIs

(function(){
    localStorage.setItem ('loveCount', 0);
})();

