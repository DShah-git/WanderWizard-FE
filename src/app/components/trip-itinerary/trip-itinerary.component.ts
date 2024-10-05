import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { TripService } from '../../services/trip.service';
import { CommonModule } from '@angular/common';
import { EditActivityComponent } from '../edit-activity/edit-activity.component';
import { Title } from "@angular/platform-browser";
import { AISuggestionsModalComponent } from '../aisuggestions-modal/aisuggestions-modal.component';

@Component({
  selector: 'app-trip-itinerary',
  standalone: true,
  imports: [DragDropModule, CommonModule, EditActivityComponent, AISuggestionsModalComponent, TripItineraryComponent],
  templateUrl: './trip-itinerary.component.html',
  styleUrl: './trip-itinerary.component.css'
})
export class TripItineraryComponent implements OnInit {

  @Input() trip: any;
  tripDays: any;

  constructor(private tripService: TripService, private titleService: Title) { }

  ngOnInit(): void {
    this.tripDays = this.trip.tripModel.trip
  }

  openInfo(index: number) {
    this.tripDays[index].active = !this.tripDays[index].active

  }

  editToggle(dayIndex: number, activityIndex: number) {

    this.tripDays[dayIndex].activity[activityIndex].editActivityActive = !this.tripDays[dayIndex].activity[activityIndex].editActivityActive
  }

  updateActivity(dayIndex: number, activityIndex: number) {
    this.trip.tripModel.trip = this.tripDays
    this.editToggle(dayIndex, activityIndex)

    this.tripService.updateTrip(this.trip).subscribe({
      next: (data: any) => {
        this.trip = data.trip
        this.storeTripDataforUI(dayIndex)
      },
      error: () => { }
    })
  }


  deleteActivity(dayIndex: number, activityIndex: number) {
    this.tripDays[dayIndex].activity.splice(activityIndex, 1);
    this.tripService.updateTrip(this.trip).subscribe({
      next: (data: any) => {
        this.trip = data.trip
        this.storeTripDataforUI(dayIndex)

      },
      error: () => { }
    })

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

  addActivity(dayIDX: number, activityIDX: number) {

    this.tripDays[dayIDX].activity.splice(activityIDX + 1, 0,
      {
        activity_name: "",
        activity_location: "",
        activity_description: "",
        location_type: "Location"
      }
    )

  }

  removeIdAddNotComplete(dayIDX: number, activityIDX: number) {
    this.tripDays[dayIDX].activity.splice(activityIDX, 1)
  }


  askAItoAdd(dayIDX: number, activityIDX: number) {

    this.dayIndex = dayIDX;
    this.activityIndex = activityIDX
    this.openModal()
    this.AILoading = true;

    let previousLocation = this.tripDays[dayIDX].activity[activityIDX].activity_location
    this.tripService.getSuggestions({ previousLocation: previousLocation, trip_location: this.trip.location }).subscribe({
      next: (data) => {
        this.AISuggestions = data
        this.AILoading = false

      },
      error: () => { }
    })
  }

  dayIndex!: number
  activityIndex!: number
  AISuggestions: any;
  AILoading: boolean = false;

  @ViewChild(AISuggestionsModalComponent) modal?: AISuggestionsModalComponent;

  openModal(): void {
    this.modal?.open()
  }


  addSuggestion($event: number) {
    console.log($event)
    this.tripDays[this.dayIndex].activity.splice(this.activityIndex + 1, 0,
      {
        activity_name: this.AISuggestions[$event].activity_name,
        activity_location: this.AISuggestions[$event].activity_location,
        activity_description: this.AISuggestions[$event].activity_description,
        location_type: this.AISuggestions[$event].location_type,
        type: 'AISuggestionAdd'
      }
    )

  }


  drop(event: CdkDragDrop<string[]>, index: number): void {
    moveItemInArray(this.tripDays[index].activity, event.previousIndex, event.currentIndex);
    this.tripService.updateTrip(this.trip).subscribe({
      next: (data: any) => {
        this.trip = data.trip
        this.storeTripDataforUI(index)

      },
      error: () => { }
    })
  }

  dragStarted(event: any): void {
    console.log('Drag started:', event);
    // Custom logic when dragging starts
  }

  dragEnded(event: any): void {
    console.log('Drag ended:', event);
    // Custom logic when dragging ends
  }

  hideImage(index: number) {
    console.log(index)

    this.tripDays[index].image_active = !this.tripDays[index].image_active
  }

}
