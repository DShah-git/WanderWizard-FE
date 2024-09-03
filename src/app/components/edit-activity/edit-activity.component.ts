import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-activity',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './edit-activity.component.html',
  styleUrl: './edit-activity.component.css'
})
export class EditActivityComponent implements OnInit{

  @Output("editToggle") 
  editToggle: EventEmitter<any> = new EventEmitter();

  @Output("updateActivity") 
  updateActivity: EventEmitter<any> = new EventEmitter();

  @Output("removeActivity") 
  removeActivity: EventEmitter<any> = new EventEmitter();

  @Input() activityData:any;

  isActivityAdded:boolean = false;

  AIActivityAdd:boolean = false;

  options:string[]= ["Beach","Bar","Historial Sites","Hotel","Location","Market","Museum","Restaurant","Shopping","Sight Seeing","Travel"]

  ngOnInit(){
    console.log(this.activityData)
    if(this.activityData.activity_name=="")
    {
      this.isActivityAdded=true;
    }
    if(this.activityData.type){
      this.AIActivityAdd = true;
    }

    console.log(this.isActivityAdded)
  }

  callParentEditToggle(){
    this.editToggle.emit()
  }

  callParentUpdateActivity(){
    this.updateActivity.emit()
  }

  callAddRemoveActivity(){
    this.removeActivity.emit()
  }

  onChange(value: string) {
    this.activityData.location_type = value
  }
}
