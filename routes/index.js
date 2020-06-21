const express = require('express');
const router = express.Router();

const getHotelsList = require('../APIs/hotel/list');
const getAttractionsList = require('../APIs/attractions/attractionlist');
const getRestaurantsList = require('../APIs/restaurant/liste');
const getMeteo = require('../APIs/meteo/meteo');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotels', async function (req, res, next) {
  const hotels = await getHotelsList('Bordeaux',2,'2020-06-21',2);
  res.json(hotels);
});

router.get('/attractions', async function (req, res, next) {
  
  const attractions = await getAttractionsList('Bordeaux');
  res.json(attractions);
});

router.get('/restaurants', async function (req, res, next) {
  
  const restaurants = await getRestaurantsList('Lille');
  res.json(restaurants);
});

router.get('/meteos', async function (req, res, next) {
  
  const meteos = await getMeteo("Nice");
  res.json(meteos);
});

module.exports = router;
