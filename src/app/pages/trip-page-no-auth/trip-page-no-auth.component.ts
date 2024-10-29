import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule, NgClass } from '@angular/common';

import { Title } from "@angular/platform-browser";
import { TripItineraryComponent } from "../../components/trip-itinerary/trip-itinerary.component";


@Component({
  selector: 'app-trip-page-no-auth',
  standalone: true,
  imports: [GoogleMapsModule, NgClass, CommonModule, TripItineraryComponent],
  templateUrl: './trip-page-no-auth.component.html',
  styleUrl: './trip-page-no-auth.component.css'
})
export class TripPageNoAuthComponent {
  trip_id: string;

  trip: any;

  tripDays: any;

  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapId: "d073098f12d9a720",
    zoom: 7,
    controlSize: 2
  }

  constructor(private route: ActivatedRoute, private tripService: TripService, private titleService: Title) {
    this.trip_id = ""
  
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.trip_id = params.get('id')!;
      
      this.tripService.getTripNoUser(this.trip_id).subscribe({
        next: (data) => {
          
          this.trip = data
          this.storeTripDataforUI(0)
          
          let localSavedTrips = JSON.parse(localStorage.getItem("trips")!)
          console.log(this.trip)
          if(localSavedTrips){
            localSavedTrips.push(this.trip_id)
            localStorage.setItem("trips",localSavedTrips)
          }else{
            localStorage.setItem("trips",JSON.stringify([this.trip_id]))
          }
        },
        error: (err) => {
          console.log(err)
         }
      })

    });
  }


  //use to assign data and some bool flags for basic functionality
  storeTripDataforUI(openIDX: number) {
    this.tripDays = this.trip.tripModel.trip
    this.titleService.setTitle(this.trip.location + " - Wander Wizard");
    for (let i = 0; i < this.tripDays.length; i++) {
      if (i == 0) {
        this.tripDays[i].active = true;
        this.tripDays[i].image_active = true;
      }
      else if (i == openIDX) {
        this.tripDays[i].active = true;
        this.tripDays[i].image_active = true;
      }
      else {
        this.tripDays[i].active = false;
        this.tripDays[i].image_active = true;
      }

      for (let j = 0; j < this.tripDays[i].activity.length; j++) {
        this.tripDays[i].activity[j].editActivityActive = false;
      }
    }
  }

  hideImage(index: number) {
    this.tripDays[index].image_active = !this.tripDays[index].image_active
  }

}
