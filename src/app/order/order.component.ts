import { Component, OnInit } from '@angular/core';
import { CartItems } from '../customer-registration/model/cartIems.model';
import { Customer } from '../customer-registration/model/customer.mode';
import { OrderService } from '../service/order.service';
import { Order } from '../customer-registration/model/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  carts = sessionStorage.getItem("cartItems");
  date:string;
  name:string;
  total:number = 0;

  /** creat a new order object */
  order:Order={
    id:"",
    customerId:"",
    cartItems:[],
    date:"",
    total:0,
    deliveryAddress:""
  };
  
  /**define cartitems list */
  cartItemsIterate:CartItems[] = this.order.cartItems;

  constructor(private orderService:OrderService){}

  ngOnInit(): void {
      this.addcarts();
      this.dates();
      this.getLocalStore();
      this.totalCalculate();
  }

  /**saving the order */
  click(){
    this.orderService.post(this.order).subscribe((data)=>{
      alert("order placed");      
    })
  }
  
  /**add to the cart items */
  addcarts(){
    if(this.carts!=null){
      const t = JSON.parse(this.carts);
      for(let c of t){
        this.order.cartItems.push(c);
      }
    }
  }

  /**get the login details from the local storage */
  getLocalStore(){
    const storedData = localStorage.getItem('customer');
    if (storedData) {
       var parsedData = JSON.parse(storedData);
       this.name=parsedData.firstName+" "+parsedData.lastName;
       this.order.customerId=parsedData.id;
    } 
    }

    /**automatically assing the date */
  dates(){
    this.date = new Date().toISOString().slice(0, 10);
    this.order.date = this.date;
  }

  /**calculate the total bill */
  totalCalculate(){
    for(let item of this.order.cartItems){
      this.total = this.total + item.total;
      this.order.total = this.total;
    }
  }

  /**remove cart items */
  cartRemove(item:CartItems){
    const x = this.order.cartItems.indexOf(item);
    this.order.cartItems.splice(x,1);
    this.total = this.total-item.total;
    this.order.total = this.total;
 }

}
