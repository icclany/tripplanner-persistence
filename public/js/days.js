'use strict';
/* global $ */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

// NOTE: All of this is a function, that runs first, and returns this methods object stored as daysModule
// DOM Traversal is slow, so we want to MINIMIZE looking for elements/things repeatedly

var daysModule = (function() {

    // application state

    var days = [],
        currentDay;

    // jQuery selections

    var $addButton, $removeButton;
    $(function() {
        $addButton = $('#day-add');
        $removeButton = $('#day-title > button.remove');
    });

    // method used both internally and externally

    function switchTo(newCurrentDay) {
        currentDay.hide();
        currentDay = newCurrentDay;
        currentDay.show();
    }

    // jQuery event binding

    $(function() {
        $addButton.on('click', addDay);
        $removeButton.on('click', deleteCurrentDay);
    });

    function addDay() {
        // 1. Add a day obj to the front-end
        if (this && this.blur) this.blur(); // removes focus box from buttons
        var newDay = dayModule.create({ number: days.length + 1 }); // dayModule
        days.push(newDay);
        if (days.length === 1) {
            currentDay = newDay;
            switchTo(currentDay);
        }
        // 2. Add that day to the database
      dayModule.add(newDay);
    };

    function deleteCurrentDay() {
        // 1. Delete day from database
        console.log(currentDay);
        dayModule.delete(currentDay);

        // 2. Deleted the day from the front-end
        // prevent deleting last day
        if (days.length < 2 || !currentDay) return;
        // remove from the collection
        var index = days.indexOf(currentDay),
            previousDay = days.splice(index, 1)[0],
            newCurrent = days[index] || days[index - 1];
        // fix the remaining day numbers
        days.forEach(function(day, i) {
            day.setNumber(i + 1);
        });
        switchTo(newCurrent);
        previousDay.hideButton();



        // 2. Remove that day from the database
        // INSERT CODE HERE
    }

    // globally accessible module methods

    var methods = {
        // "Load" loads the page when the homepage is requested 
        load: function() {
          // Use AJAX to get a list of all days from the database
          $.get('/api/days', function(dbDays) {
            // For every day in the database...
            dbDays.forEach(function(dbDay) {
              // Create a new "day" object 
              var newDayObj = dayModule.create(dbDay);
              // Push the day object onto our "days" array
              days.push(newDayObj);
              // If there's only one day so far, set it as the current day...
               if (days.length === 1) {
                // ...1. Set the current day variable
                currentDay = newDayObj; 
                // ...2. Set its class to current day so it's highlighted
                newDayObj.show();
                }
                // Add the day's attractions
                
          });
        })
        },

        switchTo: switchTo,

        addToCurrent: function(attraction) {
            currentDay.addAttraction(attraction);
        },

        removeFromCurrent: function(attraction) {
            currentDay.removeAttraction(attraction);
        }

    };

    return methods;

}());