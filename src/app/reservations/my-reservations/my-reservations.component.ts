import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TicketReservation } from '../../models/ticket-reservation';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit, OnDestroy {
  
  reservations: TicketReservation[] = [];
  private reservationSubscription!: Subscription;

  constructor(
    public reservationsService: ReservationsService
  ) {}

  ngOnInit() {
    this.reservations = this.reservationsService.getReservationsFromLocalStorage()
    .sort((a, b) =>
      new Date(b.flightStartDate).getTime() -
      new Date(a.flightStartDate).getTime()
    );
    this.reservationSubscription = this.reservationsService.getReservationUpdateListener()
      .subscribe((reservations: TicketReservation[]) => {
        this.reservations = reservations.sort((a, b) =>
          new Date(b.flightStartDate).getTime() -
          new Date(a.flightStartDate).getTime()
        );
      });
  }

  ngOnDestroy() {
    this.reservationSubscription.unsubscribe();
  }
}
