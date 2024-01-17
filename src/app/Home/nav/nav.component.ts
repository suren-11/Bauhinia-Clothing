import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  role:string="";
  productRegister = "";
inventoryOfficer:boolean = false;
productionManager: any;
chiefAccountant: any;

  constructor(private router:Router){}

  ngOnInit(): void {
      this.assignLogger();
  }
  
  assignLogger(){
    const logger = localStorage.getItem("logger");
    if(logger){
      var logerDetails = JSON.parse(logger);
      this.role = logerDetails.role;
    }
  }

  InventoryManagercontrol(){
    if(this.role==="Inventery Officer"){
     this.router.navigateByUrl("/productRegister");
    }else{
      alert("you cant access this function Only INVENTORY OFFICER CAN ACCESS");
    }
  }

  StaffRegcontrol(){
    if(this.role==="Production Manager"|| this.role==="Admin"){
     this.router.navigateByUrl("/staffRegister");
    }else{
      alert("only PRODUCTION MANAGAGER or ADMIN can ACCESS the STAFF REGISTER");
    }
  }

  ProductReportcontrol(){
    if(this.role==="Production Manager"){
     this.router.navigateByUrl("/productReport");
    }else{
      alert("Only PRODUCTION MANAGAGER CAN ACCESS THE PRODUCT REPORT");
    }
  }

  OrderReportcontrol(){
    if(this.role==="Production Manager"){
     this.router.navigateByUrl("/orderReport");
    }else{
      alert("Only PRODUCTION MANAGAGER CAN ACCESS THE ORDER REPORT");
    }
  }

  IncomeReportcontrol(){
    if(this.role==="Cheif Accountant"){
     this.router.navigateByUrl("/incomeReport");
    }else{
      alert("Only CHIEF ACCOUNTANT CAN ACCESS THE INCOME REPORT");
    }
  }
}
