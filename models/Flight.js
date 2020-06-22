const mongoose = require('mongoose');

const FlightSchema = mongoose.Schema({
  originCountry: String,
  destinationCountry: String,
  price: Number,
  direct: Boolean,
  outbound: {
    origin: { iata: String, city: String, name: String },
    date: String,
    destination: { iata: String, city: String, name: String },
    carrier: String,
  },
  inbound: {
    origin: { iata: String, city: String, name: String },
    data: String,
    destination: { iata: String, city: String, name: String },
    carrier: String,
  },
});

module.exports = mongoose.model('Flight', FlightSchema, 'flights');
