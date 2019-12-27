import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  sigUpForm:FormGroup;
  constructor(private uService:UserService,private router:Router) { }

  ngOnInit() {
    this.createForm()
  }
  createForm(){
    this.sigUpForm=new FormGroup({
      uName:new FormControl([],[Validators.required]),
      pwd:new FormControl([],[Validators.required])
    }) 
  }
  handleSubmit(formData){
    this.uService.register(formData).subscribe(resp=>{
      if(resp['status'] === 200){
        this.router.navigate(['/login']);
      }
    })
  }

}
