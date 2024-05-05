
document.addEventListener("DOMContentLoaded", function() {
    const firstDropdown = document.getElementById("dropdownMenuTab1");
    const secondDropdown = document.getElementById("dropdownMenuTab2");
    const thirdDropdown = document.getElementById("dropdownMenuTab3");

    firstDropdown.addEventListener("change", function() {
        updateDropdown(secondDropdown, disciplines[firstDropdown.value] || []);
        resetDropdown(thirdDropdown);
    });

    secondDropdown.addEventListener("change", function() {
        updateDropdown(thirdDropdown, levels[secondDropdown.value] || []);
    });

    thirdDropdown.addEventListener("change", fetchDescription);
});


const disciplines = {
    "Capabilities": ["Critical and Creative Thinking", "Ethical Capability", "Intercultural Capability"],
    "English": ["Reading and Viewing", "Speaking and Listening", "Writing"],
    "Health and Physical Education": ["Health and Physical Education"],
    "Mathematics": ["Mathematics"],
    "Science": ["Science"],
    "Technologies": ["Design and Technologies", "Digital Technologies"],
    "The Arts": ["Dance", "Drama", "Media Arts", "Music", "Visual Arts"],
    "The Humanities": ["Geography", "History"]
};

const levels = {
    "Critical and Creative Thinking": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Ethical Capability": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Intercultural Capability": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Reading and Viewing": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
    "Speaking and Listening": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
    "Writing": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
    "Health and Physical Education": ["Foundation Level", "Levels 1 and 2","Levels 3 and 4", "Levels 5 and 6"],
    "Mathematics": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
    "Science": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Design and Technologies": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Digital Technologies": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Dance": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Drama": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Media Arts": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Music": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Visual Arts": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
    "Geography": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
    "History": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]
};

function updateDropdown(dropdown, options) {
    resetDropdown(dropdown);
    options.forEach(option => {
        dropdown.add(new Option(option, option));
    });
}

function resetDropdown(dropdown) {
    while (dropdown.options.length > 0) {
        dropdown.remove(0);
    }
    dropdown.add(new Option('Select an Option', '', true));
}

function fetchDescription() {
    const area = document.getElementById("dropdownMenuTab1").value;
    const discipline = document.getElementById("dropdownMenuTab2").value;
    const level = document.getElementById("dropdownMenuTab3").value;

    if (!area || !discipline || !level) {
        alert('Please make all selections first.');
        return;
    }

    const apiUrl = `https://v2889mn27d.execute-api.ap-southeast-2.amazonaws.com/devl_cur?area=${encodeURIComponent(area)}&discipline=${encodeURIComponent(discipline)}&level=${encodeURIComponent(level)}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error('Network response not ok');
            return response.json();
        })
        .then(data => {
            const parsedData = JSON.parse(data.body);
            const contentItem = parsedData.find(item => 
                item.Area === area && 
                item.Discipline === discipline && 
                item.Level === level
            );
            if (contentItem) {
                document.getElementById('contentDescription').innerHTML = formatContent(contentItem.Content_Description);
            } else {
                document.getElementById('contentDescription').innerHTML = 'No content found for the selected options.';
            }
        })
        .catch(error => {
            console.error('Fetching error:', error);
            document.getElementById('contentDescription').innerHTML = 'Error fetching content. Please try again later.';
        });
}

// function formatContent(content) {
//     const lines = content.split('<br>'); 
//     let contentMap = new Map();
//     let formattedContent = '';

//     lines.forEach(line => {
//         line = line.replace(/<\/?b>/g, '');  
//         console.log("Processing line:", line);
//         const parts = line.split(':');
//         if (parts.length < 2) {
//             console.log("Skipping line due to incorrect format:", line);
//             return; 
//         }
//         const heading = parts[0].trim() + ':';
//         const body = parts.slice(1).join(':').trim();

//         if (!contentMap.has(heading)) {
//             contentMap.set(heading, []);
//         }
//         contentMap.get(heading).push(body);
//     });

//     contentMap.forEach((descriptions, heading) => {
//         formattedContent += `<h4 style="font-size: smaller;"><b>${heading}</b></h4><ul>`;
//         descriptions.forEach(description => {
//             formattedContent += `<li>${description}</li>`;
//         });
//         formattedContent += `</ul>`;
//     });

//     return formattedContent;
// }

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

document.addEventListener("DOMContentLoaded", function() {
    const firstDropdown = document.getElementById("dropdownMenuTab1");
    const secondDropdown = document.getElementById("dropdownMenuTab2");
    const thirdDropdown = document.getElementById("dropdownMenuTab3");
    const buttonContainer = document.querySelector(".cur-button-container");

    firstDropdown.addEventListener("change", function() {
        updateDropdown(secondDropdown, disciplines[firstDropdown.value] || []);
        resetDropdown(thirdDropdown);
        toggleButtonVisibility();
    });

    secondDropdown.addEventListener("change", function() {
        updateDropdown(thirdDropdown, levels[secondDropdown.value] || []);
        toggleButtonVisibility();
    });

    thirdDropdown.addEventListener("change", function() {
        toggleButtonVisibility();
    });

    function toggleButtonVisibility() {
        if (firstDropdown.value === "English" && secondDropdown.value && thirdDropdown.value) {
            buttonContainer.style.display = "block";
        } else {
            buttonContainer.style.display = "none";
        }
    }
});
