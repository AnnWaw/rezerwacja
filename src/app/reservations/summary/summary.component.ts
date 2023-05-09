import { Component } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationData } from '../../models/reservation-data';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css']
})
export class SummaryComponent {
  stepDescription!: string;
  nextStepDescription!: string;
  previousStepDescription!: string;
  reservationData: ReservationData;
  
  constructor(
    public reservationsService: ReservationsService
  ) {}

  ngOnInit() {
    this.stepDescription =
      this.reservationsService.getStepDescription('summary');
    this.nextStepDescription =
      this.reservationsService.getNextStepDescription('summary');
    this.previousStepDescription =
      this.reservationsService.getPreviousStepDescription('summary');

      this.reservationData = this.reservationsService.getReservationDataFromLocalStorage();
  }
  
  ngOnDestroy() {
    this.reservationsService.SetEmptyReservationDataInLocalStorage()
    this.reservationsService.setReservationInProgress(false);
  }
}
