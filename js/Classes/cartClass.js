export class Cart{
    #productName;
    #discountedPrice;
    #quantity;
    #totalPrice;
    #image;

    constructor(productName, discountedPrice, quantity, totalPrice, image){
        this.#productName = productName;
        this.#discountedPrice = discountedPrice;
        this.#quantity = quantity;
        this.#totalPrice = totalPrice;
        this.#image = image;
    }

    get productName(){
        return this.#productName;
    }

    set productName(productName){
        this.#productName = productName;
    }

    get discountedPrice(){
        return this.#discountedPrice;
    }

    set discountedPrice(discountedPrice){
        this.#discountedPrice = discountedPrice;
    }

    get quantity(){
        return this.#quantity;
    }

    set quantity(quantity){
        this.#quantity = quantity;
    }

    get totalPrice(){
        return this.#totalPrice;
    }

    set totalPrice(totalPrice){
        this.#totalPrice = this.#discountedPrice * this.#quantity;
    }

    get image(){
        return this.#image;
    }

    set image(image){
        this.#image = image;
    }

    // increment & decrement

}