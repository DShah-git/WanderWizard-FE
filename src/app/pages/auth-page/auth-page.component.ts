import { Component } from '@angular/core';
import { LoginComponent } from '../../components/login/login.component';
import { RegisterComponent } from '../../components/register/register.component';
import { CommonModule, NgClass } from '@angular/common';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [LoginComponent, RegisterComponent,NgClass],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.css'
})
export class AuthPageComponent {
  
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
