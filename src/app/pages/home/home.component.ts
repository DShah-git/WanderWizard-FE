import { Component, OnInit, ViewChild } from '@angular/core';
import { NavBarComponent } from "../../components/nav-bar/nav-bar.component";
import { TripService } from '../../services/trip.service';
import { User } from '../../models/user.model';
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule, NgStyle } from '@angular/common';
import { CreateTripModalComponent } from "../../components/create-trip-modal/create-trip-modal.component";
import { ConfirmationModalComponent } from "../../components/confirmation-modal/confirmation-modal.component";



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavBarComponent, GoogleMapsModule, NgStyle, CreateTripModalComponent, ConfirmationModalComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{

  user:User;

  owned_trips:any;
  shared_trips:any;

  options: google.maps.MapOptions = {
    mapId: "d073098f12d9a720 ",
    center: { lat: 0, lng: 0},
    zoom: 2,
  } 

  mapStyles: { [key: string]: string } = {
    width: '40%',
  };


  constructor(private tripService:TripService, private google: GoogleMapsModule){
    
    this.user = JSON.parse(localStorage.getItem("userData")!)
    this.getAndSetTrips()
   
  }

 

  expandToggle : boolean = false;

  toggleMap(){


    if(this.expandToggle==false){
      this.mapStyles = {width:'80%'}
      this.expandToggle = !this.expandToggle
      return;
    }
    else{
      this.mapStyles = {width:'40%'}
      this.expandToggle = !this.expandToggle
      return 
    }

    
  }


  redirectToTrip(id:string){
    location.href = "trip/"+id
  }
  

  @ViewChild(CreateTripModalComponent) modal?: CreateTripModalComponent;
  @ViewChild(ConfirmationModalComponent) confirmationModal?: ConfirmationModalComponent;

  openModal(): void {
    this.modal?.open()
  }

  tripToDelete:any;
  deleteTripIndex:any;

  openCofirmationModal(trip:any,index:number){
    this.tripToDelete = trip;
    this.deleteTripIndex = index
    console.log(this.tripToDelete,this.deleteTripIndex)
    this.confirmationModal?.open()
  }

  confirmDelete(){
    this.tripService.deleteTrip(this.tripToDelete).subscribe({
      next:(data)=>{
        console.log(data)
       this.tripToDelete= null
       this.deleteTripIndex = null
       this.getAndSetTrips()
      },
      error:(err)=>{
        console.log(err)
        this.tripToDelete= null
        this.deleteTripIndex = null
      }
    })
  }

  getAndSetTrips(){
    this.tripService.getTrips().subscribe({
      next:(data:any)=>{
        console.log(data)
        this.owned_trips = data.owned_trips;
        this.shared_trips = data.shared_trips;
        this.options ;
      },
      error:()=>{

      }
    })
  }

}
