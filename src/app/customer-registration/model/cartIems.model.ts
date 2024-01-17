import { Product } from "./product.model";

export class CartItems{
    productId:string;
    qty:number;
    total:number

    constructor(productId:string,qty:number,total:number){
        this.productId = productId;
        this.qty = qty;
        this.total = total;
    }
}