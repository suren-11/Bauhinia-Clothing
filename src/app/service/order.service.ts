import { Injectable } from '@angular/core';
import { Order } from '../customer-registration/model/order.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CartItems } from '../customer-registration/model/cartIems.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8080/api';

  constructor(private http:HttpClient) { }

  post(order:Order):Observable<Order>{
    return this.http.post<Order>(`${this.url}/order`,order);
  }

  getOrders():Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url}/getOrders`)
  }

  getCartItems():Observable<CartItems[]>{
    return this.http.get<CartItems[]>(`${this.url}/getOrders/cartItems`)
  }

  getOrdersByCustomer(id:string):Observable<Order[]>{
    return this.http.get<Order[]>(`${this.url}/getOrder/customer/${id}`);
  }
}
