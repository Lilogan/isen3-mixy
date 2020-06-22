const Country = require('../models/Country');
const distance = require('../utils/distance');

// Middleware for filter compatible country
module.exports = async (req, res, next) => {
  try {
    var query = 'weather.' + req.query.month + '.note';
    const fr = await Country.findOne({ name: 'France' });
    const countries = await Country.find({ [query]: 5 });
    const coordsFr = { latitude: fr.latitude, longitude: fr.longitude };
    const coordsOther = { latitude: countries[0].latitude, longitude: countries[0].longitude };
    console.log(distance.getDistanceByCoords(coordsFr, coordsOther));
    console.log(countries[0]);
    req.countries = countries;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Error in filter' });
  }
};
