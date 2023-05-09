import { Component, HostListener } from '@angular/core';
import { ReservationsService } from './services/reservations.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'projekt_wsb_merito';
  
  constructor(private reservationsService: ReservationsService) {}

  ngOnInit() {
  this.reservationsService.getReservations();
  this.reservationsService.getReservationUpdateListener().subscribe(reservations => {
    this.reservationsService.saveAllReservationsToLocalStorage(reservations);
  });
}

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event: any) {
    localStorage.removeItem('reservations');
  }
}
