import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { ReservationData } from '../../models/reservation-data';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent {

  stepDescription!: string;
  nextStepDescription!: string;
  previousStepDescription!: string;
  previousStepLink!: string;
  airplaneModel: string = '';
  seatMarginClass!: string;
  flightNumber: string = '';
  arrivalAirportCode: string = '';
  departureAirportCode: string = '';
  selectedSeat!: [number, string];
  // reservationInProgress = false;
  rows: number[];
  columns: string[];
  reservationData: ReservationData;


  
  constructor( public reservationsService: ReservationsService, private router: Router) {}

  ngOnInit() {
    this.stepDescription =
      this.reservationsService.getStepDescription('seats');
    this.nextStepDescription =
      this.reservationsService.getNextStepDescription('seats');
    this.previousStepDescription =
      this.reservationsService.getPreviousStepDescription('seats');
      this.previousStepLink = '/flights';

      this.reservationData = this.reservationsService.getReservationDataFromLocalStorage();
      this.airplaneModel = this.reservationData.airplaneModel;
        this.flightNumber =this.reservationData.flightNumber;
        this.arrivalAirportCode = this.reservationData.arrivalAirportCode;
        this.departureAirportCode = this.reservationData.departureAirportCode;
        this.selectedSeat =  this.reservationData.seatNumber;
        if (this.selectedSeat === null) {
          this.selectedSeat = [null, null];
        }

        this.reservationsService.getSeats(this.airplaneModel)
        .then(data => {
          this.rows = Array(data[0]).fill(0).map((x, i) => i + 1);
          this.columns = Array(data[1]).fill(0).map((x, i) => String.fromCharCode(65 + i));
          this.seatMarginClass = this.airplaneModel === 'Embraer E190' ? 'seat_op2' : 'seat_op1';
        })
        .catch(error => console.error(error));
  }

  isSelected(row: number, column: string): boolean {
    if (!this.selectedSeat) {
      return false;
    }
    return this.selectedSeat[0] === row && this.selectedSeat[1] === column;
  }

  selectSeat(row: number, column: string) {
    const seat = row.toString() + column; 
    
    this.reservationData.seatNumber = [row,column];
    this.reservationsService.saveReservationDataToLocalStorage(this.reservationData);

    this.router.navigate(['passenger']);
  }
}