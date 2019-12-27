import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

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
