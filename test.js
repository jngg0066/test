// Initialize map
var map = L.map('map').setView([48.8566, 2.3522], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define custom cluster icon
function createClusterCustomIcon(cluster) {
  return L.divIcon({
    html: '<span class="cluster-icon">' + cluster.getChildCount() + '</span>',
    className: 'custom-marker-cluster',
    iconSize: L.point(33, 33, true)
  });
}

// Define markers data
var markers = [
  {
    geocode: [48.86, 2.3522],
    popUp: 'Hello, I am pop up 1'
  },
  {
    geocode: [48.85, 2.3522],
    popUp: 'Hello, I am pop up 2'
  },
  {
    geocode: [48.855, 2.34],
    popUp: 'Hello, I am pop up 3'
  }
];

// Add marker cluster group
var markerCluster = L.markerClusterGroup({
  chunkedLoading: true,
  iconCreateFunction: createClusterCustomIcon
});

// Add markers to cluster group
markers.forEach(function(marker) {
  var markerElement = L.marker(marker.geocode);
  markerElement.bindPopup(marker.popUp);
  markerCluster.addLayer(markerElement);
});

// Add marker cluster group to map
map.addLayer(markerCluster);
