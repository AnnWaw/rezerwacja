const mongoose = require("mongoose");

const airportSchema = mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Airports", airportSchema);