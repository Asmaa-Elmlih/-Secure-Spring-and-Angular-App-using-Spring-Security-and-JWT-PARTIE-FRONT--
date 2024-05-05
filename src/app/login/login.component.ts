import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin:FormGroup;
  constructor(private formBuilder:FormBuilder,private service:AuthService,private router:Router) { }

  

  ngOnInit() {
    this.formLogin=this.formBuilder.group({
      username:this.formBuilder.control(""),
      password:this.formBuilder.control("")
    })

  }
  
  handleLogin(){
    console.log("handleLogin")
    let username=this.formLogin.value.username;
    let pwd=this.formLogin.value.password;
    this.service.login(username,pwd).subscribe({
      next:data=>{
        console.log(data);
        this.service.loadProfile(data);
        this.router.navigateByUrl("/admin");
      },
      error:err=>{
        console.log(err);
      }
    })
  }

}
