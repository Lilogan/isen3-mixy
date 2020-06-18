const mongoose = require('mongoose') ;

const AttractionSchema = mongoose.Schema ({
    name : String,
    position : {latitude : Number, longitude : Number},
    location_string : String,
    rating : Number,
    closed : Boolean,
    ranking : String,
    web_url : String,
})

module.exports = mongoose.model('Attraction', AttractionSchema, 'attractions');