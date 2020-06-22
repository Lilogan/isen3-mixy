const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
  name: String,
  id: Number,
  description: String,
  country: String,
  coords: {
    latitude: Number,
    longitude: Number,
  },
  img: {
    width: Number,
    height: Number,
    url: String,
  },
});

module.exports = mongoose.model('City', CountrySchema, 'cities');
