var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/meteo', function (req, res, next) {
  res.render('meteo', { title: 'Méteo' });
});

router.get('/hotel', function (req, res, next) {
  res.render('hotel', { title: 'Hotel' });
});

router.get('/vol', function (req, res, next) {
  res.render('vol', { title: 'Vol' });
});

router.get('/restaurant', function (req, res, next) {
  res.render('restaurant', { title: 'Restaurant' });
});

router.get('/bus', function (req, res, next) {
  res.render('bus', { title: 'BUS' });
});

router.get('/metro', function (req, res, next) {
  res.render('metro', { title: 'METRO' });
});

router.get('/taxi', function (req, res, next) {
  res.render('taxi', { title: 'TAXI' });
});


module.exports = router;
