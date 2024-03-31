document.addEventListener("DOMContentLoaded", function () {
  // Create map
  var map = L.map("map").setView([-37.88, 145.12], 13); // Centered on the GeoJSON data

  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Fetch GeoJSON data for point features
  fetch('point.geojson')
    .then(response => response.json())
    .then(data => {
      // Create an array to store markers
      var markerArray = [];

      // Add markers to the array
      data.features.forEach(function (feature) {
        var coordinates = feature.geometry.coordinates.reverse(); // Reversed for Leaflet
        var marker = L.marker(coordinates); // Create marker
        marker.bindPopup(feature.properties.popupText); // Bind popup with feature properties
        marker.on('click', function () { // Add click event listener to marker
          marker.openPopup(); // Open popup when marker is clicked
        });
        markerArray.push(marker); // Add marker to the array
      });

      // Create a marker cluster group and add all markers to it
      var markers = L.markerClusterGroup();
      markers.addLayers(markerArray);

      // Add marker cluster group to the map
      map.addLayer(markers);
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });

  // Fetch GeoJSON data for boundary features
  fetch('boundary.geojson')
    .then(response => response.json())
    .then(data => {
      // Add GeoJSON polygons to map for boundary features (suburbs)
      L.geoJSON(data, {
        style: function (feature) {
          return {
            color: "#3388ff", // Border color
            weight: 2, // Border width
            fillOpacity: 0.1, // Fill opacity
            fillColor: "#3388ff" // Fill color
          };
        },
        onEachFeature: function (feature, layer) {
          if (feature.properties && feature.properties.popupText) {
            layer.bindPopup(feature.properties.popupText); // Bind popup with feature properties
          }
        }
      }).addTo(map);
    })
    .catch(error => {
      console.error('Error loading GeoJSON data:', error);
    });
});
