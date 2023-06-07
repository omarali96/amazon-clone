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

    get productCount(){
        return this.#productCount;
    }

    get categoryId(){
        return this.#categoryId;
    }

    set name(name){
        this.#name = name;
    }
    set image(image){
        this.#image = image;
    }

    set productCount(productCount){
        this.#productCount = productCount;
    }

    set categoryId(categoryId){
        this.#categoryId = categoryId;
    }

    static getFourSortedCat(){
        if(this.#categories.length===0){
            throw new Error('Categories is empty');
        }
        let resultArr =  this.#categories.sort(()=>{
            return a.productCount - b.productCount; 
        });
        return resultArr.length < 4 ? resultArr.slice(0) : resultArr.slice(0,4);
    }
  


}