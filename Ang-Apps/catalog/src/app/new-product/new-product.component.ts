import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {ProductService} from "../service/product.service";

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})
export class NewProductComponent implements OnInit {
  productFormGroup!:FormGroup

  constructor(private fb:FormBuilder,private prodServ:ProductService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group(
      {
        name:this.fb.control(null,[Validators.required ,Validators.minLength(4)]),
        price:this.fb.control(null,[Validators.required,Validators.min(200)]),
        promotion:this.fb.control(false)
      }
    )
  }

  handleAddProduct() {
    let prod=this.productFormGroup.value;
    this.prodServ.addNewProduct(prod).subscribe(
      {
        next:(data)=>{
          alert("Product is Added ");
          this.productFormGroup.reset();
        },
        error:(err)=>{console.log(err);}
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
