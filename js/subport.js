function showContent(tabId) {
    // Hide all tab contents
    var tabContents = document.getElementsByClassName("tab-content");
    for (var i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
    }
    
    // Remove 'active' class from all tabs
    var tabs = document.getElementsByClassName("tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove("active");
    }

    // Show the selected tab content
    var selectedTabContent = document.getElementById(tabId + "-content");
    if (selectedTabContent) {
        selectedTabContent.style.display = "block";
    }

    // Add 'active' class to the clicked tab
    var clickedTab = document.querySelector('.tab[data-tab="' + tabId + '"]');
    if (clickedTab) {
        clickedTab.classList.add("active");
    }
}
