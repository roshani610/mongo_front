import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  listUser = (params)=>{
    return this.http.post(this.url+"/listUser",params);
  }
  editUser = (reqData) =>{
    return this.http.post(this.url+'/editUser',reqData);
  }
  deleteUser = (userId) =>{
    const params= new HttpParams().set('params',userId);
    return this.http.delete(this.url+'/deleteUser',{params});
  }
  getuser=(userId)=>{
    const params= new HttpParams().set('params',userId);
    return this.http.get(this.url+'/getUser',{params});
  }

}
