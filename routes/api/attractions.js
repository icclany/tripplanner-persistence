var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;

// Get all hotels
router.get('/hotels', function(req, res) {
	Hotel.find({}).then(function(hotels) {
		res.send(hotels);
	});
});

// Get all restaurants
router.get('/restaurants', function(req, res) {
	Restaurant.find({}).then(function(restaurants) {
		res.send(restaurants);
	});
})

// Get all activities
router.get('/activities', function(req, res) {
	Activity.find({}).then(function(activities) {
		res.send(activities);
	});
})


module.exports = router;


