const Country = require('../models/Country');
const distance = require('../utils/distance');

// Middleware for filter compatible country
module.exports = async (req, res, next) => {
  const startDate = new Date(req.session.data.startDate);
  const endData = new Date(req.session.data.endDate);
}
