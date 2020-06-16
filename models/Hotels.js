const mongoose = require('mongoose');

const HotelsSchema = mongoose.Schema({
    country : String,
    city : String,
    name : String,
    coord : {latitude : Number, longitude : Number},
    photo : String,
    rating : Number,
    price : String, // String parceque c'est un intervalle du type "$107-$170".
    hotelclass : String,
})

module.exports = mongoose.model('Hotel', HotelsSchema, 'hotels');