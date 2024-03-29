// Get the homenews modals
var homenewsModals = document.querySelectorAll(".homenews");

// Get the images that open the homenews modals
var openPopupImgs = document.querySelectorAll("[id^='openPopup']");

// Get the buttons that open the homenews modals
var openPopupButtons = document.querySelectorAll("[id^='openPopupButton']");

// Function to show modal by index
function showModal(index) {
    homenewsModals[index].style.display = "block";
}

// Loop through each image and attach onclick event
openPopupImgs.forEach(function(image, index) {
    image.onclick = function() {
        showModal(index);
    }
});

// Loop through each button and attach onclick event
openPopupButtons.forEach(function(button, index) {
    button.onclick = function() {
        showModal(index);
    }
});

// Get the <span> elements that close the homenews modals
var homenewsCloses = document.querySelectorAll(".homenews-close");

// Loop through each close button and attach onclick event
homenewsCloses.forEach(function(closeBtn) {
    closeBtn.onclick = function() {
        this.parentNode.parentNode.style.display = "none";
    }
});

// When the user clicks anywhere outside of the homenews modals, close them
window.onclick = function(event) {
    homenewsModals.forEach(function(modal) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
}
