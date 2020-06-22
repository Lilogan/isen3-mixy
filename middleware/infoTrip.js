const { request } = require('express');

const tripData = require('../utils/tripData');

async function activity(req, res, next) {
  req.activities = await tripData.getActivities(req.params.city);
  next();
}

async function hotel(req, res, next) {
  req.hotels = await tripData.getHotels(req.params.city);
  next();
}

async function restaurant(req, res, next) {
  req.restaurants = await tripData.getRestaurants(req.params.city);
  next();
}

module.exports = { activity, hotel, restaurant };
