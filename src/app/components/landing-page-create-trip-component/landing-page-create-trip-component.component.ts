import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators, ValueChangeEvent} from '@angular/forms';
import { filter } from 'rxjs';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-landing-page-create-trip-component',
  standalone: true,
  imports: [CommonModule,FormsModule, ReactiveFormsModule],
  templateUrl: './landing-page-create-trip-component.component.html',
  styleUrl: './landing-page-create-trip-component.component.css'
})
export class LandingPageCreateTripComponentComponent {
  isVisible = false;
  
  canEnterEndDate:boolean = true;
  
  tripForm = new FormGroup({
    name: new FormControl<string>('',
      [Validators.required]
    ),

    location: new FormControl<string>('',
      [Validators.required]
    ),

    startDate: new FormControl<string>('',
      [Validators.required]
    ),

    endDate: new FormControl<string>({value:'',disabled:true},
      [Validators.required]
    ),
  })

  currentDate:string= new Date().toISOString().substring(0,10)
  
  activityLevel:number = 1;

  errMessage:string = ""

  constructor(private tripService:TripService){}

  ngOnInit(): void {
    
    console.log(this.currentDate)
    
    this.tripForm.controls.startDate.events
    .pipe(filter((event) => event instanceof ValueChangeEvent))
    .subscribe((event) => {
      if(event.value.startDate != ""){
        console.log(event)
        this.tripForm.controls.endDate.enable()
      
      }
      else{
        console.log(event)
        this.tripForm.controls.endDate.disable()
        this.tripForm.controls.endDate.setValue('')
      }
    });
  }



  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }


  selectActivity(lvl:number){
    this.activityLevel  = lvl
  }

  enableEndDate(){
    this.tripForm.controls.endDate.enable()
  }

  createLoading:Boolean=false;

  submitTrip(){
    this.createLoading = true

    let {name,location,endDate,startDate} = this.tripForm.value

    if(name==""||location==""||endDate==""||startDate==""){
      return;
      console.log("All required fields are not filled")
    }

    let activityLevel = 
    {
      index:this.activityLevel,
      description:""
    }

    if(this.activityLevel==0){
      activityLevel.description = "less"
    }else if(this.activityLevel==1){
      activityLevel.description = "balanced"
    }else{
      activityLevel.description = "more"
    }

    let end_date,start_date, days

    if(endDate&&startDate){
      end_date = new Date(endDate)
      start_date = new Date(startDate)

      const diffTime = Math.abs( end_date.getTime() - start_date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      days = diffDays+1
    }


    let reqBody = {
      name,
      location,
      tripModel:{
        activityLevel,
        days:{
          startDate,
          endDate,
          days
        }
      } 
    }
    

    this.tripService.createTripWithoutUser(reqBody).subscribe({
      next:(data:any)=>{
        console.log(data)
        window.location.href = "tripitinerary/" + data.trip._id
        this.createLoading = false;
      },
      error:(error)=>{
        console.log(error),
        this.errMessage = error.error.msg
        console.log(this.errMessage)
        this.createLoading = false;
      }

    })
    
  }


}
