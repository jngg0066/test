document.addEventListener("DOMContentLoaded", function () {
    // Initialize the map without adding any markers
    initializeMap();

    // Event listener for tab selection
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function () {
            var tabId = this.dataset.tab;
            // Reset dropdown selection based on the clicked tab
            var dropdownId = `dropdownMenu${tabId.charAt(0).toUpperCase() + tabId.slice(1)}`;
            resetDropdown(dropdownId);
            fetchAllSchoolsData(tabId);

            // Show the corresponding dropdown
            showDropdown(tabId.replace('tab', 'dropdownTab'));

            // Toggle active class on tabs
            document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Event listener for dropdown change
    document.getElementById('dropdownMenuTab1').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab1');
    });

    document.getElementById('dropdownMenuTab2').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab2');
    });

    document.getElementById('dropdownMenuTab3').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab3');
    });

    document.getElementById('dropdownMenuTab4').addEventListener('change', function () {
        var selectedSuburb = this.value;
        fetchSchoolsData(selectedSuburb, 'tab4');
    });
});

function showContent(tabId) {
    // Hide all content divs
    document.querySelectorAll('.text-container > div').forEach(div => {
        div.style.display = 'none';
    });

    // Show the content div corresponding to the selected tab
    document.getElementById(`${tabId}Content`).style.display = 'block';

    // Add active class to text-container
    document.querySelector('.text-container').classList.add('active');
}

function showDropdown(dropdownId) {
    // Hide all dropdowns
    document.querySelectorAll('.dropdown').forEach(dropdown => dropdown.style.display = 'none');
    // Show the specified dropdown
    document.getElementById(dropdownId).style.display = 'block';
}

function resetDropdown(dropdownId) {
    // Reset the dropdown selection
    document.getElementById(dropdownId).selectedIndex = 0;
}

function fetchAllSchoolsData(tabId) {
    // Clear previous markers from the map
    clearMarkers();

    let apiUrl;
    // Determine API endpoint based on the tab selected
    switch(tabId) {
        case 'tab1':
            apiUrl = '/schools/tab1/Show All'; // Flask endpoint for tab1
            break;
        case 'tab2':
            apiUrl = '/schools/tab2/Show All'; // Flask endpoint for tab2
            break;
        case 'tab3':
            apiUrl = '/schools/tab3/Show All'; // Flask endpoint for tab3
            break;
        case 'tab4':
            apiUrl = '/schools/tab4/Show All'; // Flask endpoint for tab4
            break;
        default:
            console.error('Invalid tabId');
            return;
    }

    // Fetch schools data from the Flask endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Add markers for all schools
            data.forEach(school => addMarker(school));
        })
        .catch(error => console.error('Error fetching data:', error));
}

function fetchSchoolsData(selectedSuburb, tabId) {
    let apiUrl;
    // Determine API endpoint based on the tab selected
    switch(tabId) {
        case 'tab1':
            apiUrl = `/schools/tab1/${selectedSuburb}`; // Flask endpoint for tab1
            break;
        case 'tab2':
            apiUrl = `/schools/tab2/${selectedSuburb}`; // Flask endpoint for tab2
            break;
        case 'tab3':
            apiUrl = `/schools/tab3/${selectedSuburb}`; // Flask endpoint for tab3
            break;
        case 'tab4':
            apiUrl = `/schools/tab4/${selectedSuburb}`; // Flask endpoint for tab4
            break;
        default:
            console.error('Invalid tabId');
            return;
    }

    // Fetch schools data from the Flask endpoint
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Clear previous markers from the map
            clearMarkers();
            // Add markers for the filtered data
            data.forEach(school => addMarker(school));
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Other functions remain the same as in the original subport.js
