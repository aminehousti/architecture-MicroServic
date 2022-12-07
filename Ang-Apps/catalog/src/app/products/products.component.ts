import { Component, OnInit } from '@angular/core';
import {ProductService} from "../service/product.service";
import {Product} from "../model/Product";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../service/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  product! :Array<Product>;
  errorMessage! :String;
  searchFormGroup!:FormGroup;
  currentPage:number=0;
  size:number=5;
  totalPages:number=0;
  currentAction:string="all";

  constructor(private productService:ProductService,private fb:FormBuilder,
              public authServ:AuthenticationService,private route:Router) { }

  ngOnInit(): void {
    this.searchFormGroup=this.fb.group({
      keyword:this.fb.control(null)
      }
    );
    this.handleGetPageProduct();
  }
  handleGetProduct(){
    this.productService.getAllProducts().subscribe(
      {
        next:(data)=>{this.product=data;},
        error:(err)=>{this.errorMessage=err}
      }
    );
  }
  handleGetPageProduct(){
    this.productService.getPageProducts(this.currentPage,this.size).subscribe(
      {
        next:(data)=>{
          this.product=data.products;
          this.totalPages=data.totalPages;
        },
        error:(err)=>{this.errorMessage=err}
      }
    );
  }

  handleDeleteProduct(p: Product) {
    let conf=confirm("are u sur to delete?")
    if(conf==false ) return;
    this.productService.deleteProduct(p.id).subscribe(
      {
        next:(data)=>{
          //this.handleGetProduct();
          let index =this.product.indexOf(p);
        this.product.splice(index,1);}
      }
    )
  }
  handlePromotion(p:Product){
    let promo=p.promotion;
    this.productService.setPromotion(p.id).subscribe(
      {
        next:(data)=>{p.promotion=!promo;},
        error:(err)=>{this.errorMessage=err;}
      }
    )
  }


  handleSearchProduct() {
    this.currentAction="search";
    this.currentPage=0;
    let keyword=this.searchFormGroup.value.keyword;
    this.productService.searchProduct(keyword,this.currentPage,this.size).subscribe(
      {
        next:(data)=>{
          this.product=data.products;
        this.totalPages=data.totalPages;}
      }
    )
  }

  goToPage(i:number) {
    this.currentPage=i;
    if(this.currentAction=="all")
      this.handleGetPageProduct();
    else
      this.handleSearchProduct();
  }

  handleNewProduct() {
    this.route.navigateByUrl("/admin/newproduct");
  }

  handleEditProduct(p: Product) {
    this.route.navigateByUrl("/admin/editproduct/"+p.id);
  }
}
