import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
    constructor(private authService:AuthenticationService){}
    
    intercept(req:HttpRequest<any>, next:HttpHandler){
        const token = this.authService.getToken();
        const authRequest = req.clone({headers:req.headers.set("Authorization","Bearer " + token)});
        return next.handle(req);
    }
}