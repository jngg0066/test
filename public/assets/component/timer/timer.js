var timerInterval; // Global variable to store the timer interval

// Function to calculate time needed to reapply sunscreen based on UV level
// Function to start the countdown timer
function startTimer(duration, display) {
    var timer = duration;
    timerInterval = setInterval(function () {
        var hours = parseInt(timer / 3600, 10);
        var minutes = parseInt((timer % 3600) / 60, 10);
        var seconds = parseInt(timer % 60, 10);

        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = hours + ":" + minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

// Function to calculate time needed to reapply sunscreen based on UV level
function calculateReapplyTime(uvLevel) {
    switch(uvLevel) {
        case 'low-moderate':
            return 7200; // 2 Hours
        case 'high':
            return 5400; // 1.5 Hours
        case 'very high-extreme':
            return 3600; // 1 Hour
        default:
            return 0;
    }
}

// Get the UV level selection dropdown
var uvLevelSelect = document.getElementById('uvLevelSelect');

// Get the display element
var display = document.getElementById('time');

// Add event listener for UV level selection change
uvLevelSelect.addEventListener('change', function() {
    // Stop the timer if it's already running
    clearInterval(timerInterval);

    // Get the selected UV level
    var selectedUvLevel = uvLevelSelect.value;

    // Calculate time needed to reapply sunscreen based on selected UV level
    var reapplyTimeInSeconds = calculateReapplyTime(selectedUvLevel);

    // Update the timer display immediately
    display.textContent = formatTime(reapplyTimeInSeconds);

    // Start the timer immediately
    startTimer(reapplyTimeInSeconds, display);
});

// Get the restart button
var restartButton = document.getElementById('restartButton');

// Add event listener for restart button
restartButton.addEventListener('click', function() {
    // Stop the timer if it's already running
    clearInterval(timerInterval);

    // Get the selected UV level
    var selectedUvLevel = uvLevelSelect.value;

    // Calculate time needed to reapply sunscreen based on selected UV level
    var reapplyTimeInSeconds = calculateReapplyTime(selectedUvLevel);

    // Start the timer with the new UV level
    startTimer(reapplyTimeInSeconds, display);
});

// Get the stop button
var stopButton = document.getElementById('stopButton');

// Add event listener for stop button
stopButton.addEventListener('click', function() {
    // Stop the timer
    clearInterval(timerInterval);
});

// Function to format time
function formatTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    var minutes = Math.floor((seconds % 3600) / 60);
    var remainingSeconds = seconds % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    remainingSeconds = remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;

    return hours + ":" + minutes + ":" + remainingSeconds;
}
