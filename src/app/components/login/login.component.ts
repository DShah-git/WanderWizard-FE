import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private userService: UserService, private cookieService:CookieService) {
}
  

  loginForm = new FormGroup({
    email: new FormControl<string>('',
      [Validators.required, Validators.email]
    ),
    password: new FormControl<string>('',
      [Validators.required, Validators.minLength(8)]
    ),
  });

  error:string = "";

  login(){
    let email = this.loginForm.value.email!
    let password  = this.loginForm.value.password!  
    
    this.userService.login(email,password)
    .subscribe({
      next:(data:any)=>{
        console.log(data.body.user)
        localStorage.setItem("userData", JSON.stringify(data.body.user))

        location.href = "/home"
      },
      error:(error)=>{
        if(error.status==400){
          this.error = error.error.msg
        }
        if(error.status==500){
          this.error = "Something went wrong, try again later"
        }
      }
    })
  }
}
