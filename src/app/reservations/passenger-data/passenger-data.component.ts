import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';
import { TicketReservation } from 'src/app/models/ticket-reservation';
import { ReservationData } from '../../models/reservation-data';

@Component({
  selector: 'app-passenger-data',
  templateUrl: './passenger-data.component.html',
  styleUrls: ['./passenger-data.component.css'],
})
export class PassengerDataComponent {
  stepDescription!: string;
  nextStepDescription!: string;
  previousStepDescription!: string;
  previousStepLink!: string;
  selectedSeat: [number, string];
  flightNumber!: string;
  reservationData: ReservationData;
  newReservation: TicketReservation[] = [];

  constructor(
    public reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stepDescription =
      this.reservationsService.getStepDescription('passenger');
    this.nextStepDescription =
      this.reservationsService.getNextStepDescription('passenger');
    this.previousStepDescription =
      this.reservationsService.getPreviousStepDescription('passenger');
    this.previousStepLink = '/seats';
    this.reservationData =
      this.reservationsService.getReservationDataFromLocalStorage();
    this.selectedSeat = this.reservationData.seatNumber;
    this.flightNumber = this.reservationData.flightNumber;
  }

  onAddReservation(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const reservationNumber = 'R' + Date.now().toString();

    const reservation: TicketReservation = {
      reservationNumber: reservationNumber,
      passengerFirstName: form.value.passengerName,
      passengerLastName: form.value.passengerSurname,
      passportNumber: form.value.passengerPassportNumber,
      flightNumber: this.flightNumber,
      arrivalAirportCode: this.reservationData.arrivalAirportCode,
      departureAirportCode: this.reservationData.departureAirportCode,
      flightStartDate: this.reservationData.flightStartDate,
      seatNumber: this.selectedSeat,
    };
    this.reservationsService.addReservation(reservation);

    this.reservationData.passengerFirstName = form.value.passengerName;
    this.reservationData.passengerLastName = form.value.passengerSurname;
    this.reservationData.passportNumber = form.value.passengerPassportNumber;
    this.reservationData.reservationNumber = reservationNumber;
    this.reservationsService.saveReservationDataToLocalStorage(this.reservationData);

    form.resetForm();
    this.router.navigate(['/summary']);
  }
}
