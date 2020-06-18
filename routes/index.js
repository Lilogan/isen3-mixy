var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('acceuil', { title: 'Express' });
});

router.get('/index', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/meteo', function (req, res, next) {
  res.render('meteo', { title: 'Méteo' });
});

router.get('/hotel', function (req, res, next) {
  res.render('hotel', { title: 'Hotel' });
});

router.get('/concert', function (req, res, next) {
  res.render('concert', { title: 'Concerts' });
});

router.get('/spectacle', function (req, res, next) {
  res.render('spectacle', { title: 'Spectacles' });
});

router.get('/accrobranche', function (req, res, next) {
  res.render('accrobranche', { title: 'Accrobranche' });
});

router.get('/golf', function (req, res, next) {
  res.render('golf', { title: 'Golf' });
});

router.get('/vol', function (req, res, next) {
  res.render('vol', { title: 'Vol' });
});

router.get('/restaurant', function (req, res, next) {
  res.render('restaurant', { title: 'Restaurant' });
});

router.get('/transport', function (req, res, next) {
  res.render('transport', { title: 'Transport' });
});

router.get('/phrase', function (req, res, next) {
  res.render('phrase', { title: 'Phrases Type' });
});

router.get('/activite', function (req, res, next) {
  res.render('activite', { title: 'Activitées disponibles' });
});

module.exports = router;
