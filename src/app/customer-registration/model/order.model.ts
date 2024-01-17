import { CartItems } from "./cartIems.model";

export interface Order{
    id:string;
    total:number;
    customerId:string;
    cartItems:CartItems[];
    date:string;
    deliveryAddress:string;
}