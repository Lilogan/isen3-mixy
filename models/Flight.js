const mongoose = require('mongoose')

const FlightsSchema = mongoose.Schema({
    date : String,
    DepartureCountry : String,
    DestinationCountry : String,
    DepartureTime : String,
    ArrivalTime : String,
    TimeFlightinMinutes : Number,
    companyname : String,
    Cost : Number,
});

module.exports = mongoose.model('Flight',FlightsSchema, 'flights');