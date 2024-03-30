// Initialize Leaflet map
var map = L.map('map').setView([-37.8136, 144.9631], 10); // Melbourne, Victoria coordinates, adjusted zoom level

// Add tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Draw a rectangle to outline the Melbourne Monash area
var bounds = [
    [-37.9692, 145.1246], // Southwest coordinates (Monash area)
    [-37.8594, 145.1937]  // Northeast coordinates (Monash area)
];

L.rectangle(bounds, {color: "#ff7800", weight: 1}).addTo(map);

// Event listener for when the 'Migrant Suburb Locator' tab is clicked
document.getElementById('migrant-suburb-locator').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent default link behavior

  // Display a prompt to select a country
  var selectedCountry = prompt("Please enter the name of the desired country:");
  if (selectedCountry) {
    // Perform an AJAX request to fetch suburb data for the selected country
    // Replace the below code with actual data fetching mechanism
    // For demonstration purposes, assuming the data is hardcoded here
    var suburbData = {
      "Australia": [{ "suburb": "Melbourne", "lat": -37.8136, "lng": 144.9631 }],
      "Country2": [{ "suburb": "Suburb2", "lat": -35.2809, "lng": 149.1300 }],
      // Add data for other countries similarly
    };

    // Clear existing markers from the map
    map.eachLayer(function(layer) {
      if (layer instanceof L.Marker) {
        map.removeLayer(layer);
      }
    });

    // Add markers for the selected country's suburbs
    if (suburbData[selectedCountry]) {
      suburbData[selectedCountry].forEach(function(suburb) {
        L.marker([suburb.lat, suburb.lng]).addTo(map)
          .bindPopup(suburb.suburb)
          .openPopup();
      });
    } else {
      alert("No data available for the selected country.");
    }
  }
});
