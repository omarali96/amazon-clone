export class Category {
  #name;
  #image;
  #productCount;
  #categoryId;
  static #categories = [];
  constructor(name, image, productCount, categoryId) {
    this.#name = name;
    this.#image = image;
    this.#productCount = productCount;
    this.#categoryId = categoryId;
  }
  get name() {
    return this.#name;
  }
  get image() {
    return this.#image;
  }

  get productCount() {
    return this.#productCount;
  }

  get categoryId() {
    return this.#categoryId;
  }

  set name(name) {
    this.#name = name;
  }
  set image(image) {
    this.#image = image;
  }

  set productCount(productCount) {
    this.#productCount = productCount;
  }

  set categoryId(categoryId) {
    this.#categoryId = categoryId;
  }
  static getCategories() {
    return this.#categories;
  }
  static addCategory(catObj) {
    this.#categories.push(catObj);
  }
  static getFourSortedCat() {
    if (this.#categories.length === 0) {
      throw new Error("Categories is empty");
    }
    let resultArr = this.#categories.sort((a,b) => {
      return -a.productCount + b.productCount;
    });
    return resultArr.length < 4 ? resultArr.slice(0) : resultArr.slice(0, 4);
  }

  // static fourSortedCat = this.getFourSortedCat();

  static displayCategoryElements(sortedCat) {
    const categoriesSection = document.getElementById("categories-section");
    for (let i = 0; i < sortedCat.length; i++) {
      categoriesSection.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="">
          <div class="cat-item img-zoom d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${sortedCat[i].image}" alt="" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${sortedCat[i].name}</h6>
              <small class="text-body">${sortedCat[i].productCount}</small>
            </div>
          </div>
        </a>
      </div>`;
    }
  }

  static displayDropDownMenu() {
    if (!Array.isArray(this.#categories) || this.#categories.length === 0) {
      throw new Error("Categories is empty/not array");
    }
    const dropDownDiv = document.createElement("div");
    const navBarElement = document.getElementById("navbar-vertical");
    dropDownDiv.classList.add("navbar-nav");
    dropDownDiv.classList.add("w-100");
    // navBarElement.appendChild(dropDownDiv);
    for (let i = 0; i < this.#categories.length; i++) {
      const categoryAdded = `<a href="" class="nav-item nav-link">${this.#categories[i].name}</a>`;
      dropDownDiv.innerHTML += categoryAdded;
    }
    navBarElement.appendChild(dropDownDiv);
  }
}
