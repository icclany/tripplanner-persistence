var express = require('express');
var router = express.Router();
var models = require('../../models');
var Hotel = models.Hotel;
var Restaurant = models.Restaurant;
var Activity = models.Activity;
var Day = models.Day;

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
	Day.findOne({number: req.params.num}).then(function(day) {
		day.remove();
		res.end();
	}).then(null, next);
});

// Create a day
router.post('/', function(req, res, next) {
	console.log("got a post request")
	Day.create(req.body).then(null, next);
});

// Add/remove attractions from a day (POST)
router.post('/:num/:attraction', function(req, res, next) {
	var type = req.body.attraction;

	// Get the day 
	Day.findOne({number: req.body.num}).then(function(day) {
		day[type].push(req.body);	
	}).save().then(null, next);
});

module.exports = router;

// $.get('/api/days', function (days) {
//   days.forEach(function(day){
//     console.log(day);
//   });
// })
// .fail( console.error.bind(console) );