
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
                document.getElementById('contentDescription').innerHTML = contentItem.Content_Description;
            } else {
                document.getElementById('contentDescription').innerHTML = 'No content found for the selected options.';
            }
        })
        .catch(error => {
            console.error('Fetching error:', error);
            document.getElementById('contentDescription').innerHTML = 'Error fetching content. Please try again later.';
        });
    }