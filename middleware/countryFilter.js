const Country = require('../models/Country');
const tripData = require('../utils/tripData');
const calcul = require('../utils/calcul');

const origin = { latitude: 48.866667, longitude: 2.333333 };
const limit = {
  days: 5,
  distance: 2500000,
  over: 15,
  budgetCost: 50 / 100,
  partCost: { low: 0.2, med: 0.7, high: 0.1 },
};

function paramWeather(month) {
  return 'weather.' + (month - 1) + '.note';
}

function filterByDistance(country, duration) {
  const factor = Math.round(duration / limit.days);
  const distance = calcul.getDistanceByCoords(origin, country.coords);
  if (duration > limit.over) return true;
  if (distance <= limit.distance * factor) return true;
  return false;
}

function filterByBudget(country, budget, duration, traveler, filter = true) {
  let averageCost = 0;
  for (const key in limit.partCost) {
    averageCost += country.cost[key] * limit.partCost[key];
  }
  if (!filter) return averageCost * traveler * duration;
  if (budget * limit.budgetCost >= averageCost * traveler * duration) return true;
  return false;
}

module.exports = async (req, res, next) => {
  if (req.session.data) {
    const startDate = new Date(req.session.data.startDate);
    const endDate = new Date(req.session.data.endDate);
    const traveler = req.session.data.traveler;
    const budget = req.session.data.budget;
    const duration = (endDate - startDate) / (1000 * 3600 * 24);

    req.cities = {
      dates: {
        start: req.session.data.startDate,
        end: req.session.data.endDate,
      },
      passenger: traveler,
      destinations: new Array(),
    };

    let query = { cost: { $exists: true } };
    for (let month = startDate.getMonth() - 1; month < endDate.getMonth(); month++) {
      $or: {
        (query[paramWeather(month)] = 5), (query[paramWeather(month)] = 4);
      }
    }

    let countries = await Country.find(query);
    countries = countries.filter((country) => filterByDistance(country, duration));
    countries = countries.filter((country) => filterByBudget(country, budget, duration, traveler));

    let cities = new Array();
    for (const country of countries) {
      const flights = await tripData.getFlightsByCountry(
        country.name,
        req.session.data.startDate,
        req.session.data.endDate
      );
      flightsPrice = new Object();
      for (const flight of flights) {
        if (!flightsPrice[flight.outbound.destination.city]) {
          flightsPrice[flight.outbound.destination.city] = new Array();
        }
        flightsPrice[flight.outbound.destination.city].push(flight.price);
      }
      for (const city in flightsPrice) {
        const average = calcul.arrayAverage(flightsPrice[city]);
        const totalCost = average * traveler + filterByBudget(country, budget, duration, traveler, false);
        if (totalCost < budget) {
          const img = await tripData.getCity(city).img
          const destination = {
            name: city,
            weather: country.weather[startDate.getMonth()],
            image: img,
            averagePrice: Math.round(totalCost),
          };
          req.cities.destinations.push(destination);
        }
      }
    }
  }
  next();
};
