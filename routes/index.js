var express = require('express');
var router = express.Router();
var models = require('../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Promise = require('bluebird');
var Day = models.Day;

router.get('/', function(req, res) {
  Promise.all([
    Hotel.find(),
    Restaurant.find(),
    Activity.find(),
    Day.find()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities, dbDays) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities,
      templateDays: dbDays
    });
  });
});

module.exports = router;
