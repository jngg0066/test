document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([-37.8136, 144.9631], 10);
    var markers = L.markerClusterGroup(); // Create a marker cluster group
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    function clearMap() {
      markers.clearLayers(); // Clear existing markers
      map.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer); // Remove existing boundary layers
        }
      });
    }
  
    function loadGeoJSON(markerURL, boundaryURL) {
      clearMap();
  
      // Fetch marker GeoJSON data
      fetch(markerURL)
        .then(response => response.json())
        .then(data => {
          data.features.forEach(function (feature) {
            var coordinates = feature.geometry.coordinates.reverse();
            var marker = L.marker(coordinates);
            marker.bindPopup(feature.properties.popupText);
            markers.addLayer(marker);
          });
          map.addLayer(markers);
        })
        .catch(error => {
          console.error('Error loading marker GeoJSON data:', error);
        });
  
      // Fetch boundary GeoJSON data
      fetch(boundaryURL)
        .then(response => response.json())
        .then(data => {
          L.geoJSON(data, {
            style: function (feature) {
              return {
                color: "#3388ff",
                weight: 2,
                fillOpacity: 0.1,
                fillColor: "#3388ff"
              };
            },
            onEachFeature: function (feature, layer) {
              if (feature.properties && feature.properties.popupText) {
                layer.bindPopup(feature.properties.popupText);
              }
            }
          }).addTo(map);
        })
        .catch(error => {
          console.error('Error loading boundary GeoJSON data:', error);
        });
    }
  
    function showContent(tab) {
      var markerURL, boundaryURL;
  
      if (tab === 'tab1') {
        markerURL = '../assets/subportmap/marker.geojson';
        boundaryURL = '../assets/subportmap/boundary.geojson';
        view = [-37.892, 145.15]; // Set view for tab 1
        map.setView(view, 12); // Set view with specific zoom level
      } else if (tab === 'tab2') {
        markerURL = '../assets/subportmap/marker2.geojson';
        boundaryURL = '../assets/subportmap/boundary2.geojson';
      }
      
      loadGeoJSON(markerURL, boundaryURL);
    }
  
    // Add event listeners to the tabs
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove 'active' class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add 'active' class to the clicked tab
        this.classList.add('active');
        // Show content based on the clicked tab
        showContent(this.dataset.tab);
      });
    });
  });
  