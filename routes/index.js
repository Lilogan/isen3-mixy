const express = require('express');
const router = express.Router();

const getHotelsList = require('../APIs/hotel/list');
const getAttractionsList = require('../APIs/attractions/attractionlist');
const getRestaurantsList = require('../APIs/restaurant/liste');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotels', async function (req, res) {
  const name = req.query.country;
  getHotelsList(name);
  res.send('Test');
});

router.get('/attractions', async function (req, res, next) {
  
  const attractions = await getAttractionsList(12.91285, 100.87808);
  res.json(attractions);
});

router.get('/restaurants', async function (req, res, next) {
  
  const restaurants = await getRestaurantsList('Metz');
  res.json(restaurants);
});

module.exports = router;
