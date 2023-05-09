const mongoose = require("mongoose");

const airplaneModelSchema = mongoose.Schema({
    airplane: {type: String, required: true},
    rows: { type: Number, required: true},
    seatsPerRow: { type: Number, required: true}
  });
  
  module.exports = mongoose.model("AirplaneModel", airplaneModelSchema);