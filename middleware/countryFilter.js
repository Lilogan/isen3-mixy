const Country = require('../models/Country');
const getDistance = require('../utils/distance');

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
  const distance = getDistance(origin, country.coords);
  if (duration > limit.over) return true;
  if (distance <= limit.distance * factor) return true;
  return false;
}

function filterByBudget(country, budget, duration, traveler) {
  let averageCost = 0;
  for (const key in limit.partCost) {
    averageCost += country.cost[key] * limit.partCost[key];
  }
  console.log(budget * limit.budgetCost);
  console.log(averageCost * traveler * duration);

  if (budget * limit.budgetCost >= averageCost * traveler * duration) return true;
  return false;
}

module.exports = async (req, res, next) => {
  if (!req.session.data) next();

  const startDate = new Date(req.session.data.startDate);
  const endDate = new Date(req.session.data.endDate);
  const traveler = req.session.data.traveler;
  const budget = req.session.data.budget;
  const duration = (endDate - startDate) / (1000 * 3600 * 24);

  let query = { cost: { $exists: true } };
  for (let month = startDate.getMonth() - 1; month < endDate.getMonth(); month++) {
    $or: {
      (query[paramWeather(month)] = 5), (query[paramWeather(month)] = 4);
    }
  }

  let countries = await Country.find(query);
  countries = countries.filter((country) => filterByDistance(country, duration));
  countries = countries.filter((country) => filterByBudget(country, budget, duration, traveler));
  

  next();
};
