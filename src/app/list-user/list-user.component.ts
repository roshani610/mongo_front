import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  // searchDataForm:FormGroup;
  dtOptions: DataTables.Settings = {};
  users:[];
  constructor(private uService:UserService) { 
   /*  this.searchDataForm=new FormGroup({
      searchValue:new FormControl([],[Validators.required])
    }); */
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      columns: [
      {data: '_id'},
      {data: 'uName'},
      {data: 'pwd'},
      {title: 'Action',searchable:false,orderable:false}]
    };
    this.dtOptions.ajax = (dataTablesParameters: any, callback) => {
      console.log(dataTablesParameters);
      this.uService
        .listUser(dataTablesParameters)
        .subscribe(resp => {
         // console.log(resp);
         console.log(resp);
         if(resp['status'] === 200){
           this.users=resp['data'];
         }
          if(resp['status'] === 200){
            this.users = resp['data'];
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
    this.uService.searchuser(formData.searchValue).subscribe(resp=>{
      console.log("resp",resp);
      this.users=resp['data'];
    })
  } */
  deleteuser(id){
    this.uService.deleteUser(id).subscribe(resp=>{
      console.log('resp:',resp);
      if(resp['status'] === 200 && resp['data'].deletedCount >0){
        $("#userListing").DataTable().ajax.reload();
      }
    })
  }
  ngOnInit(): void { }
  
 
}
