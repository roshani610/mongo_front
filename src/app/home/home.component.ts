import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 // searchDataForm:FormGroup;
  dtOptions: DataTables.Settings = {};
  products:[];
  constructor(private pService:ProductService) { 
   /*  this.searchDataForm=new FormGroup({
      searchValue:new FormControl([],[Validators.required])
    }); */
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      columns: [
      { data: '_id'},
      {data: 'name'},
      {data: 'price'},
      {title: 'Action',searchable:false,orderable:false}]
    };
    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      console.log(dataTablesParameters);
      this.pService
        .listProduct(dataTablesParameters)
        .subscribe(resp => {
         // console.log(resp);
         console.log(resp);
         if(resp['status'] === 200){
           this.products=resp['data'];
         }
          if(resp['status'] === 200){
            this.products = resp['data'];
          //  console.log(this.banners);
            callback({
              recordsTotal: resp['length'],
              data: []
            });
          }

        });
       
    };
   
  }

 
 /*  handleSubmit(formData){
    console.log(formData);
    this.pService.searchProduct(formData.searchValue).subscribe(resp=>{
      console.log("resp",resp);
      this.products=resp['data'];
    })
  } */
  deleteProduct(id){
    this.pService.deleteProduct(id).subscribe(resp=>{
      console.log('resp:',resp);
      if(resp['status'] === 200 && resp['data'].deletedCount >0){
        $("#productListing").DataTable().ajax.reload();
      }
    })
  }
  ngOnInit(): void { }
  
 

}
