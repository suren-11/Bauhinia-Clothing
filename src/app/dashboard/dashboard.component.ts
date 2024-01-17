import { Component, OnInit } from '@angular/core';
import { Product } from '../customer-registration/model/product.model';
import { ProductService } from '../service/product.service';
import { stringify } from 'node:querystring';
import { NgFor } from '@angular/common';
import { map } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { error, log } from 'node:console';
import { Customer } from '../customer-registration/model/customer.mode';
import { CartItems } from '../customer-registration/model/cartIems.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
customer:Customer;
products:Product[]=[];
searchProducts:Product[]=[];
imageUrl="";
productImage:SafeUrl;
name:string;
isShowDiv = false;
cartItems:CartItems[]=[];
types:"";
searchText="";
qty:number = 1
itemsNos = 0;
isValid = true;


constructor(private productService:ProductService, private sanitizer:DomSanitizer, private router:Router){}

ngOnInit(){
  this.getProducts();
  this.getLocalStore();
}

private getProducts(){
  this.productService.get().subscribe(data=>{
    this.products = data;
    this.loadImages();
    console.log(data);
    })
  }
  
private loadImages(){
  for(const product of this.products){
    this.productService.getImage(product.code).subscribe(image=>{
      product.BIdata=image
      product.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(product.BIdata));
    });
  }
}

getLocalStore(){
  const storedData = localStorage.getItem('customer');
  if (storedData) {
     var parsedData = JSON.parse(storedData);
     this.customer=parsedData;
  } 
  }

  displayCart(){
    this.isShowDiv = !this.isShowDiv;
  }

  addtoCart(product:Product,qtys:number){
    const total = product.unitPrice*qtys;
    const newcartIems = new CartItems(product.code,qtys,total);
    this.cartItems.push(newcartIems);
    sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems));
  }

  checkCart(product:Product,qty:number){
    for(let c of this.cartItems){
      if(product.code === c.productId){
        c.qty = c.qty+qty;
      }
    }
  }

  qtyAdd(qty:number){
    this.qty = qty+1;
  }

  qtyRemove(qty:number){
    this.qty = qty-1;
  }

  cartRemove(item:CartItems){
     const x = this.cartItems.indexOf(item);
     this.cartItems.splice(x,1);
  }

  checkout(){
    sessionStorage.setItem("cartItems",JSON.stringify(this.cartItems));
    this.router.navigateByUrl("/order");
  }

  getTypes(types:string){
    this.productService.getType(types).subscribe(data=>{
      this.searchProducts = data;
      this.SearchProductImages();
      this.isValid = false;
      console.log(data);
    });
  }

  private SearchProductImages(){
    for(const product of this.searchProducts){
      this.productService.getImage(product.code).subscribe(image=>{
        product.BIdata=image
        product.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(product.BIdata));
      });
    }
  }

}
