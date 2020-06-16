const mongoose = require('mongoose')

const MeteoSchema = mongoose.Schema({
    country : String,
    city : String,
    coord : {latitude : Number, longitude : Number},
    weather : {main : String, description : String},
    temperature : Number,
});

module.exports = mongoose.model ('Meteo', MeteoSchema, 'meteos');