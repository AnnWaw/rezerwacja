import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlightSearchComponent } from './reservations/flight-search/flight-search.component';
import { FlightListComponent } from './reservations/flight-list/flight-list.component';
import { SeatSelectionComponent } from './reservations/seat-selection/seat-selection.component';
import { PassengerDataComponent } from './reservations/passenger-data/passenger-data.component';
import { SummaryComponent } from './reservations/summary/summary.component';
import { MyReservationsComponent } from './reservations/my-reservations/my-reservations.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: FlightSearchComponent },
  { path: 'search', component: FlightSearchComponent },
  { path: 'flights', component: FlightListComponent },
  { path: 'seats', component: SeatSelectionComponent },
  { path: 'passenger', component: PassengerDataComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'my-reservations', component: MyReservationsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
