import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  userId;
  edituserForm:FormGroup;
  constructor(private aRoute:ActivatedRoute,private uService:UserService,private router:Router) {
    this.userId=this.aRoute['params']['value']['id'];
   }

  ngOnInit() {
    this.createForm();
    console.log("id:",this.userId);
    

  }
  
  createForm(){
    this.edituserForm=new FormGroup({
      uName:new FormControl([],[]),
      pwd:new FormControl([],[])
    });
    this.uService.getuser(this.userId).subscribe(resp=>{
      console.log(resp);
      this.edituserForm.patchValue(resp['data']);
    })
   
  }
  handleSubmit(formData){
    this.uService.editUser(formData).subscribe(resp=>{
      console.log("resp:",resp);
      if(resp['status'] === 200){
        this.router.navigate(['/listUser']);
      }
    })
  }

}
