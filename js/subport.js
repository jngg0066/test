document.addEventListener("DOMContentLoaded", function () {
  var map = L.map("map").setView([-37.8136, 144.9631], 10);
  var markers = L.markerClusterGroup();  

  // Define a base tile layer
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

  function loadGeoJSON(markerURL) {
    clearMap();
  
    fetch(markerURL)
      .then(response => response.json())
      .then(data => {
        L.geoJSON(data).addTo(map); // Add GeoJSON data to the map
      })
      .catch(error => {
        console.error('Error loading GeoJSON data:', error);
      });
  }
  

  function showContent(tab) {
    var markerURL;
    var select = document.getElementById('locationsDropdown');
    var chineseOptions = document.getElementById('tab1Options');
    var tab2Options = document.getElementById('tab2Options');
    var dropdown = document.querySelector('.dropdown');
  
    // Clear the map before loading new data
    clearMap();
  
    if (tab === 'tab1') {
      var selectedSuburb = select.value;
      if (selectedSuburb === 'mountWaverley') {
        markerURL = '../assets/subportmap/marker.geojson';
      } else if (selectedSuburb === 'glenWaverley') {
        markerURL = '../assets/subportmap/boundary.geojson';
      }
      view = [-37.892, 145.15];
      map.setView(view, 12);
      // Show Chinese options, hide tab 2 options
      chineseOptions.style.display = 'block';
      tab2Options.style.display = 'none';
      dropdown.style.display = 'block'; // Show the dropdown
    } else if (tab === 'tab2') {
      markerURL = '../assets/subportmap/marker2.geojson';
      // Show tab 2 options, hide Chinese options
      chineseOptions.style.display = 'none';
      tab2Options.style.display = 'block';
      dropdown.style.display = 'block'; // Show the dropdown
    } else {
      dropdown.style.display = 'none'; // Hide the dropdown if no tab is selected
    }
  
    if (markerURL && select.value !== '') {
      loadGeoJSON(markerURL);
    }
  }
  
  
  

  var tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      var currentTab = this.dataset.tab;
      // Reset dropdown selection only if another tab is clicked
      if (currentTab !== select.dataset.currentTab) {
        select.value = ''; // Reset dropdown selection
      }
      select.dataset.currentTab = currentTab;
      showContent(currentTab);
    });
  });
  
  var select = document.getElementById('locationsDropdown');
  select.addEventListener('change', function() {
    var tab = document.querySelector('.tab.active');
    if (tab) {
      showContent(tab.dataset.tab);
    }
  });

  // Initially hide content and clear map
  showContent('');
});
