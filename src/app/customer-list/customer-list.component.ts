import {Component, OnInit} from '@angular/core';
import {Customer} from "../customer-registration/model/customer.mode";
import {CustomerService} from "../customer-registration/service/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit{

  customers: Customer[]=[];

  constructor(private customerService: CustomerService, private router: Router) {
  }
  ngOnInit(): void {
    this.getCustomers();
  }

  private getCustomers(){
    this.customerService.getCustomerList().subscribe(data=>{
      this.customers = data;
    });
  }

}
