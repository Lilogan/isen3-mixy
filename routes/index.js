const express = require('express');
const router = express.Router();
const filter = require('../middleware/countryFilter');

/* GET home page */
router.get('/', filter, (req, res, next) => {
  if (!req.session.data) res.render('index', { title: 'Mixy' });
  else res.render('index', { title: 'Destinations' });
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
