import { Component, OnInit } from '@angular/core';
import { Product } from '../customer-registration/model/product.model';
import { ProductService } from '../service/product.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Order } from '../customer-registration/model/order.model';
import { OrderService } from '../service/order.service';
import { log } from 'console';
import { CartItems } from '../customer-registration/model/cartIems.model';

@Component({
  selector: 'app-product-report',
  templateUrl: './product-report.component.html',
  styleUrl: './product-report.component.css'
})
export class ProductReportComponent implements OnInit {

  products: Product[] = [];
  orders: Order[] = [];
  code:string;
  qty:number;
  cartItems:CartItems[]=[];
  os: { productId: string; productCode: string; orderedQty: number }[] = [];


  constructor(private productService: ProductService, private router: Router, private sanitizer: DomSanitizer, private orderService: OrderService) { }
  ngOnInit(): void {
    this.getProducts();
  }


  private getProducts() {
    this.productService.get().subscribe(data => {
      this.products = data;
      this.loadImages();
      //console.log("this is products "+this.products)
      //this.getAllOrders();
    });
    
    
  }

  private loadImages() {
    for (const product of this.products) {
      this.productService.getImage(product.code).subscribe(image => {
        product.BIdata = image;
        product.photo = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(product.BIdata));
      });
    }
  }

  // getOrders() {
  //   const se: { [productId: string]: { product: string; qtyOrder: number } } = {};

  //   this.orders.forEach(order => {
  //     order.cartItems.forEach(item => {
  //       const productId = item.productId;

  //       if (!se[productId]) {
  //         se[productId].qtyOrder = 0;
  //       }
  //       se[productId].qtyOrder += item.qty;
  //     });
  //   });

  //   this.products.forEach(data => {
  //     const productId = data.code;
  //     if(!se[productId]){
  //       se[productId].product = "";
  //     }
  //     se[productId].product = data.code;
  //   });

  //  this.os = Object.keys(se).map(productId=>({
  //   productId,
  //   productCode:se[productId].product,
  //   orderedQty:se[productId].qtyOrder
  //  }))
  // }

  getAllOrders(){
    this.orderService.getOrders().subscribe(data=>{
      this.orders = data;
   // console.log("this is orders "+this.orders)
    //this.getOrders();
    })
    
  }

  getOrders() {
    const se: { [productId: string]: { product: string; qtyOrder: number } } = {};
  
    this.products.forEach(data => {
      const productId = data.code;
      
      se[productId].product = data.code;
      console.log(se[productId].product);
      
    });

    this.orders.forEach(order => {
      order.cartItems.forEach(item => {
        const productId = item.productId;
  
        if (!se[productId]) {
          se[productId].qtyOrder = 0;
        }
        se[productId].qtyOrder += item.qty;
      });
    });
  
    
  
    this.os = Object.keys(se).map(productId => ({
      productId,
      productCode: se[productId].product,
      orderedQty: se[productId].qtyOrder,
    }));
  }

}
