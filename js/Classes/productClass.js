export class Product{
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
        this.#categoryId = object.category_id;
        this.#discount = object.discount;
        this.#rating = object.rating;
        this.#ratingCount = object.rating_count;
        this.#isFeatured = object.is_featured;
        this.#isRecent = object.is_recent;
        this.#color = object.color;
        this.#size = object.size;
        //
       // this.#discountedPrice = object.discountedPrice;
       this.#discountedPrice = this.#price - (this.#discount * this.#price);
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

    loveCount(){
        let loveCount =parseInt(localStorage.loveCount);
        loveCount++;
        localStorage.loveCount = JSON.stringify(loveCount);
        // let loveBtn = document.getElementById(`love-btn${index}`);
        // loveBtn.setAtribute("","disabled");

        // loveBtn.addEventListener("click",()=>{
        //     loveBtn.disabled = false;
        //     loveCount--;
        //     localStorage.loveCount = JSON.stringify(loveCount);
        // })
    }


    displayRating(){
        let ratingCount=parseFloat(this.#rating);
        let displayStars = "";
        if(ratingCount === 0){
            displayStars =
            `<small class="far fa-star text-primary mr-1"></small>
            <small class="far fa-star text-primary mr-1"></small>
            <small class="far fa-star text-primary mr-1"></small>
            <small class="far fa-star text-primary mr-1"></small>
            <small class="far fa-star text-primary mr-1"></small>`
        }else{
            for(let i=0;i<Math.trunc(ratingCount);i++){
                displayStars += `<small class="fa fa-star text-primary mr-1"></small>`
            }
            if(ratingCount%1!==0){{
                displayStars += `<small class="fa fa-star-half text-primary mr-1"></small>`
            }
            for(let i=0;i<5-Math.ceil(ratingCount);i++){
                displayStars += `<small class="far fa-star text-primary mr-1"></small>`
            }
        }
    }
    return displayStars;

}

    displayProductCart(index){
       
     //  <!-- product Cart element -->
     return` <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
     <div class="product-item bg-light mb-4">
       <div class="product-img position-relative overflow-hidden">
         <img class="img-fluid w-100" src="${this.#image}" alt="" />
         <div class="product-action">
           <a
             class="btn btn-outline-dark btn-square"
             href="#"
             onclick="${this.addToCart()}"
             ><i class="fa fa-shopping-cart"></i
           ></a>
           <a class="btn btn-outline-dark btn-square" href="" id="love-btn${index}"
             onclick="${this.loveCount()}"><i class="far fa-heart"></i
           ></a>
           <a class="btn btn-outline-dark btn-square" href="#"
             ><i class="fa fa-sync-alt"></i
           ></a>
           <a class="btn btn-outline-dark btn-square" href="#"
             ><i class="fa fa-search"></i
           ></a>
         </div>
       </div>
       <div class="text-center py-4">
         <a class="h6 text-decoration-none text-truncate" href=""
           >${this.#name}</a
         >
         <div
           class="d-flex align-items-center justify-content-center mt-2"
         >
           <h5>${this.#discountedPrice}</h5>
           <h6 class="text-muted ml-2"><del>${this.#price}</del></h6>
         </div>
         <div
           class="d-flex align-items-center justify-content-center mb-1"
         >
         ${this.displayRating()}
           <small>(${this.#ratingCount})</small>
         </div>
       </div>
     </div>
   </div> `

    }
   

   
    

    addToCart(){
        
    }

}