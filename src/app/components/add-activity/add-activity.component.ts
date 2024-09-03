import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-activity',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-activity.component.html',
  styleUrl: './add-activity.component.css'
})
export class AddActivityComponent implements OnInit{
  
  @Output("addToggle") 
  addToggle: EventEmitter<any> = new EventEmitter();

  @Output("addActivity") 
  addActivity: EventEmitter<any> = new EventEmitter();

  @Input() activityData:any;

  ngOnInit(){
    console.log(this.activityData)
  }

  callParentAddToggle(){
    this.addToggle.emit()
  }

  callParentAddActivity(){
    this.addActivity.emit()
  }


}
