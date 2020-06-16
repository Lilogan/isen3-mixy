const mongoose = require('mongoose')

const RestaurantsSchema = mongoose.Schema({
    name : String,
    latitude : Number,
    longitude : Number,
    price : Number,
    note : Number,
    category : String,
    photos : String,

});

module.exports = mongoose.model('Restaurant',RestaurantsSchema, 'restaurants');