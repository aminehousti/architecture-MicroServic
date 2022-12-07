import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../service/product.service";
import {Product} from "../model/Product";
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productId!:string
  product!:Product
  editProductFormGroup!:FormGroup


  constructor(private routeA:ActivatedRoute,private prodServ:ProductService,
              private fb:FormBuilder,private route:Router) {
    this.productId=this.routeA.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.prodServ.getProduct(this.productId).subscribe(
      {
        next:(data)=>{this.product=data;},
        error:(err)=>{console.log(err);}
      }
    )
    this.editProductFormGroup=this.fb.group(
      {
        name:this.fb.control(this.product.name,[Validators.required ,Validators.minLength(4)]),
        price:this.fb.control(this.product.price,[Validators.required,Validators.min(200)]),
        promotion:this.fb.control(this.product.promotion)
      })

  }

  handleUpdateProduct() {
    let p=this.editProductFormGroup.value;
    p.id=this.product.id;
    this.prodServ.updateProduct(p).subscribe(
      {
        next:(data)=>{
          alert("product Update");
          this.route.navigateByUrl("/admin/products")},
        error:(err)=>{console.log(err)}
      }
    )

  }
  getErrorMessage(fieldName: string, error: ValidationErrors) {
    if(error['required']){
      return fieldName + " is REQUIRED";
    } else if(error['minlength']){
      return fieldName +" should have at least "+error['minlength']['requiredLength']+" characters";
    }else if(error['min']){
      return fieldName +" should have at leas min valuet "+error['min']['min'];}
    else return " ";
  }
}
