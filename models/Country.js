const mongoose = require('mongoose');

const CountrySchema = mongoose.Schema({
  id: String,
  name: String,
  coords: {latitude: Number, longitude: Number},
  currency: { id: String, name: String, symbole: String, euroRate: Number },
  weather: [{ note: Number, description: String }],
  cost: {
    low: Number,
    med: Number,
    high: Number,
  },
});

module.exports = mongoose.model('Country', CountrySchema, 'countries');
