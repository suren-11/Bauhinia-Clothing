import { Component, OnInit } from '@angular/core';
import { Customer } from '../../customer-registration/model/customer.mode';
import { CustomerService } from '../../customer-registration/service/customer.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrl: './my-account.component.css'
})
export class MyAccountComponent implements OnInit{

  constructor(private customerService:CustomerService, private router:Router){}

  
  customer:Customer;
  id="";
  firstName="";
  lastName="";
  address="";
  phoneNo1="";
  phoneNo2="";
  email="";
  password="";

  ngOnInit(): void {
      this.asignLoger();
  }

  /** assing the local storage save customer to the customer referance */
  asignLoger(){
    const logger = localStorage.getItem("customer");
    if(logger!=null){
      var loginCustomer = JSON.parse(logger);
      this.customer = loginCustomer;
    }
  }

  /** update the customer details */
  updateCustomer(){
    this.customerService.updateCustomer(this.customer.id,this.customer).subscribe(()=>{
      alert("Customer Updated");
    });
  }


  /** delete method */
    confirms = () =>{
      const response = confirm("are u sure?");
      if(response){
        this.customerService.deleteCustomer(this.customer.id).subscribe(()=>{
          alert("successfully deleted");
          this.router.navigateByUrl("/");
        });
      }else{
        alert("no");
      }
    }

}
