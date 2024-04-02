document.addEventListener("DOMContentLoaded", function () {
  // Initialize the map without adding any markers
  initializeMap();

  // Event listener for tab selection
  document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', function () {
          var tabId = this.dataset.tab;
          if (tabId === 'tab1') {
              // Reset dropdown selection for tab 1
              resetDropdown('dropdownMenuTab1');
              // Fetch schools.json for tab1
              fetchSchoolsData("../assets/subportmap/schools.json", getSelectedSuburb('dropdownMenuTab1'));
              showDropdown('dropdownTab1');
          } else if (tabId === 'tab2') {
              // Reset dropdown selection for tab 2
              resetDropdown('dropdownMenuTab2');
              // Fetch schools2.json for tab2
              fetchSchoolsData("../assets/subportmap/schools2.json", getSelectedSuburb('dropdownMenuTab2'));
              showDropdown('dropdownTab2');
          }
          // Remove active class from all tabs
          document.querySelectorAll('.tab').forEach(tab => {
              tab.classList.remove('active');
          });
          // Add active class to the clicked tab
          this.classList.add('active');
      });
  });

  // Event listener for dropdown change
  document.querySelectorAll('.dropdown select').forEach(dropdown => {
      dropdown.addEventListener('change', function () {
          var tabId = this.id === 'dropdownMenuTab1' ? 'tab1' : 'tab2';
          if (this.value === '') {
              // Show all markers if "Show All" option is selected
              fetchAllSchoolsData(tabId);
          } else {
              if (tabId === 'tab1') {
                  fetchSchoolsData("../assets/subportmap/schools.json", this.value);
              } else if (tabId === 'tab2') {
                  fetchSchoolsData("../assets/subportmap/schools2.json", this.value);
              }
          }
      });
  });
});

function showDropdown(dropdownId) {
  // Hide all dropdowns
  document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.style.display = 'none';
  });
  // Show the specified dropdown
  document.getElementById(dropdownId).style.display = 'block';
}

function resetDropdown(dropdownId) {
  // Reset the dropdown selection
  document.getElementById(dropdownId).selectedIndex = 0;
}

function getSelectedSuburb(dropdownId) {
  // Get the selected suburb from the dropdown
  return document.getElementById(dropdownId).value;
}


function fetchAllSchoolsData(tabId) {
  // Determine which schools data file to fetch based on tabId
  var url;
  if (tabId === 'tab1') {
      url = "../assets/subportmap/schools.json";
  } else if (tabId === 'tab2') {
      url = "../assets/subportmap/schools2.json";
  }

  // Clear previous markers from the map
  clearMarkers();

  // Fetch all schools data from the specified URL
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Add markers for all data
          data.forEach(function (school) {
              addMarker(school);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}

var map; // Declare map variable globally
var markers = []; // Array to store markers

function initializeMap() {
  // Initialize Leaflet map
  map = L.map('map').setView([-37.8136, 144.9631], 10); // Default view for Victoria, Australia

  // Add Tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
  }).addTo(map);
}

function addMarker(school) {
  var marker = L.marker([school.Latitude, school.Longitude]);
  var popupContent = `
      <b>School Name:</b> ${school.School_Name}<br>
      <b>Education Sector:</b> ${school.Education_Sector}<br>
      <b>Suburb:</b> ${school.Suburb}<br>
      <b>LGA Name:</b> ${school.LGA_Name}
  `;
  marker.bindPopup(popupContent);
  marker.addTo(map); // Add marker to the map
  markers.push(marker); // Push marker to the array
}

function fetchSchoolsData(url, selectedSuburb) {
  // Clear previous markers from the map
  clearMarkers();

  // Fetch schools data from the specified URL
  fetch(url)
      .then(response => response.json())
      .then(data => {
          // Filter schools based on selected suburb
          var filteredData = data.filter(school => school.Suburb === selectedSuburb);

          // Add markers for the filtered data
          filteredData.forEach(function (school) {
              addMarker(school);
          });
      })
      .catch(error => console.error('Error fetching data:', error));
}

function clearMarkers() {
  // Remove all markers from the map
  markers.forEach(marker => {
      marker.removeFrom(map);
  });
  // Clear markers array
  markers = [];
}
