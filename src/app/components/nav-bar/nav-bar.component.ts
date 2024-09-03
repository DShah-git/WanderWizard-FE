import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import  { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent{

  isLoggedIn:boolean;

  userData:{
    image:string,
    name:string,
  };


  
  constructor(private userService:UserService, private cookieService: CookieService){
    this.isLoggedIn = this.userService.isLoggedIn();

    console.log(this.isLoggedIn)

    if(this.isLoggedIn==true){
      let uData = JSON.parse(localStorage.getItem("userData")!)
      this.userData = uData;
    }else{
      this.userData ={
        image:"",
        name:""
      }
    }

  }

  dropDownActive:Boolean=false;

  toggleDropDown(){
    this.dropDownActive=!this.dropDownActive;
    console.log(this.dropDownActive)
  }

  profile(){
    location.href="profile"
  }

  logout(){
    this.cookieService.delete("authToken")
    localStorage.removeItem("userData")

    location.href="/"
  }
   
}
