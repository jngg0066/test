$(document).ready(function() {
    var validPaths = [
        '/', 
        '/index.html', 
        '/pages/IT1/infohub.html', 
        '/pages/IT1/subport.html', 
        '/pages/IT2/calculator.html',
        '/pages/IT2/curriculum.html', 
        '/pages/IT2/slang.html',
        '/pages/IT2/animal.html',
    ];  

    var currentPath = window.location.pathname;

    if (validPaths.indexOf(currentPath) == -1) {
        window.location.href = '/pages/404.html';
    }
});