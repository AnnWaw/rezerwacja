import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { from, lastValueFrom } from 'rxjs';
import { TicketReservation } from '../models/ticket-reservation';
import { Airport } from '../models/airport';
import { Flight } from '../models/flight';
import { ReservationData } from '../models/reservation-data';
import { ReservationStepsDescriptions } from '../models/reservation-steps-description';

@Injectable({
  providedIn: 'root'
})

export class ReservationsService {
    
    private reservationStepsDescriptions: ReservationStepsDescriptions[] = [
        { step: 'search', stepDescription: 'Wyszukiwanie lotów', nextStepDescription: 'Wybór lotu', previousStepDescription: '' },
        { step: 'flights', stepDescription: 'Wybór lotu', nextStepDescription: 'Wybór miejsca', previousStepDescription: 'Wyszukiwanie lotów' },
        { step: 'seats', stepDescription: 'Wybór miejsca', nextStepDescription: 'Dane pasażera', previousStepDescription: 'Wybór lotu' },
        { step: 'passenger', stepDescription: 'Dane pasażera', nextStepDescription: 'Podsumowanie rezerwacji', previousStepDescription: 'Wybór miejsca' },
        { step: 'summary', stepDescription: 'Podsumowanie rezerwacji', nextStepDescription: '', previousStepDescription: '' }
      ];
      
    private reservations: TicketReservation[] = [];
    private reservationsUpdated = new Subject<TicketReservation[]>();
    private airports: Airport[] = [];
    private airportsUpdated = new Subject<Airport[]>();
    private flights: Flight[] = [];
    private flightsUpdated = new Subject<Flight[]>();
    private reservationInProgress = false;
    private reservationsLocalStorageUpdated = new Subject<TicketReservation[]>();
    public previousStepLink: string = '';
    constructor(private http: HttpClient) { }

    
    isReservationInProgress() {
      return this.reservationInProgress;
    }

    setReservationInProgress(value: boolean):void {
      this.reservationInProgress =value;
    }

    getFlights(dep: string, arr: string, date: Date) {
      this.http
        .post<{ message: string, flights: Flight[] }>(`http://localhost:3000/flight/${dep}/${arr}`, { date: date })
        .subscribe(({ flights }) => {
          this.flights = flights;
          this.flightsUpdated.next([...this.flights]);
        });
    }

    getReservationLocalStorageUpdateListener() {
      return this.reservationsLocalStorageUpdated.asObservable();
    }

    getFlightUpdateListener() {
      return this.flightsUpdated.asObservable();
    }

    getReservationsFromLocalStorage(): TicketReservation[] {
      const reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
      return reservations;
    }

    getReservations(){
      this.http
        .get<{message: string, reservations: any}>('http://localhost:3000/reservations')
        .pipe(map((reservationData) => {
          return reservationData.reservations.map(reservation => {
            return {
              reservationNumber: reservation.reservationNumber,
              passengerFirstName: reservation.passengerFirstName,
              passengerLastName: reservation.passengerLastName,
              passportNumber: reservation.passportNumber,
              flightNumber: reservation.flightNumber,
              arrivalAirportCode: reservation.arrivalAirportCode,
              departureAirportCode: reservation.departureAirportCode,
              flightStartDate: reservation.flightStartDate,
              seatNumber: reservation.seatNumber,
            }
          })
        }))
        .subscribe((trnasformedReservations) => {
          this.reservations = trnasformedReservations;
          this.reservationsUpdated.next([...this.reservations]);
        });
    }

    saveAllReservationsToLocalStorage(reservations: TicketReservation[]) {
      localStorage.setItem('reservations', JSON.stringify(reservations));
    }
    getAirports(){
      this.http
        .get<{message: string, airports: Airport[]}>('http://localhost:3000/airports')
        .subscribe(({ airports }) => {
          this.airports = airports;
          this.airportsUpdated.next([...this.airports]);
        });
    }

    getAirportUpdateListener(){
      return this.airportsUpdated.asObservable();
    }

    getReservationUpdateListener(){
      return this.reservationsUpdated.asObservable();
    }

    async getSeats(airplaneType: string): Promise<number[]> {
      const response = await lastValueFrom(from(
        this.http.get<{ message: string, data: number[] }>(`http://localhost:3000/airplane/${airplaneType}`)
      ));
      return response.data;
    }
    
    addReservation(newreservation: TicketReservation){
      const reservation: TicketReservation = newreservation;
      console.log(newreservation);
      
      this.http
        .post<{ message: string }>('http://localhost:3000/reservation', reservation)
        .subscribe(responseData => {
          this.reservations.push(reservation);
          this.reservationsUpdated.next([...this.reservations]);
          
          const storedReservations = this.getReservationsFromLocalStorage();
          storedReservations.push(reservation);
          localStorage.setItem('reservations', JSON.stringify(storedReservations));
          this.reservationsLocalStorageUpdated.next([...storedReservations]);
        });
    }
    
    getReservationDataFromLocalStorage(){
      const reservationData = JSON.parse(localStorage.getItem('reservationData'));
      return reservationData;
    }

    saveReservationDataToLocalStorage(reservation: ReservationData) {
      const reservationData = {
          reservationNumber: reservation.reservationNumber,
          passengerFirstName: reservation.passengerFirstName,
          passengerLastName: reservation.passengerLastName,
          passportNumber: reservation.passportNumber,
          flightNumber: reservation.flightNumber,
          arrivalAirportCode: reservation.arrivalAirportCode,
          departureAirportCode: reservation.departureAirportCode,
          arrivalAirportName: reservation.arrivalAirportName,
          departureAirportName: reservation.departureAirportName,
          flightStartDate: reservation.flightStartDate,
          airplaneModel: reservation.airplaneModel,
          seatNumber: reservation.seatNumber,
      };
      localStorage.setItem('reservationData', JSON.stringify(reservationData));
    }

    SetEmptyReservationDataInLocalStorage() {
      const reservationData = {
          reservationNumber: '',
          passengerFirstName: '',
          passengerLastName: '',
          passportNumber: '',
          flightNumber: '',
          arrivalAirportCode: '',
          departureAirportCode: '',
          arrivalAirportName: '',
          departureAirportName: '',
          flightStartDate: null,
          airplaneModel: '',
          seatNumber: null,
      };
      localStorage.setItem('reservationData', JSON.stringify(reservationData));
    }

    getStepDescription(step: string): string {
        const stepData = this.reservationStepsDescriptions.find(
          stepDesc => stepDesc.step === step
        );
        return stepData ? stepData.stepDescription : '';
      }
    
      getNextStepDescription(step: string): string {
        const stepData = this.reservationStepsDescriptions.find(
          stepDesc => stepDesc.step === step
        );
        return stepData ? stepData.nextStepDescription : '';
      }
    
      getPreviousStepDescription(step: string): string {
        const stepData = this.reservationStepsDescriptions.find(
          stepDesc => stepDesc.step === step
        );
        return stepData ? stepData.previousStepDescription : '';
      }

      cancelReservationProcess(){
        this.SetEmptyReservationDataInLocalStorage();
        this.setReservationInProgress(false);
      }
  }


