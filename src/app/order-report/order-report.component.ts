import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order.service';
import { Order } from '../customer-registration/model/order.model';
import { log } from 'console';
import { formatDate } from '@angular/common';
import { distinct, from } from 'rxjs';
@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrl: './order-report.component.css'
})
export class OrderReportComponent implements OnInit {

  orders: Order[] = [];
  orderSummary: { date: string; orderCount: number; totalBill: number }[] = [];
  modelOrder: Order[] = [];
  show = true;
  


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.getOrders()
    console.log(this.orders);
    
  }

  getOrders() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
      this.calculateOrderSummary();
    });
  }

  private calculateOrderSummary() {
    const orderSummaryMap: { [date: string]: { orderCount: number; totalBill: number } } = {};

    this.orders.forEach(order => {
      const date = order.date;

      if (!orderSummaryMap[date]) {
        orderSummaryMap[date] = { orderCount: 0, totalBill: 0 };
      }

      orderSummaryMap[date].orderCount++;
      orderSummaryMap[date].totalBill += order.total;
    });

    // Convert the object to an array for easier iteration in the template
    this.orderSummary = Object.keys(orderSummaryMap).map(date => ({
      date,
      orderCount: orderSummaryMap[date].orderCount,
      totalBill: orderSummaryMap[date].totalBill
    }));
  }

  orderfill(date: string) {
    this.orders.forEach(order => {
      const orderDate = order.date;
      if (orderDate == date) {
        this.modelOrder.push(order);
      }
    })
    document.getElementById("btnm")?.click();
    this.show = false;
  }
}


