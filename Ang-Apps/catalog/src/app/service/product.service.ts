import { Injectable } from '@angular/core';
import {Observable, of, throwError} from "rxjs";
import {PageProducts, Product} from "../model/Product";
import {UUID} from "angular2-uuid";
import {ValidationErrors} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products!: Array<Product>


  constructor() {
    this.products = [
      {id: UUID.UUID(), name: "computer", price: 20, promotion: false},
      {id: UUID.UUID(), name: "iphone", price: 20, promotion: false}
    ];
    for (let i=0;i<20;i++){
      this.products.push(
        {id: UUID.UUID(), name: "computer"+Math.random()*20, price: Math.random()*200000, promotion: Math.random()<0.5?false:true});
    }
    for (let i=0;i<20;i++){
      this.products.push(
        {id: UUID.UUID(), name: "laptop"+Math.random()*20, price: Math.random()*200000, promotion: Math.random()<0.5?false:true});
    }
  }

  public getAllProducts(): Observable<Array<Product>> {
    return of(this.products);
  }
  public getProduct(id:string):Observable<Product>{
    let prod=this.products.find(p=>p.id==id);
    if(prod==undefined) {return throwError(()=>new Error("Product Not Found"));}
    return of(prod);
  }
  public getPageProducts(page:number,size:number): Observable<PageProducts> {
    let index=page*size;
    let totalPages=~~(this.products.length/size);
    if(this.products.length%size!=0){totalPages++;}
    let pageProducts=this.products.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }

  public deleteProduct(id: string): Observable<boolean> {
    this.products = this.products.filter(p => p.id != id);
    return of(true)
  }

  public setPromotion(id: string):Observable<boolean> {
    let prod=this.products.find(p=>p.id==id);
    if(prod!=undefined){
      prod.promotion=!prod.promotion;
      return of(true);
    }else
      return throwError(()=>Error("Product Not Found"));
  }
  public searchProduct(keyword:string,page:number,size:number):Observable<PageProducts>{
    let res=this.products.filter(p=>p.name.includes(keyword));
    let index=page*size;
    let totalPages=~~(res.length/size);
    if(this.products.length%size!=0){totalPages++;}
    let pageProducts=res.slice(index,index+size);
    return of({page:page,size:size,totalPages:totalPages,products:pageProducts});
  }
  public addNewProduct(product:Product):Observable<Product>{
    product.id=UUID.UUID();
    this.products.push(product);
    return of(product);
  }
  public updateProduct(product:Product):Observable<Product>{
    this.products=this.products.map(p=>(p.id==product.id)?product:p);
    return of(product)
  }

}
