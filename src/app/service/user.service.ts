import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url=environment.url;
  constructor(private http:HttpClient) {}

  login = (reqData) =>{
    return this.http.post(this.url+"/login",reqData);
  }
  register = (reqData) =>{
    return this.http.post(this.url+"/register",reqData);
  }
}
