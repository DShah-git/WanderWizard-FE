import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.css'
})
export class ConfirmationModalComponent {
  isVisible = false;

  @Output("sendConfirmation")
  sendConfirmation: EventEmitter<any> = new EventEmitter()

  @Input() message!:string;  

  open(): void {
    this.isVisible = true;
  }

  close(): void {
    this.isVisible = false;
  }

  sendParentConfirmation(){
    this.sendConfirmation.emit()
    this.close()
  }
}
