document.getElementById("dropdownMenuTab1").addEventListener("change", function() {
    populateSecondDropdown();
    populateThirdDropdown();
});

function populateSecondDropdown() {
    var firstDropdown = document.getElementById("dropdownMenuTab1");
    var selectedOption = firstDropdown.options[firstDropdown.selectedIndex].value;
    var secondDropdown = document.getElementById("dropdownMenuTab2");
    secondDropdown.innerHTML = ""; // Clear existing options

    switch (selectedOption) {
        case "Capabilities":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Critical and Creative Thinking", "Ethical Capability", "Intercultural Capability"]);       
            break;
        case "English":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Reading and Viewing", "Speaking and Listening", "Writing"]);
            break;
        case "Health and Physical Education":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Health and Physical Education"]);
            break;
        case "Mathematics":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Mathematics"]);
            break;
        case "Science":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Science"]);
            break;
        case "Technologies":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Design and Technologies", "Digital Technologies"]);
            break;
        case "The Arts":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Dance", "Drama", "Media Arts", "Music", "Visual Arts"]);
            break;
        case "The Humanities":
            secondDropdown.innerHTML = '<option value="" disabled selected>Select one Discipline</option>';
            addOptions(secondDropdown, ["Geography", "History"]);
            break;
        default:
            secondDropdown.innerHTML = '<option value="" disabled selected>Select a Discipline</option>';
    }
}
function populateThirdDropdown() {
    var firstDropdown = document.getElementById("dropdownMenuTab1");
    var selectedSubject = firstDropdown.options[firstDropdown.selectedIndex].value;
    var thirdDropdown = document.getElementById("dropdownMenuTab3");
    thirdDropdown.innerHTML = ""; // Clear existing options

    switch (selectedSubject) {
        case "Capabilities":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        case "English":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]);
            break;
        case "Health and Physical Education":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        case "Mathematics":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]);
            break;
        case "Science":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        case "Technologies":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        case "The Arts":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        case "The Humanities":
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select one Level</option>';
            addOptions(thirdDropdown, ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]);
            break;
        default:
            thirdDropdown.innerHTML = '<option value="" disabled selected>Select a Level</option>';
    }
}


function addOptions(selectElement, options) {
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement("option");
        option.text = options[i];
        option.value = options[i];
        selectElement.add(option);
    }
    document.getElementById("dropdownMenuTab3").addEventListener("change", fetchDescription);
}

function fetchDescription() {
    var area = document.getElementById("dropdownMenuTab1").value;
    var discipline = document.getElementById("dropdownMenuTab2").value;
    var level = document.getElementById("dropdownMenuTab3").value;

    // Construct the URL with proper encoding of parameters
    var url = `https://v2889mn27d.execute-api.ap-southeast-2.amazonaws.com/devl_cur?area=${encodeURIComponent(area)}&discipline=${encodeURIComponent(discipline)}&level=${encodeURIComponent(level)}`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json(); // This ensures we're reading the JSON correctly
            }
            throw new Error('Network response was not ok.');
        })
        .then(data => {
            // Assuming the body is correctly formatted as JSON
            if (data.body.length > 0) {
                // Parse the JSON string
                var content = JSON.parse(data.body);
                if (content.length > 0 && content[0].Content_Description) {
                    document.getElementById('contentDescription').innerHTML = '<p>' + content[0].Content_Description + '</p>';
                } else {
                    document.getElementById('contentDescription').innerHTML = '<p>No curriculum details found for the selected options.</p>';
                }
            } else {
                document.getElementById('contentDescription').innerHTML = '<p>No curriculum details found for the selected options.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching the curriculum data:', error);
            document.getElementById('contentDescription').innerHTML = '<p>Error loading content description. Please try again.</p>';
        });
}

// document.getElementById("dropdownMenuTab1").addEventListener("change", function() {
//     populateSecondDropdown();
// });

// function populateSecondDropdown() {
//     var firstDropdown = document.getElementById("dropdownMenuTab1");
//     var selectedArea = firstDropdown.value;
//     var secondDropdown = document.getElementById("dropdownMenuTab2");
//     secondDropdown.innerHTML = '<option value="" disabled selected>Select a Discipline</option>';

//     // Assuming `disciplines` is an object or could be retrieved based on `selectedArea`
//     var disciplines = {
//         "Capabilities": ["Critical and Creative Thinking", "Ethical Capability", "Intercultural Capability"],
//         "English": ["Reading and Viewing", "Speaking and Listening", "Writing"],
//         "Health and Physical Education": ["Health and Physical Education"],
//         "Mathematics": ["Mathematics"],
//         "Science": ["Science"],
//         "Technologies": ["Design and Technologies", "Digital Technologies"],
//         "The Arts": ["Dance", "Drama", "Media Arts", "Music", "Visual Arts"],
//         "The Humanities": ["Geography", "History"]
//         // Add other areas and their disciplines accordingly
//     };

//     if (disciplines[selectedArea]) {
//         disciplines[selectedArea].forEach(function(discipline) {
//             var option = document.createElement("option");
//             option.value = discipline;
//             option.text = discipline;
//             secondDropdown.appendChild(option);
//         });
//     }

//     secondDropdown.onchange = populateThirdDropdown;
// }

// function populateThirdDropdown() {
//     var firstDropdown = document.getElementById("dropdownMenuTab1");
//     var secondDropdown = document.getElementById("dropdownMenuTab2");
//     var selectedArea = firstDropdown.value;
//     var selectedDiscipline = secondDropdown.value;
//     var thirdDropdown = document.getElementById("dropdownMenuTab3");
//     thirdDropdown.innerHTML = '<option value="" disabled selected>Select a Level</option>';

//     var levels = {
//         "Capabilities": {
//             "Critical and Creative Thinking": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Ethical Capability": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Intercultural Capability": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]
//         },
//         "English": {
//             "Reading and Viewing": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
//             "Speaking and Listening": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"],
//             "Writing": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]
//         },
//         "Health and Physical Education": {
//             "Health and Physical Education": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"]
//         },
//         "Mathematics": {
//             "Mathematics": ["Foundation Level", "Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6"]
//         },
//         "Science": {
//             "Science": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]
//         },
//         "Technologies": {
//             "Design and Technologies": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Digital Technologies": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]
//         },
//         "The Arts": {
//             "Dance": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Drama": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Media Arts": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Music": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "Visual Arts": ["Foundation Level", "Levels 1 and 2", "Levels 3 and 4", "Levels 5 and 6"]
//         },
//         "The Humanities": {
//             "Geography": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"],
//             "History": ["Foundation to Level 2", "Levels 3 and 4", "Levels 5 and 6"]
//         }
       
//     };

//     // Get applicable levels based on selected area and discipline
//     var applicableLevels = levels[selectedArea] && levels[selectedArea][selectedDiscipline] ? levels[selectedArea][selectedDiscipline] : ["No levels available"];

//     applicableLevels.forEach(function(level) {
//         var option = document.createElement("option");
//         option.value = level;
//         option.text = level;
//         thirdDropdown.appendChild(option);
//     });

//     thirdDropdown.onchange = fetchDescription;
// }

// function fetchDescription() {
//     var area = document.getElementById("dropdownMenuTab1").value;
//     var discipline = document.getElementById("dropdownMenuTab2").value;
//     var level = document.getElementById("dropdownMenuTab3").value;

//     // Construct the URL with proper encoding of parameters
//     var url = `https://v2889mn27d.execute-api.ap-southeast-2.amazonaws.com/devl_cur?area=${encodeURIComponent(area)}&discipline=${encodeURIComponent(discipline)}&level=${encodeURIComponent(level)}`;

//     fetch(url)
//         .then(response => {
//             if (response.ok) {
//                 return response.json(); // This ensures we're reading the JSON correctly
//             }
//             throw new Error('Network response was not ok.');
//         })
//         .then(data => {
//             // Assuming the body is correctly formatted as JSON
//             if (data.body.length > 0) {
//                 // Parse the JSON string
//                 var content = JSON.parse(data.body);
//                 if (content.length > 0 && content[0].Content_Description) {
//                     document.getElementById('contentDescription').innerHTML = '<p>' + content[0].Content_Description + '</p>';
//                 } else {
//                     document.getElementById('contentDescription').innerHTML = '<p>No curriculum details found for the selected options.</p>';
//                 }
//             } else {
//                 document.getElementById('contentDescription').innerHTML = '<p>No curriculum details found for the selected options.</p>';
//             }
//         })
//         .catch(error => {
//             console.error('Error fetching the curriculum data:', error);
//             document.getElementById('contentDescription').innerHTML = '<p>Error loading content description. Please try again.</p>';
//         });
// }