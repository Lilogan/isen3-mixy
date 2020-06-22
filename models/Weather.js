const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
  country: String,
  city: String,
  posititon: { latitude: Number, longitude: Number },
  datetime: String,
  weather: String,
  temperature: {
    min_temperature: Number,
    max_temperature: Number,
  },
});

module.exports = mongoose.model('Weather', WeatherSchema, 'weathers');
