import { Injectable } from '@angular/core';
import {Customer} from "../model/customer.mode";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  /**connection of the backend spring boot */
  private url = 'http://localhost:8080/api/customer';

  constructor(private http: HttpClient) {}

  /**save method */
  addCustomer(customer: Customer):Observable<void>{
   return this.http.post<void>(`${this.url}/save`,customer);
  }

  /**get method */
  getCustomerList():Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.url}/getList`)
  }

  /**get method */
  getCustomer(email:string):Observable<Customer>{
    return this.http.get<Customer>(`${this.url}/login/${email}`)
  }

  /**update method */
  updateCustomer(id:string, customer:Customer){
    return this.http.put(`${this.url}/update/${id}`,customer);
  }

  /**delete method */
  deleteCustomer(id:string){
    return this.http.delete(`${this.url}/delete/${id}`);
  }

}
