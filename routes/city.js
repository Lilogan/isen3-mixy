const express = require('express');
const router = express.Router();
const infoTrip = require('../middleware/infoTrip');
const test = require('../utils/test');
/* GET city page */

router.get('/:city', (req, res) => {
  res.render('test', { title: req.params.city, data: test.forTrip });
});

router.get('/:city/flight', (req, res) => {
  res.render('flight', { title: req.params.city });
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

router.get('/:city/traduction', (req, res) => {
  res.render('traduction', { title: req.params.city });
});

router.get('/:city/activity', infoTrip.activity, (req, res) => {
  res.render('activity', { title: req.params.city , activities : req.activities});
});

router.get('/:city/transport', (req, res, next) => {
  res.render('transport', { title: req.params.city });
});

module.exports = router;
