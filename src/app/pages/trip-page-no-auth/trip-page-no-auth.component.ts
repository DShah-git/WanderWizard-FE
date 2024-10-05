import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../services/trip.service';
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { EditActivityComponent } from "../../components/edit-activity/edit-activity.component";
import { AISuggestionsModalComponent } from "../../components/aisuggestions-modal/aisuggestions-modal.component";
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { Title } from "@angular/platform-browser";
import { TripItineraryComponent } from "../../components/trip-itinerary/trip-itinerary.component";


@Component({
  selector: 'app-trip-page-no-auth',
  standalone: true,
  imports: [GoogleMapsModule, NgClass, FormsModule, EditActivityComponent, AISuggestionsModalComponent, DragDropModule, CommonModule, TripItineraryComponent],
  templateUrl: './trip-page-no-auth.component.html',
  styleUrl: './trip-page-no-auth.component.css'
})
export class TripPageNoAuthComponent {
  trip_id: string;

  trip: any;

  tripDays: any;
  tempData: string = "";

  searchText: string = ''

  searchResult: any = [];

  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapId: "d073098f12d9a720",
    zoom: 7,
    controlSize: 2
  }

  searchInput: Boolean = false;

  constructor(private route: ActivatedRoute, private tripService: TripService, private userService: UserService, private titleService: Title) {
    this.trip_id = ""
  }


  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.trip_id = params.get('id')!;

      this.tripService.getTripNoUser(this.trip_id).subscribe({
        next: (data) => {
          this.trip = data
          this.storeTripDataforUI(0)
        },
        error: (err) => {
          console.log(err)
         }
      })

    });
  }


  activateSearch() {
    this.searchInput = true;
    this.searchResult = []
  }

  toggleSearch() {

    this.searchInput = !this.searchInput
    this.searchResult = []
  }


  onSearchTextChange(searchString: string) {

    if (searchString.length < 3) {
      this.searchResult = []
      return;
    }

    this.userService.userSearch(searchString).subscribe({
      next: (data) => {

        this.searchResult = this.removeUserIfExistInList(data)

      },
      error: (err) => {
        console.log(err)
      }
    })
  }


  removeUserIfExistInList(data: any) {

    for (let i = 0; i < this.trip.users.length; i++) {
      data = data.filter((user: any) => user._id !== this.trip.users[i]._id);
    }
    return data;
  }

  addUser(user: any) {
    let body = {
      trip_id: this.trip._id,
      user_to_share: user
    }

    this.tripService.shareTrip(body).subscribe({
      next: (data: any) => {

        this.trip.users = data.trip.users
        this.searchResult = this.searchResult.filter((u: any) => u._id !== user._id);
      },
      error: (err) => {
        console.log(err)
      }
    })

  }

  //use to assign data and some bool flags for basic functionality
  storeTripDataforUI(openIDX: number) {
    this.tripDays = this.trip.tripModel.trip
    this.tempData = JSON.stringify(this.tripDays)
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
