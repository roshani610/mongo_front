import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url=environment.prodUrl;
  constructor(private http:HttpClient) {}

  
  listProduct = (params) =>{
    return this.http.post(this.url+"/listProducts",params);
  }
  addProduct = (reqData) =>{
    return this.http.post(this.url+"/addProduct",reqData);
  }
  searchProduct= (searchValue)=>{
    const params = new HttpParams().set('params', searchValue);
    return this.http.get(this.url+"/searchProduct/",{params});
  }
  getProduct = (productId) =>{
    const params = new HttpParams().set('params', productId);
    return this.http.get(this.url+"/getProduct/",{params});
  }
  editProductData = (data) =>{
    return this.http.post(this.url+"/updateProduct",data);
  }
  deleteProduct = (productId) =>{
    const params= new HttpParams().set('params',productId);
    return this.http.delete(this.url+"/deleteProduct",{params});
  }
}
