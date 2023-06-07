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


//     <!-- product Cart element -->
// <!-- <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
//   <div class="product-item bg-light mb-4">
//     <div class="product-img position-relative overflow-hidden">
//       <img class="img-fluid w-100" src="img/product-1.jpg" alt="" />
//       <div class="product-action">
//         <a
//           class="btn btn-outline-dark btn-square"
//           href="#"
//           onclick="addSingleProductToCart({id:1,name:'product-1',price:123,image:'/img/product-1.jpg'})"
//           ><i class="fa fa-shopping-cart"></i
//         ></a>
//         <a class="btn btn-outline-dark btn-square" href="#"
//           ><i class="far fa-heart"></i
//         ></a>
//         <a class="btn btn-outline-dark btn-square" href="#"
//           ><i class="fa fa-sync-alt"></i
//         ></a>
//         <a class="btn btn-outline-dark btn-square" href="#"
//           ><i class="fa fa-search"></i
//         ></a>
//       </div>
//     </div>
//     <div class="text-center py-4">
//       <a class="h6 text-decoration-none text-truncate" href=""
//         >Product Name Goes Here</a
//       >
//       <div
//         class="d-flex align-items-center justify-content-center mt-2"
//       >
//         <h5>$123.00</h5>
//         <h6 class="text-muted ml-2"><del>$123.00</del></h6>
//       </div>
//       <div
//         class="d-flex align-items-center justify-content-center mb-1"
//       >
//         <small class="fa fa-star text-primary mr-1"></small>
//         <small class="fa fa-star text-primary mr-1"></small>
//         <small class="fa fa-star text-primary mr-1"></small>
//         <small class="fa fa-star text-primary mr-1"></small>
//         <small class="fa fa-star text-primary mr-1"></small>
//         <small>(99)</small>
//       </div>
//     </div>
//   </div>
// </div> -->

}