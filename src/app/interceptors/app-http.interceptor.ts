import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

    constructor(private service:AuthService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("*****************")
    
    if(!request.url.includes("/auth/login")){
        let newRequest=request.clone({
        headers:request.headers.set('Authorization','Bearer '+this.service.accessToken)
    

    })
    // Add your interception logic here
    console.log("accesTokenService:",this.service.accessToken)
    console.log("*****************")
    return next.handle(newRequest);
    }else{
        return next.handle(request);
    }
   
    
  }
}
