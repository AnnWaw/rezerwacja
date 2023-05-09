const mongoose = require("mongoose");

const tickerReservationSchema = mongoose.Schema({
  reservationNumber: { type: String, required: true },
  passengerFirstName: { type: String, required: true },
  passengerLastName: { type: String, required: true },
  passportNumber: { type: String, required: true },
  flightNumber: { type: String, required: true },
  arrivalAirportCode: { type: String, required: true },
  departureAirportCode: { type: String, required: true },
  flightStartDate: { type: Date, required: true },
  seatNumber: { type: mongoose.Schema.Types.Mixed, required: true }
});

module.exports = mongoose.model("TicketReservation", tickerReservationSchema);