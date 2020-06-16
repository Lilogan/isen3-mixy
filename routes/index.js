const express = require('express');
const router = express.Router();

const getHotelsList = require('../APIs/hotel/list');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotels', async function (req, res) {
  const name = req.query.country;
  getHotelsList(name);
  res.send("Test");
});

module.exports = router;
