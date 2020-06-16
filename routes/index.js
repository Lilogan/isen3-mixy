const express = require('express');
const router = express.Router();

const getHotelsList = require('../APIs/hotel/list');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/hotels', async function (req, res) {
  const list = await getHotelsList(293919, 1, '2020-06-16', 2);
  res.json(list);
});

module.exports = router;
