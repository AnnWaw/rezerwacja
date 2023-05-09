export interface ReservationData {
    reservationNumber: string;
    passengerFirstName: string;
    passengerLastName: string;
    passportNumber: string;
    flightNumber: string;
    arrivalAirportCode: string;
    departureAirportCode: string;
    arrivalAirportName: string;
    departureAirportName: string;
    flightStartDate: Date;
    airplaneModel: string;
    seatNumber: [number, string];
  }