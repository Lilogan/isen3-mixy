const Country = require('../models/Country');
const distance = require('../utils/distance');

const distanceControl = {
  days: 5,
  distance: 20000000,
};

function paramWeather(month) {
  return 'weather.' + (month - 1) + '.note';
}

async function filterCountry(duration) {
  const origin = await Country.find({ name: 'France' });
  const factor = Math.round(duration % distanceControl.days);
  console.log(factor);
  return distance.getDistanceByCoords(country1.coords, country2.coords);
}

module.exports = async (req, res, next) => {
  if (!req.session.data) next();

  const startDate = new Date(req.session.data.startDate);
  const endDate = new Date(req.session.data.endDate);
  const traveler = req.session.data.traveler;
  const budget = req.session.data.budget;
  const duration = (endDate - startDate) / (1000 * 3600 * 24);
  const origin = await Country.find({ name: 'France' });

  let query = new Object();
  for (let month = startDate.getMonth() - 1; month < endDate.getMonth(); month++) {
    query[paramWeather(month)] = 5;
  }

  let countries = await Country.find(query);
};
