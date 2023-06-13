export class CartLine{
  productName;
  productImage;
  productDiscounted;
  id;
  quantity;
  constructor(product, quantity){
    this.productName = product.name;
    this.productImage = product.image;
    this.productDiscounted = product.discountedPrice;
    this.id = product.id
    this.quantity = quantity;
  }
  get id(){
    return this.id;
  }
  get quantity(){
      return this.quantity;
  }
  getTotalPrice(){
    return this.productDiscounted * this.quantity;
  }
  increment(){
    this.quantity++;
  }
  decrement(){
    this.quantity = Math.max(this.quantity-1,0);
  }
  displayHTML(i){
    return `
    <tr>
        <td class="align-middle">
          <img src="../../${this.productImage}" alt="" style="width: 50px" />
          ${this.productName}
        </td>
        <td class="align-middle">$${this.productDiscounted}</td>
        <td class="align-middle">
          <div
            class="input-group quantity mx-auto"
            style="width: 100px"
          >
            <div class="input-group-btn">
              <button
                type="button"
                id="decrement${i}"
                class="decBtn btn btn-sm btn-primary btn-minus"
              >
                <i class="fa fa-minus"></i>
              </button>
            </div>
            <input
              type="text"
              class="quantityVal form-control form-control-sm bg-secondary border-0 text-center"
              id="quantity${i}"
              value="${this.quantity}"  
            />
            <div class="input-group-btn">
              <button
                type="button"
                id="increment${i}"
                class="incBtn btn btn-sm btn-primary btn-plus"
              >
                <i class="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </td>
        <td class="align-middle">$${this.getTotalPrice()}</td>
        <td class="align-middle">
          <button class="btn btn-sm btn-danger" type="button" id="remove${i}" >
            <i class="fa fa-times"></i>
          </button>
        </td>
      </tr>
    ` 
  }
  
}