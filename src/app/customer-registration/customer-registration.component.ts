import { Component } from '@angular/core';
import {Customer} from "./model/customer.mode";
import {CustomerService} from "./service/customer.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-registration',
  templateUrl: './customer-registration.component.html',
  styleUrl: './customer-registration.component.css'
})
export class CustomerRegistrationComponent {
  customer:Customer = {
    id:"",
    firstName:"",
    lastName:"",
    address:"",
    phone1:"",
    phone2:"",
    email:"",
    password:""
  };

  constructor(private customerService:CustomerService, private router:Router) {}

  registerCustomer(){
    this.customerService.addCustomer(this.customer).subscribe(()=>{
      alert("Account Created Successfully");
      this.router.navigateByUrl("/");
    });
  }
}
