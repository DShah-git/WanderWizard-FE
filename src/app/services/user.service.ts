import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private cookieService:CookieService) { }

  readonly root_url:string = environment.dev_url 

  login(email:string,password:string){
  
    return this.http.post(this.root_url+"user/login",{"email":email,"password":password}, {withCredentials:true, observe: 'response' });
  }

  register(email:string,password:string,name:string){
    return this.http.post(this.root_url+"user/register",{"email":email,"password":password,"name":name});
  }

  isLoggedIn():boolean{
    let AuthCookie = this.cookieService.get("authToken")
    if(!AuthCookie) return false;
    console.log(!this.tokenExpired(AuthCookie))
    return !this.tokenExpired(AuthCookie)


  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  userSearch(text:string){
    let AuthCookie = this.cookieService.get("authToken")
    return this.http.post(this.root_url+"user/findUserToShare",{"searchString":text},
      {withCredentials:true, headers:{'x-auth':AuthCookie}}
    );
  }
}
