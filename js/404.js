$(document).ready(function() {
    var validPaths = [
        '/', 
        '/index.html', 
        '/pages/infohub.html', 
        '/pages/subport.html', 
        '/pages/curriculum.html', 
        '/pages/slang.html',
        '/pages/animal.html'
    ];  

    var currentPath = window.location.pathname;

    if (validPaths.indexOf(currentPath) == -1) {
        window.location.href = '/pages/404.html';
    }
});