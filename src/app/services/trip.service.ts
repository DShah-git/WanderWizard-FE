import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  

  token:string;

  baseURL:string = environment.dev_url;
  

  constructor(private http:HttpClient, private cookieService:CookieService) {

    this.token = cookieService.get("authToken")

  }
  

  getTrips(){
    return this.http.get(this.baseURL+"trip/list",{withCredentials:true, headers:{'x-auth':this.token}})
  }

  getTrip(id:string){
    return this.http.get(this.baseURL+"trip/trip/" +id,{withCredentials:true, headers:{'x-auth':this.token}})
  }


  shareTrip(body:any){
    return this.http.post(this.baseURL+"trip/share",body,{withCredentials:true, headers:{'x-auth':this.token}})
  }

  createTrip(body:any){
    return this.http.post(this.baseURL+"trip/create",body,{withCredentials:true, headers:{'x-auth':this.token}})
  }


  updateTrip(body:any){
    return this.http.patch(this.baseURL+"trip/update",body,{withCredentials:true, headers:{'x-auth':this.token}})
  }
  
  deleteTrip(body:any){
    return this.http.post(this.baseURL+"trip/delete",body,{withCredentials:true, headers:{'x-auth':this.token}})
  }




  // ============= This functions can be used without credentials or signup

  
  getTripNoUser(id:string){
    return this.http.get(this.baseURL+"createTripWithoutUser/trip/" +id)
  }

  createTripWithoutUser(body:any){
    return this.http.post(this.baseURL+"createTripWithoutUser/create",body)
  }

  updateTripWithoutUser(body:any){
    return this.http.patch(this.baseURL+"createTripWithoutUser/update",body)
  }

  getSuggestions(body:any){
    return this.http.post(this.baseURL+"createTripWithoutUser/suggestion",body,{withCredentials:true, headers:{'x-auth':this.token}})
  }
  
}
