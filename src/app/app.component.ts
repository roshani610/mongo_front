import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { UserService } from './service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  loginForm:FormGroup;
  constructor(private uService:UserService,private router:Router){}
  ngOnInit(): void {
   this.createLoginForm();
  }
  createLoginForm(){
    this.loginForm=new FormGroup({
      uName:new FormControl([],[Validators.required]),
      pwd: new FormControl([],[Validators.required])
     })
  }
  handleSubmit(formData){
    this.uService.login(formData).subscribe(resp=>{
      console.log("resp::",resp);
      if(resp['status'] === 200){
        this.router.navigate(['/home']);
      }
    })
   /*  this.uService.login(formData).subscribe(resp=>{
      console.log("Login success",resp);
    }) */
  }
  
}
