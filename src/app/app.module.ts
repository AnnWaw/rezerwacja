import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { ReservationHeaderComponent } from './reservations/reservation-header/reservation-header.component';
import { ReservationFooterComponent } from './reservations/reservation-footer/reservation-footer.component';
import { FlightSearchComponent } from './reservations/flight-search/flight-search.component';
import { FlightListComponent } from './reservations/flight-list/flight-list.component';
import { SeatSelectionComponent } from './reservations/seat-selection/seat-selection.component';
import { PassengerDataComponent } from './reservations/passenger-data/passenger-data.component';
import { SummaryComponent } from './reservations/summary/summary.component';
import { MyReservationsComponent } from './reservations/my-reservations/my-reservations.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter } from '@angular/material/core';

registerLocaleData(localePl, 'pl');

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReservationHeaderComponent,
    ReservationFooterComponent,
    FlightSearchComponent,
    FlightListComponent,
    SeatSelectionComponent,
    PassengerDataComponent,
    SummaryComponent,
    MyReservationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    HttpClientModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pl-PL' },
    { provide: LOCALE_ID, useValue: 'pl-PL' },
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: { display: { dateInput: 'DD/MM/YYYY' } } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
