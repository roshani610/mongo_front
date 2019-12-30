import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  productId;
  editProductForm:FormGroup;
  constructor(private aRoute:ActivatedRoute,private pService:ProductService,private router:Router) {
    this.productId=this.aRoute['params']['value']['id'];
   }

  ngOnInit() {
    this.createForm();
    console.log("id:",this.productId);
    

  }
  
  createForm(){
    this.editProductForm=new FormGroup({
      name:new FormControl([],[]),
      price:new FormControl([],[])
    });
    this.pService.getProduct(this.productId).subscribe(resp=>{
      console.log(resp);
      this.editProductForm.patchValue(resp['data']);
    })
   
  }
  handleSubmit(formData){
    this.pService.editProductData(formData).subscribe(resp=>{
      console.log("resp:",resp);
      if(resp['status'] === 200){
        this.router.navigate(['/home']);
      }
    })
  }

}
