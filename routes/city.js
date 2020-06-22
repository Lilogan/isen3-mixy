const express = require('express');
const router = express.Router();
const test = require('../utils/test');

/* GET city page */

router.get('/:city', (req, res, next) => {
  res.render('city', { title: req.params.city, data: test.forTrip });
});

router.get('/:city/flight', (req, res, next) => {
  res.render('flight', { title: req.params.city });
});

router.get('/:city/hotel', (req, res, next) => {
  res.render('hotel', { title: req.params.city });
});

router.get('/:city/restaurant', (req, res, next) => {
  res.render('restaurant', { title: req.params.city });
});

router.get('/:city/meteo', (req, res, next) => {
  res.render('meteo', { title: req.params.city });
});

router.get('/:city/phrase', (req, res, next) => {
  res.render('phrase', { title: req.params.city });
});

router.get('/:city/restaurant', (req, res, next) => {
  res.render('restaurant', { title: req.params.city });
});


router.get('/:city/transport', (req, res, next) => {
  res.render('transport', { title: req.params.city });
});

module.exports = router;
