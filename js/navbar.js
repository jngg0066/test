// Define a function to fetch the navbar content
function fetchNavbar() {
    fetch('/pages/navbar-footer/navbar.html')
    .then(response => response.text())
    .then(data => {
        // Inject the fetched navbar content into the index.html
        document.getElementById('navbarContainer').innerHTML = data;
    })
    .catch(error => console.error('Error fetching navbar:', error));
}

// Call the fetchNavbar function when the DOM content is loaded
document.addEventListener('DOMContentLoaded', fetchNavbar);
