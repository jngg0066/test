// fetchHeader.js
// Fetch header.html using JavaScript
fetch('../assets/header-footer/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        // After inserting the header content, load the header CSS
        loadCSS('../css/header.css');
    });

// Function to dynamically load CSS
function loadCSS(filename) {
    var head = document.head;
    var link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = filename;

    head.appendChild(link);
}
