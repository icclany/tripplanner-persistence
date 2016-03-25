var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;
var Promise = require('bluebird');

// Get one specific day
router.get('/:num', function(req, res, next) {
	Day.findOne({number: req.body.num}).then(function(day) {
		res.send(day);
	}).then(null, next);
});

// Get list of all days
router.get('/', function(req, res, next) {
	Day.find({}).then(function(days) {
		res.send(days);
	}).then(null, next);
});

// Delete one day
router.delete('/:num', function(req, res, next) {

    Day.find().then(function(days) {
    	days.forEach(function(day) {
    		if (day.number == req.params.num) {
    			day.remove();
    		}
    		else if (day.number > req.params.num) {
    			day.number--;
    			day.save();
    		}
    	})
    })
    .then(null, next);

});

// Create a day
router.post('/', function(req, res, next) {
	res.send("got a post request!")
	console.log(req.body);
	Day.create(req.body).then(null, next);
});

// Add/remove attractions from a day (POST)
router.post('/:num/:type/:id', function(req, res, next) {

console.log("Hello?");
Promise.all([
    Hotel.findOne({_id: req.params.id}),
    Day.findOne({number: req.params.num})
  ])
  .spread(function(hotelAttr, day) {
   	day.hotel = hotelAttr;
   	day.save();
  });


});

module.exports = router;
