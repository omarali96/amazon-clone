
export class Category{
    #name;
    #image;
    #productCount; 
    #categoryId;
    static #categories=[];
    constructor(name, image, productCount, categoryId){
        this.#name = name;
        this.#image = image;
        this.#productCount = productCount;
        this.#categoryId = categoryId;
    }
    get name(){
        return this.#name;
    }
    get image(){
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

  static getFourSortedCat() {
    if (this.#categories.length === 0) {
      throw new Error("Categories is empty");
    }
    let resultArr = this.#categories.sort(() => {
      return a.productCount - b.productCount;
    });
    return resultArr.length < 4 ? resultArr.slice(0) : resultArr.slice(0, 4);
  }
 
  
 
  displayCategoryElements() {
    const categoriesSection = document.getElementById("categories-section");
    for (let i = 0; i < this.fourSortedCat.length; i++) {
      categoriesSection.innerHTML += `<div class="col-lg-3 col-md-4 col-sm-6 pb-1">
        <a class="text-decoration-none" href="">
          <div class="cat-item img-zoom d-flex align-items-center mb-4">
            <div class="overflow-hidden" style="width: 100px; height: 100px">
              <img class="img-fluid" src="${this.image}" alt="" />
            </div>
            <div class="flex-fill pl-3">
              <h6>${this.name}</h6>
              <small class="text-body">$categoryCount</small>
            </div>
          </div>
        </a>
      </div>`;
    }
  }



  
}