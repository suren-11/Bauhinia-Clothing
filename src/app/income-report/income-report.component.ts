import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../customer-registration/model/order.model';
import { CartItems } from '../customer-registration/model/cartIems.model';
import { ProductService } from '../service/product.service';
import { Product } from '../customer-registration/model/product.model';
import { SummaryItem } from './model.summaryItem';

@Component({
  selector: 'app-income-report',
  templateUrl: './income-report.component.html',
  styleUrl: './income-report.component.css'
})
export class IncomeReportComponent implements OnInit {

  orders: Order[] = [];
  orderSummary: { date: string; totalProduct: number }[] = [];
  modelOrder: Order[] = [];
  cartItems:CartItems[] = [];
  products:Product[] = [];
  show = true;
  summeryItems:SummaryItem[]=[];

  constructor(private orderService: OrderService, private productService:ProductService){}

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.getProducts();
    });
  }

  getProducts(){
    this.productService.get().subscribe(data=>{
      this.products = data;
      this.calculateSummary();
    })
  }


  calculateSummary(){
    const summary: SummaryItem[] = [];
    const orders = this.orders;
    const products = this.products;
  
    orders.forEach(order => {
      const date = order.date;
      let totalQuantity = 0;
      let totalCost = 0;
      let totalPayment = 0;
  
      order.cartItems.forEach(cartItem => {
        const product = products.find(p => p.code == cartItem.productId);
  
        if (product) {
          totalQuantity += cartItem.qty;
          totalCost += cartItem.qty * product.cost;
        }
      });
      totalPayment += order.total;
      const totalProfit = order.total - totalCost;
  
      // Check if a summary item for this date already exists
      const existingSummaryItem = summary.find(item => item.date === date);
  
      if (existingSummaryItem) {
        // Update existing summary item
        existingSummaryItem.totalQuantity += totalQuantity;
        existingSummaryItem.totalCost += totalCost;
        existingSummaryItem.totalPayment += totalPayment;
        existingSummaryItem.totalProfit += totalProfit;
      } else {
        // Create a new summary item
        summary.push(new SummaryItem(date, totalQuantity, totalCost,totalPayment, totalProfit));
      }
    });
    this.summeryItems = summary;
  }
}
