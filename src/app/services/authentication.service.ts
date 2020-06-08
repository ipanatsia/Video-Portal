import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../classes/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private token:String;
  private isAuth = false;
  private authStatusListener= new Subject<Boolean>();
  tokenTimer:any;
  
  constructor(private http: HttpClient, private router: Router) { }

  getAuthStatus() {
    return this.authStatusListener.asObservable();
  }

  getIsAuth () {
    return this.isAuth;
  }

  getToken(){
    return this.token;
  }

  login (username:string, password:string) :void {
    const userData: User = {username:username, password:password}
    this.http.post<{token,expiresIn}>('http://localhost:3000/api/users/login',userData)
     .subscribe((response)=>{
       const token = response.token;
       const expiresInDuration = response.expiresIn;
       this.token = token;
      if (token){
        this.authStatusListener.next(true);
        this.setAuthTimer(expiresInDuration);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(token,expirationDate);
        this.isAuth = true;
        this.router.navigate(["/"]);
      } 
      console.log(response)
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() -  now.getTime();
    if (expiresIn>0){
      this.token = authInformation.token;
      this.isAuth = true;
      this.setAuthTimer(expiresIn/1000);
      this.authStatusListener.next(true);
    }
  }

  signup (username:string, password:string) : void{
    const userData: User = {username:username, password:password}
    this.http.post<any>("http://localhost:3000/api/users/signup",userData)
    .subscribe(response=>  {console.log(response)});
  }

  logout(){
    this.token=null;
    this.isAuth = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }
  
  setAuthTimer(expiresInDuration) {
    this.tokenTimer = setTimeout(()=>{ this.logout(); }, expiresInDuration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expirationDate",expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expirationDate");
    if (!token || !expirationDate){
      return;
    }

    return {
      token:token,
      expirationDate:new Date(expirationDate)
    }
  }
  
  getAllUsers () : Observable<any>{
    return this.http.get<any>("http://localhost:3000/api/users/getUsers");
  }
}
