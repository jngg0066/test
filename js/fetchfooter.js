// fetchfooter.js
// Fetch footer.html using JavaScript
fetch('../assets/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer').innerHTML = data;
        // After inserting the footer content, load the footer CSS
        loadCSS('../css/footer.css');
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
