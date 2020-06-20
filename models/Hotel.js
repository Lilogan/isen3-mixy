const mongoose = require('mongoose');

const HotelsSchema = mongoose.Schema({
    name : String,
    description: String,
    position : {latitude : Number, longitude : Number},
    address: {
        country: String,
        postcode: Number,
        state: String,
        city: String,
        street: String,
    },
    rating: Number,
    price : String, // String parceque c'est un intervalle du type "$107-$170".
    hotelclass : String,
    phone: String,
})

module.exports = mongoose.model('Hotel', HotelsSchema, 'hotels');