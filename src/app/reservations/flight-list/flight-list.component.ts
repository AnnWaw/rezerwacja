import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight';
import { ReservationsService } from '../../services/reservations.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReservationData } from '../../models/reservation-data';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.css'],
})
export class FlightListComponent implements OnInit {
  departureAirport: string;
  arrivalAirport: string;
  departureDate: Date;
  departureAirportName: string;
  arrivalAirportName: string;
  reservationData: ReservationData;
  stepDescription!: string;
  nextStepDescription!: string;
  previousStepDescription!: string;
  previousStepLink!: string;
  flights: Flight[] = [];
  dataSource: MatTableDataSource<Flight>;
  displayedColumns: string[] = [
    'number',
    'carrier',
    'airplaneModel',
    'flightStartDate',
    'select',
  ];

  constructor(
    public reservationsService: ReservationsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.stepDescription =
      this.reservationsService.getStepDescription('flights');
    this.nextStepDescription =
      this.reservationsService.getNextStepDescription('flights');
    this.previousStepDescription =
      this.reservationsService.getPreviousStepDescription('flights');
      this.previousStepLink = '/search';

      this.reservationData = this.reservationsService.getReservationDataFromLocalStorage();

    this.departureAirport = this.reservationData.departureAirportCode;
    this.arrivalAirport = this.reservationData.arrivalAirportCode;
    this.departureDate = this.reservationData.flightStartDate;
    this.departureAirportName = this.reservationData.departureAirportName;
    this.arrivalAirportName = this.reservationData.arrivalAirportName;
    this.dataSource = new MatTableDataSource<Flight>([]);

    this.reservationsService.getFlights(this.departureAirport, this.arrivalAirport, this.departureDate);
        this.reservationsService.getFlightUpdateListener().subscribe((flights) => {
          this.flights = flights;
          this.dataSource = new MatTableDataSource(this.flights);
        });
  }

  isSelected(flight: Flight): boolean {
    return flight.number === this.reservationData.flightNumber;
  }
  
  selectFlight(selectedFlight: Flight) {
    console.log(selectedFlight)
    if ( this.reservationData.flightNumber !== selectedFlight.number){
      this.reservationData.seatNumber = null;  
    }
    this.reservationData.airplaneModel = selectedFlight.airplaneModel;
    this.reservationData.flightNumber = selectedFlight.number;
    this.reservationData.flightStartDate = selectedFlight.flightStartDate;

    this.reservationsService.saveReservationDataToLocalStorage(this.reservationData);

    this.router.navigate(['/seats']);
  }
}
