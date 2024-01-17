import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomerListComponent} from "./customer-list/customer-list.component";
import {CustomerRegistrationComponent} from "./customer-registration/customer-registration.component";
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import { StaffLoginComponent } from './Staff/staff-login/staff-login.component';
import { StaffDashBoardComponent } from './Staff/staff-dash-board/staff-dash-board.component';
import { StaffRegistrationComponent } from './Staff/staff-registration/staff-registration.component';
import { ProductRegistrationComponent } from './product/product-registration/product-registration.component';
import { OrderComponent } from './order/order.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { MyAccountComponent } from './child/my-account/my-account.component';
import { CustomerOrdersComponent } from './child/customer-orders/customer-orders.component';

const routes: Routes = [
  {path:'list',component:CustomerListComponent},
  {path:'customer',component:CustomerRegistrationComponent},
  {path:'',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent,children:[{
    path:'myAccount', component:MyAccountComponent
  }]},
  {path:'staffLogin',component:StaffLoginComponent},
  {path:'staffDashboard',component:StaffDashBoardComponent},
  {path:'staffRegister',component:StaffRegistrationComponent},
  {path:'productRegister', component:ProductRegistrationComponent},
  {path:'order',component:OrderComponent},
  {path:'orderReport',component:OrderReportComponent},
  {path:'incomeReport',component:IncomeReportComponent},
  {path:'productReport',component:ProductReportComponent},
  {path:'customerOrders',component:CustomerOrdersComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation:'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
