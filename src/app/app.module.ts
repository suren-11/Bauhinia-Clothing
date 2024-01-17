import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerRegistrationComponent } from './customer-registration/customer-registration.component';
import {FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, provideHttpClient, withFetch} from "@angular/common/http";
import { CustomerListComponent } from './customer-list/customer-list.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StaffLoginComponent } from './Staff/staff-login/staff-login.component';
import { StaffDashBoardComponent } from './Staff/staff-dash-board/staff-dash-board.component';
import { StaffRegistrationComponent } from './Staff/staff-registration/staff-registration.component';
import { ProductRegistrationComponent } from './product/product-registration/product-registration.component';
import { NavComponent } from './Home/nav/nav.component';
import { HeaderComponent } from './Home/header/header.component';
import { FooterComponent } from './Home/footer/footer.component';
import { OrderComponent } from './order/order.component';
import { ProductReportComponent } from './product-report/product-report.component';
import { OrderReportComponent } from './order-report/order-report.component';
import { IncomeReportComponent } from './income-report/income-report.component';
import { MyAccountComponent } from './child/my-account/my-account.component';
import { CartItemsComponent } from './child/cart-items/cart-items.component';
import { CustomerOrdersComponent } from './child/customer-orders/customer-orders.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomerRegistrationComponent,
    CustomerListComponent,
    LoginComponent,
    DashboardComponent,
    StaffLoginComponent,
    StaffDashBoardComponent,
    StaffRegistrationComponent,
    ProductRegistrationComponent,
    NavComponent,
    HeaderComponent,
    FooterComponent,
    OrderComponent,
    ProductReportComponent,
    OrderReportComponent,
    IncomeReportComponent,
    MyAccountComponent,
    CartItemsComponent,
    CustomerOrdersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
    FormsModule,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
