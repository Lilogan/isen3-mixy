const express = require('express');
const router = express.Router();
const filter = require('../middleware/countryFilter');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Mixy' });
});

/* POST home page */
router.post('/', (req, res, next) => {
  req.session.startDate = req.query.startDate;
  req.session.endDate = req.query.endDate;
  res.render('cities', { title: 'Destinations' });
});

module.exports = router;
