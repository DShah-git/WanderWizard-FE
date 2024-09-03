import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-aisuggestions-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aisuggestions-modal.component.html',
  styleUrl: './aisuggestions-modal.component.css'
})
export class AISuggestionsModalComponent implements OnInit{

  isVisible = false;

  @Input() inputData:any

  @Input() loading!:boolean

  @Output("addSuggestion")
  addSuggestion: EventEmitter<any> = new EventEmitter()

  ngOnInit(): void {
    console.log(this.inputData)
  }

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  callParentAddSuggestion(suggestionIDX:number){
    this.addSuggestion.emit(suggestionIDX)
    this.close()
  }

}
