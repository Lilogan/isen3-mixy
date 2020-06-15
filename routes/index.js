const express = require('express');
const router = express.Router();
const filter = require('../middleware/countryFilter');
const axios = require('axios');
const { route } = require('../app');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/countries', filter, (req, res) => {
  const countries = req.countries;
  res.json(countries);
});

module.exports = router;
