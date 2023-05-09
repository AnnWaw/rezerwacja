const mongoose = require("mongoose");

const flightSchema = mongoose.Schema({
    number: { type: String, required: true },
    carrier: { type: String, required: true },
    airplaneModel: {
      type: String,
      enum: ["Boeing 737", "Airbus A320", "Embraer E190"],
      required: true,
    },
    flightStartDate: { type: Date },
  });
  
  module.exports = mongoose.model("Flight", flightSchema);