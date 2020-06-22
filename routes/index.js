const express = require('express');
const router = express.Router();
const filter = require('../middleware/countryFilter');
const test = require('../utils/test');

/* GET home page */
router.get('/', filter, (req, res) => {
  if (!req.session.data) res.render('index', { title: 'Mixy' });
  else res.render('cities', { title: 'Destinations', data: test.forList });
});

/* POST home page */
router.post(
  '/',
  (req, res, next) => {
    req.session.data = {
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      traveler: req.body.traveler,
      budget: req.body.budget,
    };
    next();
  },
  filter,
  (req, res) => {
    res.render('cities', { title: 'Destinations' });
  }
);

module.exports = router;
