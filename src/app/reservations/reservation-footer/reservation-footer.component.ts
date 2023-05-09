import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ReservationsService } from '../../services/reservations.service';

@Component({
  selector: 'app-reservation-footer',
  templateUrl: './reservation-footer.component.html',
  styleUrls: ['./reservation-footer.component.css']
})
export class ReservationFooterComponent {
  @Input() previousStep!: string;
  @Input() previousLink!: string;

  constructor(private reservationsService: ReservationsService, private router: Router) { }

  cancelReservationProcess() {
    this.reservationsService.cancelReservationProcess();
    this.router.navigate(['/my-reservations']);
  }
}