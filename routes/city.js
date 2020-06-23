const express = require('express');
const router = express.Router();
const infoTrip = require('../middleware/infoTrip');
const tripSummary = require('../middleware/tripSummary');
const test = require('../utils/test');
/* GET city page */

router.get('/:city', tripSummary, (req, res) => {
  res.render('test', { title: req.params.city, data: req.trip });
});

router.get('/:city/flight', infoTrip.flight, (req, res) => {
  res.render('flight', { title: req.params.city, flights: req.flights });
});

router.get('/:city/hotel', infoTrip.hotel, (req, res) => {
  res.render('hotel', { title: req.params.city, hotels: req.hotels });
});

router.get('/:city/restaurant', infoTrip.restaurant, (req, res) => {
  res.render('restaurant', { title: req.params.city, restaurants: req.restaurants });
});

router.get('/:city/weather', (req, res) => {
  res.render('weather', { title: req.params.city });
});

router.get('/:city/trad', (req, res) => {
  res.render('traduction', { title: req.params.city });
});

router.get('/:city/activity', infoTrip.activity, (req, res) => {
  res.render('activity', { title: req.params.city, activities: req.activities });
});

module.exports = router;
