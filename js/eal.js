
// document.addEventListener("DOMContentLoaded", function() {
//     var dataCache = {};
//     var lastLevel = null;

//     function fetchData(level) {
//         if (dataCache[level]) {
//             console.log("Using cached data for level", level);
//             showDropdown(level);
//             return;
//         }
//         const apiUrl = `https://plvt7xh12i.execute-api.ap-southeast-2.amazonaws.com/it3?level=${encodeURIComponent(level)}`;
//         console.log("Fetching data for level", level);
//         fetch(apiUrl)
//             .then(response => response.json())
//             .then(json => {
//                 dataCache[level] = json.body;
//                 showDropdown(level);
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     }

//     window.loadLevel = function(level) {
//         if (lastLevel !== level) {
//             lastLevel = level;
//             fetchData(level);
//             // Clear content description when a new button is clicked
//             document.getElementById("content-description").innerHTML = "";
//             document.getElementById("level-detail-dropdown").disabled = false;
//         }
//     };

//     function showDropdown(level) {
//         var dropdown = document.getElementById("level-detail-dropdown");
//         dropdown.innerHTML = ''; // Clear the dropdown
//         var defaultOption = document.createElement("option");
//         defaultOption.text = "Select a Mode";
//         defaultOption.disabled = true;
//         defaultOption.selected = true;
//         dropdown.appendChild(defaultOption);
        
//         // Add new options based on fetched data
//         var levelData = JSON.parse(dataCache[level]);
//         var uniqueModes = [...new Set(levelData.map(item => item.mode))]; // Get unique modes
//         uniqueModes.forEach(function(mode) {
//             var option = document.createElement("option");
//             option.text = mode;
//             option.value = mode;
//             dropdown.appendChild(option);
//         });

//         dropdown.dataset.level = level;
//         document.getElementById("level-detail-container").classList.remove("hidden");
//     }

//     window.showDetails = function() {
//         var level = document.getElementById("level-detail-dropdown").dataset.level;
//         var mode = document.getElementById("level-detail-dropdown").value;
//         var allData = JSON.parse(dataCache[level]);
//         var contentData = allData.filter(item => item.level === level && item.mode === mode);
//         var container = document.getElementById("content-description");
//         if (contentData.length > 0) {
//             // container.innerHTML = contentData[0].content_description.replace(/<br>/g, '<br><br>'); // Format content for display
//             container.innerHTML = formatContent(contentData[0].content_description);
//         } else {
//             container.innerHTML = "No content available for this level and mode.";
//         }
//     };
// });

// function formatContent(content) {
//     const lines = content.split('<br>'); 
//     let contentMap = new Map();
//     let formattedContent = '<div class="accordion" id="accordionContent">';

//     lines.forEach(line => {
//         line = line.replace(/<\/?b>/g, '');
//         const parts = line.split(':');
//         if (parts.length < 2) {
//             return;  
//         }
//         const heading = parts[0].trim();
//         const body = parts.slice(1).join(':').trim();

//         if (!contentMap.has(heading)) {
//             contentMap.set(heading, []);
//         }
//         contentMap.get(heading).push(body);
//     });

//     let index = 0;
//     contentMap.forEach((descriptions, heading) => {
//         const collapseId = `collapse${index}`;
//         const headingId = `heading${index}`;
//         formattedContent += `
// <div class="accordion-item">
//     <h2 class="accordion-header" id="${headingId}">
//         <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
//             ${heading}
//         </button>
//     </h2>
//     <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}">
//         <div class="accordion-body">
//             <ul>`;
//         descriptions.forEach(description => {
//             formattedContent += `<li>${description}</li>`;
//         });
//         formattedContent += `</ul>
//         </div>
//     </div>
// </div>`;
//         index++;
//     });

//     formattedContent += '</div>';
//     return formattedContent;
// }

document.addEventListener("DOMContentLoaded", function() {
    var dataCache = {};
    var lastLevel = null;

    function fetchData(level) {
        if (dataCache[level]) {
            console.log("Using cached data for level", level);
            showDropdown(level);
            return;
        }
        const apiUrl = `https://plvt7xh12i.execute-api.ap-southeast-2.amazonaws.com/it3?level=${encodeURIComponent(level)}`;
        console.log("Fetching data for level", level);
        fetch(apiUrl)
            .then(response => response.json())
            .then(json => {
                dataCache[level] = json.body;
                showDropdown(level);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    window.loadLevel = function(level, event) {
        // Remove active class from all buttons
        var buttons = document.querySelectorAll('.button');
        buttons.forEach(function(button) {
            button.classList.remove('active');
        });

        // Add active class to the clicked button
        event.currentTarget.classList.add('active');

        if (lastLevel !== level) {
            lastLevel = level;
            fetchData(level);
            // Clear content description when a new button is clicked
            document.getElementById("content-description").innerHTML = "";
            document.getElementById("level-detail-dropdown").disabled = false;
        }
    };

    function showDropdown(level) {
        var dropdown = document.getElementById("level-detail-dropdown");
        dropdown.innerHTML = ''; // Clear the dropdown
        var defaultOption = document.createElement("option");
        defaultOption.text = "Select a Mode";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        dropdown.appendChild(defaultOption);
        
        // Add new options based on fetched data
        var levelData = JSON.parse(dataCache[level]);
        var uniqueModes = [...new Set(levelData.map(item => item.mode))]; // Get unique modes
        uniqueModes.forEach(function(mode) {
            var option = document.createElement("option");
            option.text = mode;
            option.value = mode;
            dropdown.appendChild(option);
        });

        dropdown.dataset.level = level;
        document.getElementById("level-detail-container").classList.remove("hidden");
    }

    window.showDetails = function() {
        var level = document.getElementById("level-detail-dropdown").dataset.level;
        var mode = document.getElementById("level-detail-dropdown").value;
        var allData = JSON.parse(dataCache[level]);
        var contentData = allData.filter(item => item.level === level && item.mode === mode);
        var container = document.getElementById("content-description");
        if (contentData.length > 0) {
            container.innerHTML = formatContent(contentData[0].content_description);
        } else {
            container.innerHTML = "No content available for this level and mode.";
        }
    };
});

function formatContent(content) {
    const lines = content.split('<br>'); 
    let contentMap = new Map();
    let formattedContent = '<div class="accordion" id="accordionContent">';

    lines.forEach(line => {
        line = line.replace(/<\/?b>/g, '');
        const parts = line.split(':');
        if (parts.length < 2) {
            return;  
        }
        const heading = parts[0].trim();
        const body = parts.slice(1).join(':').trim();

        if (!contentMap.has(heading)) {
            contentMap.set(heading, []);
        }
        contentMap.get(heading).push(body);
    });

    let index = 0;
    contentMap.forEach((descriptions, heading) => {
        const collapseId = `collapse${index}`;
        const headingId = `heading${index}`;
        formattedContent += `
<div class="accordion-item">
    <h2 class="accordion-header" id="${headingId}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${collapseId}" aria-expanded="false" aria-controls="${collapseId}">
            ${heading}
        </button>
    </h2>
    <div id="${collapseId}" class="accordion-collapse collapse" aria-labelledby="${headingId}">
        <div class="accordion-body">
            <ul>`;
        descriptions.forEach(description => {
            formattedContent += `<li>${description}</li>`;
        });
        formattedContent += `</ul>
        </div>
    </div>
</div>`;
        index++;
    });

    formattedContent += '</div>';
    return formattedContent;
}