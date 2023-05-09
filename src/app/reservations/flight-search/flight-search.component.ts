import { Component } from '@angular/core';
import { Airport } from '../../models/airport';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ReservationData } from '../../models/reservation-data';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent {
  stepDescription!: string;
  nextStepDescription!: string;
  previousStepDescription!: string;
  minDate: Date;
  airports: Airport[] = [];
  reservationInProgress = false;
  reservationData: ReservationData;
  selectedDepartureAirport: Airport | null = null;
  selectedArrivalAirport: Airport | null = null;
  selectedDate: Date | null = null;
  sameAirportError: boolean = false;

  constructor( public reservationsService: ReservationsService, private router: Router) {
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.stepDescription =this.reservationsService.getStepDescription('search');
    this.nextStepDescription = this.reservationsService.getNextStepDescription('search');
    this.previousStepDescription = this.reservationsService.getPreviousStepDescription('search');
   
    this.reservationsService.getAirports();
    this.reservationsService.getAirportUpdateListener()
    .subscribe((airports: Airport[]) => {
      this.airports = airports;
    });

    this.reservationInProgress = this.reservationsService.isReservationInProgress();
    
    if (!this.reservationInProgress){
      this.reservationsService.SetEmptyReservationDataInLocalStorage()
    };

    this.reservationData = this.reservationsService.getReservationDataFromLocalStorage();

    this.selectedDepartureAirport = {
      code: this.reservationData.departureAirportCode,
      name: this.reservationData.departureAirportName
    };
    this.selectedArrivalAirport = {
      code: this.reservationData.arrivalAirportCode,
      name: this.reservationData.arrivalAirportName
    };
    this.selectedDate = this.reservationData.flightStartDate;
    if (typeof this.selectedDate === 'string') {
      this.selectedDate = new Date(this.selectedDate);
    }
  }
  
  onAirportChange() {
    if (this.selectedDepartureAirport?.code === this.selectedArrivalAirport?.code) {
      this.sameAirportError = true;
    } else {
      this.sameAirportError = false;
    }
  }

  getDisplayValue(airport: Airport | null): string {
    return airport ? airport.code : '';
  }

  searchFlights(form: NgForm) {
    if (this.sameAirportError) {
      return;
    }
      if (form.invalid) {
        return;
      }
    
    this.reservationData.departureAirportCode = this.selectedDepartureAirport.code;
    this.reservationData.departureAirportName = this.selectedDepartureAirport.name;
    this.reservationData.arrivalAirportCode = this.selectedArrivalAirport.code;
    this.reservationData.arrivalAirportName = this.selectedArrivalAirport.name;
    this.reservationData.flightStartDate = this.selectedDate;
    
    this.reservationsService.saveReservationDataToLocalStorage(this.reservationData);
    this.reservationsService.setReservationInProgress(true);

    this.router.navigate(['/flights']);
  }
}
