import { SafeUrl } from "@angular/platform-browser";

export class Product{
    code:string;
    name:string;
    type:string;
    qty:number;
    cost: number;
    unitPrice:number;
    image:File
    photo:SafeUrl;
    BIdata:Blob;

    constructor(code:string,name:string,type:string,
        qty:number,cost: number,unitPrice:number,
        image:File,photo:SafeUrl,blob:Blob){
           this.code = code;
           this.name = name;
           this.type = type;
           this.qty = qty;
           this.cost = cost;
           this.unitPrice = unitPrice;
           this.image = image;
           this.photo = photo;
           this.BIdata = blob
        }

}