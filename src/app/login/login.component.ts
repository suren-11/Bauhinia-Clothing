import { Component } from '@angular/core';
import {CustomerService} from "../customer-registration/service/customer.service";
import {Router} from "@angular/router";
import {Customer} from "../customer-registration/model/customer.mode";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";
  customer:Customer;
  cus:string = "";
  errors: boolean = false;
  constructor(private customerService: CustomerService, private router:Router) {
  }

  onSubmit(){
  this.customerService.getCustomer(this.email).subscribe(data=>{
    this.customer = data;
    if(this.customer.password == this.password){
      localStorage.setItem("customer",JSON.stringify(data));
      this.router.navigateByUrl("/dashboard");
    }

    if(data.password != this.password){
      alert("Password is wrong")
    }
  },error => {
    alert("Email is wrong");
  })
  }
}
