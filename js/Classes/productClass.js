class Product{
    #name;
    #image;
    #price;
    #categoryId;
    #discount;
    #discountedPrice;
    #rating;
    #ratingCount;
    #isFeatured;
    #isRecent;
    #color;
    #size;

    constructor(object){
        this.#name = object.name;
        this.#image = object.image;
        this.#price = object.price;
        this.#categoryId = object.categoryId;
        this.#discount = object.discount;
        this.#rating = object.rating;
        this.#ratingCount = object.ratingCount;
        this.#isFeatured = object.isFeatured;
        this.#isRecent = object.isRecent;
        this.#color = object.color;
        this.#size = object.size;
        this.#discountedPrice = object.discountedPrice;
    }

    get name(){
        return this.#name;
    }
    set name(name){
        this.#name = name;
    }
    get image(){
        return this.#image;
    }

    set image(image){
        this.#image = image;
    
    }

    get price(){
        return this.#price;
    }

    set price(price){
        this.#price = price;
    }

    get categoryId(){
        return this.#categoryId;
    }

    set categoryId(categoryId){
        this.#categoryId = categoryId;
    }

    get discount(){
        return this.#discount;
    }

    set discount(discount){
        this.#discount = discount;
    }

    get rating(){
        return this.#rating;
    }

    set rating(rating){
        this.#rating = rating;
    }

    get ratingCount(){
        return this.#ratingCount;
    }

    set ratingCount(ratingCount){
        this.#ratingCount = ratingCount;
    }

    get isFeatured(){
        return this.#isFeatured;
    }

    set isFeatured(isFeatured){
        this.#isFeatured = isFeatured;
    }

    get isRecent(){
        return this.#isRecent;
    }

    set isRecent(isRecent){
        this.#isRecent = isRecent;
    }

    get color(){
        return this.#color;
    }

    set color(color){
        this.#color = color;
    }

    get size(){
        return this.#size;
    }

    set size(size){
        this.#size = size;
    }

    get discountedPrice(){
        return this.#discountedPrice;
    }

    set discountedPrice(discountedPrice){
        this.#discountedPrice = this.price - (this.discount * this.price);
    }


}