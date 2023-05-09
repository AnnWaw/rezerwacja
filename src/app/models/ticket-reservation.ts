export interface TicketReservation {
  reservationNumber: string;
  passengerFirstName: string;
  passengerLastName: string;
  passportNumber: string;
  flightNumber: string;
  arrivalAirportCode: string;
  departureAirportCode: string;
  flightStartDate: Date;
  seatNumber: [number, string];
}