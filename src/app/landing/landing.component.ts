import { Component } from '@angular/core';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [LoginComponent, RegisterComponent,NgClass],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  
  selected:string = "login"

  constructor(private userService:UserService){
    if(this.userService.isLoggedIn()){
      location.href="/home"
    }
  }

  changeSelected(selector:string) {
    this.selected = selector

    console.log(this.selected)
  }
  
}
