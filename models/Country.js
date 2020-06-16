const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
  id: String,
  locationId: String,
  name: String,
  latitude: Number,
  longitude: Number,
  currency: { id: String, name: String, symbole: String, euroRate: Number },
  weather: [{ note: Number, description: String }],
  cost: {
    low: Number,
    med: Number,
    high: Number,
  },
});

module.exports = mongoose.model('country', CountrySchema, 'countries');
