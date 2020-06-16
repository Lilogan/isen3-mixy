var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/meteo', function (req, res, next) {
  res.render('meteo', { title: 'Méteo' });
});

module.exports = router;
