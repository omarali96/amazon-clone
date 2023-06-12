import { fetchAPI } from "../utils/fetch_api.js";
import { Category } from "../Classes/categoryClass.js";
import { Product } from "../Classes/productClass.js";
const APIs = {
  categories: "http://localhost:5000/api/categories/",
  featProducts: "http://localhost:5000/api/products/getFeatured",
  recProducts: "http://localhost:5000/api/products/getRecent",
  AllProducts: "http://localhost:5000/api/products",
}; // APIs

// logout function
let logout = function (){
  localStorage.removeItem("token")
   // go to home pages
   window. location. replace("index.html");
}

// check love and cart counter in localStorage 

window.onload = function(){
  if (!localStorage.hasOwnProperty("loveCount")) {
    localStorage.setItem("loveCount", JSON.stringify(0));
  }else{
    document.getElementById('love-counter').innerHTML = Number(localStorage.getItem("loveCount"));
  }

  if (!localStorage.hasOwnProperty("addToCartArray")) {
    localStorage.setItem("addToCartArray", JSON.stringify([]));
  }else{
      document.getElementById('cart-counter').innerHTML = JSON.parse(localStorage.getItem("addToCartArray")).length; 
  }

  if (!localStorage.hasOwnProperty("token")) {
    document.getElementById("access").innerHTML = `<a class="dropdown-item" href="login.html">Sign in</a><a class="dropdown-item" href="register.html">Sign up</a>`;
  }else{
    document.getElementById("access").innerHTML = `<p class="dropdown-item" id="logout">Logout</p>`;
    document.getElementById("logout").addEventListener('click',()=>logout())
  }
};



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
};



const fetchCategories = function() {
  return new Promise((resolve, reject) => {
    const jsonCategories = fetchAPI(APIs.categories, {}, {}, "GET");
    resolve(jsonCategories);
    reject(new Error("Data not found."));
  });
} // Get json data (categories) from APIs



fetchCategories()
  .then(handleCatData)
  .catch((err) => {
    console.error("Error: ", err);
  });







let producterContainer = [];
let filteredProduct = [];
// var for pagination
let showing = 4;
let showingStart = 1;

const featProducts = await fetchAPI(APIs.AllProducts, {}, {}, "GET");
for (const product of featProducts.data) {
  let objProduct = new Product(product);
  producterContainer.push(objProduct);
}
filteredProduct = producterContainer.map(e=>e);
let htmlProductContainer = document.getElementById("productContainer");

// for (const key in producterContainer) {
//   htmlProductContainer.innerHTML += producterContainer[key].displayProductCart(key,'All');
// }
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
  // htmlProductContainer.innerHTML = "";
  // for (const key in filteredProduct) {
  //   htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  // }
  htmlPagination(showing,showingStart)
  renderPaginateProduct(1,showing);
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
  htmlPagination(showing,showingStart)
  renderPaginateProduct(1,showing);
  // htmlProductContainer.innerHTML = "";
  // for (const key in filteredProduct) {
  //   htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  // }

});

document.getElementById("sortPopularity").addEventListener('click', function (e) {
  e.preventDefault();
  if(filteredProduct.length == 0){
    filteredProduct = producterContainer.map(e=>e);
  }
  filteredProduct.sort((a, b) => a.ratingCount < b.ratingCount ? 1 : b.ratingCount < a.ratingCount ? -1 : 0);
  htmlPagination(showing,showingStart)
  renderPaginateProduct(1,showing);
  // htmlProductContainer.innerHTML = "";
  // for (const key in filteredProduct) {
  //   htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  // }

});
document.getElementById("sortRating").addEventListener('click', function (e) {
  e.preventDefault();
  if(filteredProduct.length == 0){
    filteredProduct = producterContainer.map(e=>e);
  }
  filteredProduct.sort((a, b) => a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0);
  htmlPagination(showing,showingStart)
  renderPaginateProduct(1,showing);
  // htmlProductContainer.innerHTML = "";
  // for (const key in filteredProduct) {
  //   htmlProductContainer.innerHTML += filteredProduct[key].displayProductCart(key,'All');
  // }

});

// pagination and showing menu
  //  render paginated product

  let renderPaginateProduct = function(start,length){
    htmlProductContainer.innerHTML = "";
    let slicedProduct =  filteredProduct.slice(start,start+length);
    for (const key in slicedProduct) {
      htmlProductContainer.innerHTML += slicedProduct[key].displayProductCart(key,'All');
    }
    for (const key in slicedProduct) {
      const loveBtn = document.getElementById(`love-btn${key}All`);
      const addToCartBtn = document.getElementById(`cart-btn${key}All`);
      loveBtn.addEventListener(`click`, () => { slicedProduct[key].loveCountHandler(); });
      addToCartBtn.addEventListener('click',() => { slicedProduct[key].addToCartHandler(); }); 
    }
  }

// pagination creation li in html 
let htmlPagination = function(shownProduct, selectedIterate){
  let paginationContainer = document.getElementById("paginationContainer");
  paginationContainer.innerHTML = "";
  let toatalProduct = filteredProduct.length;
  let totalPages = Math.ceil(toatalProduct/shownProduct);
  // write in html 
  paginationContainer.innerHTML += `<li class="page-item" style ="${selectedIterate <= 1? 'display:none':''}" id ="paginatePrevious"><a class="page-link">Previous</a></li>`
   for(let i = 0; i<totalPages;i++){
    paginationContainer.innerHTML += `<li class="page-item ${(i+1) == selectedIterate? 'active':''}">
     <a class="page-link" id ="paginate${i+1}" >${i+1}</a></li>`
   }
   paginationContainer.innerHTML += `<li class="page-item" style="${selectedIterate >= totalPages? 'display:none':''}" id ="paginateNext" ><a class="page-link">Next</a></li>`
  // add addEventListener on each paginate element
   for(let i = 0; i<totalPages;i++){
    const paginateId = document.getElementById(`paginate${i+1}`);
    paginateId.addEventListener(`click`, ()=>{
      renderPaginateProduct(i*shownProduct,shownProduct)
      htmlPagination(shownProduct,i+1)
    });
   }
   const paginatePrevious = document.getElementById(`paginatePrevious`);
   const paginateNext = document.getElementById(`paginateNext`);
   paginatePrevious.addEventListener(`click`, ()=>{
    renderPaginateProduct((selectedIterate-2)*shownProduct,shownProduct)
    htmlPagination(shownProduct,selectedIterate-1)
  });
   paginateNext.addEventListener(`click`, ()=>{
    renderPaginateProduct((selectedIterate)*shownProduct,shownProduct)
    htmlPagination(shownProduct,selectedIterate+1)

  });

  }
htmlPagination(showing,showingStart);
renderPaginateProduct(1,showing);
// showing part 
for(let i = 1; i<=5; i++){
  let showingElement = document.getElementById(`show${i}`);

  showingElement.addEventListener('click',()=>{
    showing = Number(showingElement.innerHTML);
    htmlPagination(showing,showingStart)
    renderPaginateProduct(1,showing);
  })
}
