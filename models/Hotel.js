const mongoose = require('mongoose');

const HotelsSchema = mongoose.Schema({
  name: String,
  description: String,
  position: { latitude: Number, longitude: Number },
  address: {
    country: String,
    postcode: String,
    state: String,
    city: String,
    street: String,
  },
  rating: Number,
  price: String,
  hotelClass: String,
  phone: String,
});

module.exports = mongoose.model('Hotel', HotelsSchema, 'hotels');
