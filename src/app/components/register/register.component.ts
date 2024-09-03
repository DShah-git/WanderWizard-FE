import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormsModule,FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor(private userService:UserService){}

  error:string = ""

  msg:string = ""

  registerForm = new FormGroup({
    email: new FormControl<string>('',
      [Validators.required, Validators.email]
    ),
    password: new FormControl<string>('',
      [Validators.required, Validators.minLength(8)]
    ),
    name: new FormControl<string>('',
      [Validators.required,Validators.minLength(3)]
    )
  });



  register(){
    console.log(this.registerForm.value)
    let name = this.registerForm.value.name!
    let email = this.registerForm.value.email!
    let password  = this.registerForm.value.password! 

    this.userService.register(email,password,name).subscribe(
      {
        next:(data)=>{
          console.log(data)
          this.msg = "User has been register, please log into your account"
        },
        error:(error)=>{
          if(error.error.msg=="User already exists"){
            this.error = error.error.msg
          }
        }
      }
    )

  }

}
