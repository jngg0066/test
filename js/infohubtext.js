var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    var isActive = this.classList.toggle("active");
    var content = this.nextElementSibling;

    // Close all collapsibles except the one that is currently clicked
    for (var j = 0; j < coll.length; j++) {
      if (coll[j] !== this) {
        coll[j].classList.remove("active");
        coll[j].nextElementSibling.style.display = "none";
      }
    }

    // Toggle the display of content based on its current state
    content.style.display = isActive ? "block" : "none";
  });
}
