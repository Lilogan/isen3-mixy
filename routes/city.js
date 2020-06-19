const express = require('express');
const router = express.Router();

/* GET city page */
router.get('/:city', (req, res, next) => {
  console.log(req.params.city);
  res.render('city', { title: req.params.city });
});

module.exports = router;
