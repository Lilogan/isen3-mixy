const mongoose = require('mongoose')

const RestaurantsSchema = mongoose.Schema({
    name : String,
    address: {
        country: String,
        postcode: Number,
        state: String,
        city: String,
        street: String,
    },
    position: {latitude : Number, longitude : Number},
    price : String,
    rating : Number,
    category : String,
    img : {
        width: Number,
        height: Number,
        url: String,
    }

});

module.exports = mongoose.model('Restaurant',RestaurantsSchema, 'restaurants');