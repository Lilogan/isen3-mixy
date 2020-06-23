const tripData = require('../utils/tripData');
const Country = require('../models/Country');
const calcul = require('../utils/calcul');

module.exports = async (req, res, next) => {
  const city = await tripData.getCity(req.params.city);
  const country = await Country.findOne({ name: city.country });
  const flights = await tripData.getFlightsByCity(city.name, req.session.data.startDate, req.session.data.endDate);
  const restaurants = await tripData.getRestaurants(city.name);
  const hotels = await tripData.getHotels(city.name);

  const date = new Date(req.session.data.startDate);

  const trip = {
    name: city.name,
    weather: country.weather[date.getMonth()],
    date: {
      start: req.session.data.startDate,
      end: req.session.data.endDate,
    },
    passenger: req.session.data.traveler,
    flight: {
      quantity: flights.length,
      averagePrice: calcul.priceAverage(flights),
    },
    hotel: {
      quantity: hotels.length,
      averagePrice: calcul.priceAverage(hotels),
    },
    currency: country.currency,
  };

  req.trip = trip;

  next();
};
