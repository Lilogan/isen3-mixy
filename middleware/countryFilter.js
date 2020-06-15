const Country = require('../models/Country');

// Middleware for filter compatible country
module.exports = async (req, res, next) => {
  try {
    var query = 'weather.' + req.query.month + '.note';
    const countries = await Country.find({ [query]: 5 });
    req.countries = countries;
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: 'Error in filter' });
  }
};
