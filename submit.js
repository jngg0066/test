// Get reference to the form
var form = document.getElementById('myForm');

// Add event listener for form submission
form.addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Verify if reCAPTCHA is filled
    if (grecaptcha.getResponse().length === 0) {
        alert('Please complete the reCAPTCHA.');
        return; // Exit the function if reCAPTCHA is not filled
    }

    // If reCAPTCHA is filled, redirect the user to home.html
    window.location.href = '/home.html';
});
