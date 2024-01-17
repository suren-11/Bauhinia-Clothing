export class SummaryItem {
    date: string;
    totalQuantity: number;
    totalCost: number;
    totalPayment:number;
    totalProfit: number;
  
    constructor(date: string, totalQuantity: number, totalCost: number,totalPayment:number, totalProfit: number) {
      this.date = date;
      this.totalQuantity = totalQuantity;
      this.totalCost = totalCost;
      this.totalPayment = totalPayment;
      this.totalProfit = totalProfit;
    }
  }