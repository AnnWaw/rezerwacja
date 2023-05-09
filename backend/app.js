const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const TicketReservation = require("./models/ticket-reservation");
const Airports = require("./models/airports");
const Flight = require("./models/flight");
const AirplaneModel = require("./models/airplane-model");

const app = express();

mongoose
  .connect(
    "mongodb+srv://Ania:x86r63SMbIjn7inj@cluster0.wp9b3mj.mongodb.net/wsb-merito"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  next();
});

app.post("/reservation", (req, res, next) => {
  const reservation = new TicketReservation({
    reservationNumber: req.body.reservationNumber,
    passengerFirstName: req.body.passengerFirstName,
    passengerLastName: req.body.passengerLastName,
    passportNumber: req.body.passportNumber,
    flightNumber: req.body.flightNumber,
    arrivalAirportCode: req.body.arrivalAirportCode,
    departureAirportCode: req.body.departureAirportCode,
    flightStartDate: req.body.flightStartDate,
    seatNumber: req.body.seatNumber,
  });
  reservation.save();
  res.status(200).json({
    message: "Reservation added successfully",
  });
});

app.post("/flight/:dep/:arr", (req, res, next) => {
  const dep = req.params.dep;
  const arr = req.params.arr;
  const date = new Date(req.body.date);

  Flight.find()
    .then((documents) => {
      const flights = documents.map((flight) => {
        const updatedFlight = flight.toObject();

        const flightStartTime = updatedFlight.flightStartDate;
        updatedFlight.flightStartDate = new Date(date);
        updatedFlight.flightStartDate.setHours(
          flightStartTime.getHours(),
          flightStartTime.getMinutes()
        );
        return updatedFlight;
      });

      res.status(200).json({
        message: "Success",
        flights: flights,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Error occurred",
        error: error,
      });
    });
});

app.get("/reservations", (req, res, next) => {
  TicketReservation.find().then((documents) => {
    res.status(200).json({
      message: "Success",
      reservations: documents,
    });
  });
});

app.get("/airports", (req, res, next) => {
  Airports.find().then((documents) => {
    res.status(200).json({
      message: "Success",
      airports: documents,
    });
  });
});

app.get("/airplane/:type", (req, res, next) => {
  const airplaneType = req.params.type;

  AirplaneModel.findOne({ airplane: airplaneType }).then((airplane) => {
    if (!airplane) {
      return res.status(404).json({
        message: "Airplane not found",
      });
    }

    const rows = airplane.rows;
    const seatsPerRow = airplane.seatsPerRow;

    res.status(200).json({
      message: "Success",
      data: [rows, seatsPerRow],
    });
  });
});

module.exports = app;
