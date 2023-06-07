'use strict';
import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
const APIs = {
    categories: 'http://localhost:8000/api/categories/',
    featProducts: 'http://localhost:8000/api/products/getFeatured',
    recProducts: 'http://localhost:8000/api/products/getRecent',
}; // APIs

(async function () {
    const jsonCategories = await fetchAPI(APIs.categories, {}, {}, 'GET');
    console.log(jsonCategories);
    for(let i = 0; i < jsonCategories.data.length; i++) {
        const category = new Category(
            jsonCategories.data[i].name,
            jsonCategories.data[i].image,
            jsonCategories.data[i].productCount,
            jsonCategories.data[i]._id,
        );
        Category.categories.push(category);
    }
    console.log(Category.categories);
    localStorage.setItem('categories', JSON.stringify(Category.categories));
})(); // Get json data (categories) from APIs

(async function () {
    const featProducts = await fetchAPI(APIs.featProducts, {}, {}, 'GET');
    localStorage.setItem('featuredProducts', JSON.stringify(featProducts.data.slice(0,8)));
    console.log(featProducts.data.slice(0,8));
})(); // Get json data (featured products) from APIs


(async function () {
    const recProducts = await fetchAPI(APIs.recProducts, {}, {}, 'GET');
    localStorage.setItem('recentProducts', JSON.stringify(recProducts.data.slice(0,8)));
    console.log(recProducts.data.slice(0,8));
})(); // Get json data (recent products) from APIs