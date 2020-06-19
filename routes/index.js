var express = require('express');
var router = express.Router();

const test = require('../utils/test');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('acceuil', { title: 'Mixy' });
});

router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Menu', data: test.forTrip });
});

router.get('/index/meteo', function (req, res, next) {
  res.render('meteo', { title: 'Méteo' });
});

router.get('/index/hotel', function (req, res, next) {
  res.render('hotel', { title: 'Hotel' });
});

router.get('/index/concert', function (req, res, next) {
  res.render('concert', { title: 'Concerts' });
});

router.get('/index/spectacle', function (req, res, next) {
  res.render('spectacle', { title: 'Spectacles' });
});

router.get('/index/accrobranche', function (req, res, next) {
  res.render('accrobranche', { title: 'Accrobranche' });
});

router.get('/index/golf', function (req, res, next) {
  res.render('golf', { title: 'Golf' });
});

router.get('/index/vol', function (req, res, next) {
  res.render('vol', { title: 'Vol' });
});

router.get('/index/restaurant', function (req, res, next) {
  res.render('restaurant', { title: 'Restaurant' });
});

router.get('/index/transport', function (req, res, next) {
  res.render('transport', { title: 'Transport' });
});

router.get('/index/phrase', function (req, res, next) {
  res.render('phrase', { title: 'Phrases Type' });
});

router.get('/index/activite', function (req, res, next) {
  res.render('activite', { title: 'Activitées disponibles' });
});

module.exports = router;
