import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Staff } from '../customer-registration/model/staff.model';
import { Product } from '../customer-registration/model/product.model';
import { constants } from 'buffer';
import { __param } from 'tslib';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  saveProduct(product:Product):Observable<any>{
    const formData = new FormData();
    formData.append("code",product.code);
    formData.append("name",product.name);
    formData.append("type",product.type);
    formData.append("qty",product.qty.toString());
    formData.append("cost",product.cost.toString());
    formData.append("unitPrice",product.unitPrice.toString());
    formData.append("image",product.image);
    return this.http.post<void>(`${this.url}/productSave`,formData);
  }


  get():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productList`)
  }

  getImage(productId:string):Observable<Blob>{
    return this.http.get(`${this.url}/images/${productId}`,{responseType:"blob"});
  }

  getType(types:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}/productType/${types}`);
  }

  updateProduct(code:string,product:Product){
    const formData = new FormData();
    formData.append("code",product.code);
    formData.append("name",product.name);
    formData.append("type",product.type);
    formData.append("qty",product.qty.toString());
    formData.append("cost",product.cost.toString());
    formData.append("unitPrice",product.unitPrice.toString());
    formData.append("image",product.image);

    return this.http.put(`${this.url}/productUpdate/${code}`,formData)
  }

  deleteProduct(code:string){
    return this.http.delete(`${this.url}/delete/${code}`)
  }
}
