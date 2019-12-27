import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductForm:FormGroup;
  constructor(private pService:ProductService,private router:Router) { }

  ngOnInit() {
    this.addProductForm=new FormGroup({
      name:new FormControl([],[Validators.required]),
      price:new FormControl([],[Validators.required])
    })
  }
  handleSubmit(formData){
    this.pService.addProduct(formData).subscribe(resp=>{
      console.log(resp);
      if(resp['status'] === 200){
        this.router.navigate(['/home']);
      }
    })
  }

}
