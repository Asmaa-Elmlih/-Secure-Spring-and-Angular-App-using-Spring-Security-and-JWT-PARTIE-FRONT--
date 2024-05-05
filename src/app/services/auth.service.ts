import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthenticated:boolean=false;
  roles:any;
  username:any;
  accessToken:any;

  private baseUrl = "http://localhost:8080/"

  constructor(private http:HttpClient,private router:Router) { }

  login(username:string,password:string){
    let options={
      headers:new HttpHeaders().set("Content-Type","application/x-www-form-urlencoded")
    }
    let params=new HttpParams().set("username",username).set("password",password);
    return this.http.post(`${this.baseUrl}auth/login`,params,options)
  }

  loadProfile(data:any){
    this.isAuthenticated=true;
    this.accessToken=data['acces-token'];
    let decodedJwt:any=jwtDecode(this.accessToken );
    console.log(decodedJwt);
    this.username=decodedJwt.sub;
    this.roles=decodedJwt.scope;
    window.localStorage.setItem("jwt-token",this.accessToken);
  }
  
  handleLogOut(){
    this.accessToken=undefined;
    this.isAuthenticated=false;
    this.roles=undefined;
  }

  loadJwtFromLocalStorage(){
    let token=window.localStorage.getItem("jwt-token");
    if(token){
      this.loadProfile({"acces-token":token});
      this.router.navigateByUrl("/admin/list-customers");
    }
  }
  
}
