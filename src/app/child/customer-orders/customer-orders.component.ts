import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { Customer } from '../../customer-registration/model/customer.mode';
import { Order } from '../../customer-registration/model/order.model';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrl: './customer-orders.component.css'
})
export class CustomerOrdersComponent implements OnInit {

  customer:Customer;
  orders:Order[] = [];
  constructor(private orderService:OrderService){}

  ngOnInit(): void {
      this.asignCustomer();
      this.getOrders();
  }

  asignCustomer(){
    const customerData = localStorage.getItem("customer");
    if(customerData){
      this.customer = JSON.parse(customerData);
    }
  }

  getOrders(){
    this.orderService.getOrdersByCustomer(this.customer.id).subscribe(data=>{
      this.orders = data;
    })
  }
}
