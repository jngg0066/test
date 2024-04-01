document.addEventListener("DOMContentLoaded", function () {
    var map = L.map("map").setView([-37.8136, 144.9631], 10);
    var markers = L.markerClusterGroup();  
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    function clearMap() {
      markers.clearLayers();  
      map.eachLayer(function (layer) {
        if (layer instanceof L.GeoJSON) {
          map.removeLayer(layer);  
        }
      });
    }
  
    function loadGeoJSON(markerURL, boundaryURL) {
      clearMap();
  
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
        view = [-37.892, 145.15]; 
        map.setView(view, 12); 
      } else if (tab === 'tab2') {
        markerURL = '../assets/subportmap/marker2.geojson';
        boundaryURL = '../assets/subportmap/boundary2.geojson';
      }
      
      loadGeoJSON(markerURL, boundaryURL);
    }
  
    var tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        tabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        showContent(this.dataset.tab);
      });
    });
  });
  