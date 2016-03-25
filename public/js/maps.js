'use strict';
/* global google */

var mapModule = (function () {

  var currentMap,
      currentMarkers = [],
      currentBounds = new google.maps.LatLngBounds(),
      fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  // build and attach when document is ready
  // NOTE: $(function..) is shorthand for document.ready
  $(function initializeMap (){
    var mapCanvas = document.getElementById('map-canvas');
    var options = {
      center: fullstackAcademy,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styleArr
    };
    currentMap = new google.maps.Map(mapCanvas, options);
  });

  // private module functions

  function extendBounds (marker) {
    currentBounds.extend(marker.position);
    currentMap.fitBounds(currentBounds);
  }

  function narrowBounds () {
    // rebuild bounds from scratch
    currentBounds = new google.maps.LatLngBounds();
    currentMarkers.forEach(function (marker) {
      currentBounds.extend(marker.position);
    });
    // re-scale the map
    if (currentMarkers.length) {
      currentMap.fitBounds(currentBounds);
    } else {
      currentMap.setOptions({
        zoom: 13,
        center: fullstackAcademy
      });
    }
  }

  // ICONS -------------------------------
var hIcon = {
    url: 'http://findicons.com/files/icons/2016/vista_style_objects/256/hotel.png', // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
};

var rIcon = {
    url: 'http://proprofs-cdn.s3.amazonaws.com/images/games/user_images/misc/5211927825.png', // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
};

var aIcon = {
    url: 'https://cdn0.iconfinder.com/data/icons/summer-2/512/Summer_512px-14.png', // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
};
// -----------------------------------------

  // globally accessible module methods

  var methods = {

    // mixing concerns here, but the attractions module was getting big
    buildAttractionMarker: function (attraction) {
      var iconPath = {
        hotel: hIcon,
        restaurant: rIcon,
        activity: aIcon
      };
      var coords = attraction.place.location;
      var options = {
        icon: iconPath[attraction.type],
        position: new google.maps.LatLng(coords[0], coords[1]),
        animation: google.maps.Animation.DROP
      };
      return new google.maps.Marker(options);
    },

    draw: function (marker) {
      marker.setAnimation(google.maps.Animation.DROP);
      marker.setMap(currentMap);
      currentMarkers.push(marker);
      extendBounds(marker);
      return marker;
    },

    hide: function (marker) {
      marker.setMap(null);
      currentMarkers.splice(currentMarkers.indexOf(marker), 1);
      narrowBounds();
      return marker;
    }

  };

  return methods;

}());



// styles

var styleArr = [{
    "featureType": "all",
    "elementType": "all",
    "stylers": [{ "invert_lightness": true },
        { "saturation": 20 },
        { "lightness": 30 },
        { "gamma": 0.5 },
        { "hue": "#435158" }
    ]
}]

// var styleArr = [{
//   featureType: 'landscape',
//   stylers: [{ saturation: -100 }, { lightness: 60 }]
// }, {
//   featureType: 'road.local',
//   stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
// }, {
//   featureType: 'transit',
//   stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
// }, {
//   featureType: 'administrative.province',
//   stylers: [{ visibility: 'off' }]
// }, {
//   featureType: 'water',
//   stylers: [{ visibility: 'on' }, { lightness: 30 }]
// }, {
//   featureType: 'road.highway',
//   elementType: 'geometry.fill',
//   stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
// }, {
//   featureType: 'road.highway',
//   elementType: 'geometry.stroke',
//   stylers: [{ visibility: 'off' }]
// }, {
//   featureType: 'poi.park',
//   elementType: 'geometry.fill',
//   stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
// }];
