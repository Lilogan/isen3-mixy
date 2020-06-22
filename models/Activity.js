const mongoose = require('mongoose');

const ActivitySchema = mongoose.Schema({
  name: String,
  position: { latitude: Number, longitude: Number },
  category: String,
  address: {
    country: String,
    postcode: Number,
    state: String,
    city: String,
    street: String,
  },
  img: {
    width: Number,
    height: Number,
    url: String,
  },
});

module.exports = mongoose.model('Activity', ActivitySchema, 'activities');
