import { Component, OnInit, ViewChild } from '@angular/core';
import { CreateTripModalComponent } from '../../components/create-trip-modal/create-trip-modal.component';
import { LandingPageCreateTripComponentComponent } from "../../components/landing-page-create-trip-component/landing-page-create-trip-component.component";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CreateTripModalComponent, LandingPageCreateTripComponentComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent{


  constructor(private userService:UserService){
    if(this.userService.isLoggedIn()){
      location.href="/home"
    }
  }

  @ViewChild(LandingPageCreateTripComponentComponent) modal?: LandingPageCreateTripComponentComponent;

  goToAuth(){
    location.href="/auth"
  }

  openModal(): void {
    this.modal?.open()
  }


}
