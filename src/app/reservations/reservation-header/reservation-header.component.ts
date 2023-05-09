import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-reservation-header',
  templateUrl: './reservation-header.component.html',
  styleUrls: ['./reservation-header.component.css']
})
export class ReservationHeaderComponent {
  @Input() currentStep!: string;
  @Input() nextStep!: string;

  constructor() {}
}