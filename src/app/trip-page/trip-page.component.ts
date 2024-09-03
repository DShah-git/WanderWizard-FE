import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../services/trip.service';
import { GoogleMapsModule } from "@angular/google-maps";
import { CommonModule, NgClass } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { EditActivityComponent } from "../components/edit-activity/edit-activity.component";
import { AISuggestionsModalComponent } from "../components/aisuggestions-modal/aisuggestions-modal.component";
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-trip-page',
  standalone: true,
  imports: [GoogleMapsModule, NgClass, FormsModule, EditActivityComponent, AISuggestionsModalComponent,DragDropModule,CommonModule ],
  templateUrl: './trip-page.component.html',
  styleUrl: './trip-page.component.css'
})
export class TripPageComponent {

  trip_id:string;

  trip:any;

  tripDays:any;
  tempData:string="";

  center!: google.maps.LatLngLiteral
  options: google.maps.MapOptions = {
    mapId: "d073098f12d9a720",
    zoom:7,
    controlSize:2
  } 


  constructor(private route: ActivatedRoute,private tripService:TripService,private userService:UserService){
    this.trip_id=""
   
  }


  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params => {
      this.trip_id = params.get('id')!;  
      
      this.tripService.getTrip(this.trip_id).subscribe({
        next:(data)=>{
          this.trip = data
          console.log(this.trip.tripModel)
          this.storeTripDataforUI(0)  
        },
        error:()=>{}
      })

      
    });
  }


  searchInput:Boolean=false;

  activateSearch(){
    this.searchInput = true;
    this.searchResult = []
  }

  toggleSearch(){
   
    this.searchInput = !this.searchInput
    this.searchResult = []
  }

  searchText:string=''

  searchResult:any = [];

  onSearchTextChange(searchString:string){

    if(searchString.length<3){
      this.searchResult = []
      return;
    }
  
    this.userService.userSearch(searchString).subscribe({
      next:(data)=>{
        
        this.searchResult = this.removeUserIfExistInList(data)
        
      },
      error:(err)=>{
        console.log(err)
      }
    })
  }


  removeUserIfExistInList(data:any){
    
    for(let i=0;i<this.trip.users.length;i++){
      data = data.filter((user:any) => user._id !== this.trip.users[i]._id);
    }

    return data;
  }

  addUser(user:any){
    let body = {
      trip_id:this.trip._id,
      user_to_share:user
    }



    this.tripService.shareTrip(body).subscribe({
      next:(data:any)=>{
       
        this.trip.users = data.trip.users
        this.searchResult = this.searchResult.filter((u:any) => u._id !== user._id);
      },
      error:(err)=>{
        console.log(err)
      }
    })

  }

  openInfo(index:number) {
    this.tripDays[index].active = !this.tripDays[index].active

  }

  editToggle(dayIndex:number, activityIndex:number){

   this.tripDays[dayIndex].activity[activityIndex].editActivityActive = !this.tripDays[dayIndex].activity[activityIndex].editActivityActive
  }


  updateActivity(dayIndex:number,activityIndex:number){
    this.trip.tripModel.trip = this.tripDays
    this.editToggle(dayIndex,activityIndex)

    this.tripService.updateTrip(this.trip).subscribe({
      next:(data:any)=>{
        this.trip = data.trip  
        this.storeTripDataforUI(dayIndex) 
      },
      error:()=>{}
    })
  }


  deleteActivity(dayIndex:number,activityIndex:number){
    this.tripDays[dayIndex].activity.splice(activityIndex,1);
    this.tripService.updateTrip(this.trip).subscribe({
      next:(data:any)=>{
        this.trip = data.trip
        this.storeTripDataforUI(dayIndex)
    
      },
      error:()=>{}
    })

  }

  //use to assign data and some bool flags for basic functionality
  storeTripDataforUI(openIDX:number){
    this.tripDays = this.trip.tripModel.trip
    this.tempData = JSON.stringify(this.tripDays)
    
    for(let i=0;i<this.tripDays.length;i++){
      if(i==0) {
        this.tripDays[i].active = true;
        this.tripDays[i].image_active =true;
      }
      else if(i==openIDX){
        this.tripDays[i].active = true;
        this.tripDays[i].image_active =true;
      } 
      else{
        this.tripDays[i].active = false;
        this.tripDays[i].image_active =true;
      } 
      
      for(let j=0;j<this.tripDays[i].activity.length;j++){
        this.tripDays[i].activity[j].editActivityActive = false;
      }
    }
  }

  addActivity(dayIDX:number,activityIDX:number){

    this.tripDays[dayIDX].activity.splice(activityIDX+1,0,
      {
        activity_name:"",
        activity_location:"",
        activity_description:"",
        location_type:"Location"
      }
    )

  }

  removeIdAddNotComplete(dayIDX:number,activityIDX:number){
    this.tripDays[dayIDX].activity.splice(activityIDX,1)
  }


  askAItoAdd(dayIDX:number,activityIDX:number){

    this.dayIndex = dayIDX;
    this.activityIndex = activityIDX
    this.openModal()
    this.AILoading = true;

    let previousLocation = this.tripDays[dayIDX].activity[activityIDX].activity_location
    this.tripService.getSuggestions({previousLocation:previousLocation,trip_location:this.trip.location}).subscribe({
      next:(data)=>{
        this.AISuggestions = data
        this.AILoading = false
       
      },
      error:()=>{}
    })
  }

  dayIndex!:number
  activityIndex!:number
  AISuggestions:any;
  AILoading:boolean = false;

  @ViewChild(AISuggestionsModalComponent) modal?: AISuggestionsModalComponent;

  openModal(): void {
    this.modal?.open()
  }

  
  addSuggestion($event:number){
    console.log($event)
    this.tripDays[this.dayIndex].activity.splice(this.activityIndex+1,0,
      {
        activity_name:this.AISuggestions[$event].activity_name,
        activity_location:this.AISuggestions[$event].activity_location,
        activity_description:this.AISuggestions[$event].activity_description,
        location_type:this.AISuggestions[$event].location_type,
        type:'AISuggestionAdd'
      }
    )
    
  }


  drop(event: CdkDragDrop<string[]>,index:number): void {
    moveItemInArray(this.tripDays[index].activity, event.previousIndex, event.currentIndex);
    this.tripService.updateTrip(this.trip).subscribe({
      next:(data:any)=>{
        this.trip = data.trip
        this.storeTripDataforUI(index)
    
      },
      error:()=>{}
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

  hideImage(index:number){
    console.log(index)
    
    this.tripDays[index].image_active = !this.tripDays[index].image_active
  }

}

  
