document.getElementById("calc-entry-year-btn").addEventListener("click", function() {
  // Remove any existing alert messages
  var existingAlert = document.querySelector('.input-wrapper p');
  if (existingAlert) {
    existingAlert.remove();
  }

  // Get the birth year input value
  var birthYearInput = document.getElementById("birth-year-input").value;

  // Convert birth year input to a Date object
  var birthDate = new Date(birthYearInput);

  // Get the month from the birth date (months are 0-indexed)
  var birthMonth = birthDate.getMonth();

  // Get the year from the birth date
  var birthYear = birthDate.getFullYear();

  // Check if birth year is before 2020
  if (birthYear < 2020) {
    // Display alert message beneath the input wrapper
    var inputWrapper = document.querySelector('.input-wrapper');
    var alertMessage = document.createElement('p');
    alertMessage.textContent = "Please enter a birth year after 2020.";
    alertMessage.style.color = "red";
    inputWrapper.appendChild(alertMessage);
    return; // Stop further execution
  }

  // Calculate the school years
  var prepYear = birthYear + 4;
  var year1 = prepYear + 1;
  var year2 = prepYear + 2;
  var year3 = prepYear + 3;
  var year4 = prepYear + 4;
  var year5 = prepYear + 5;
  var year6 = prepYear + 6;

  // If birth month is after April, increment all years by 1
  if (birthMonth >= 4) {
    prepYear++;
    year1++;
    year2++;
    year3++;
    year4++;
    year5++;
    year6++;
  }

  // Calculate the age for each year
  var agePrep = prepYear - birthYear;
  var age1 = year1 - birthYear;
  var age2 = year2 - birthYear;
  var age3 = year3 - birthYear;
  var age4 = year4 - birthYear;
  var age5 = year5 - birthYear;
  var age6 = year6 - birthYear;

  // Adjust ages for birth dates after April 30
  if (birthMonth >= 4) {
    agePrep--;
    age1--;
    age2--;
    age3--;
    age4--;
    age5--;
    age6--;
  }

  // Update the displayed years and ages in the timeline
  document.querySelector('[data-tab="prep-year"]').innerHTML = "Age: <br>" + agePrep;
  document.querySelector('[data-tab="year1"]').innerHTML = "Age: <br>" + age1;
  document.querySelector('[data-tab="year2"]').innerHTML = "Age: <br>" + age2;
  document.querySelector('[data-tab="year3"]').innerHTML = "Age: <br>" + age3;
  document.querySelector('[data-tab="year4"]').innerHTML = "Age: <br>" + age4;
  document.querySelector('[data-tab="year5"]').innerHTML = "Age: <br>" + age5;
  document.querySelector('[data-tab="year6"]').innerHTML = "Age: <br>" + age6;

  // Update the displayed ages
  document.querySelector('[data-tab="prep-year"]').nextElementSibling.innerHTML = "<p>At Age: " + agePrep + "<br>The child will enter Foundation in " + prepYear + "</p>";
  document.querySelector('[data-tab="year1"]').nextElementSibling.innerHTML = "<p>At Age: " + age1 + "<br>The child will enter Year 1 in " + year1 + "</p>";
  document.querySelector('[data-tab="year2"]').nextElementSibling.innerHTML = "<p>At Age: " + age2 + "<br>The child will enter Year 2 in " + year2 + "</p>";
  document.querySelector('[data-tab="year3"]').nextElementSibling.innerHTML = "<p>At Age: " + age3 + "<br>The child will enter Year 3 in " + year3 + "</p>";
  document.querySelector('[data-tab="year4"]').nextElementSibling.innerHTML = "<p>At Age: " + age4 + "<br>The child will enter Year 4 in " + year4 + "</p>";
  document.querySelector('[data-tab="year5"]').nextElementSibling.innerHTML = "<p>At Age: " + age5 + "<br>The child will enter Year 5 in " + year5 + "</p>";
  document.querySelector('[data-tab="year6"]').nextElementSibling.innerHTML = "<p>At Age: " + age6 + "<br>The child will enter Year 6 in " + year6 + "</p>";

  // Show the timeline section
  document.getElementById("timeline-section").style.display = "block";
  document.querySelector('.cur-button-container').style.display = 'block';

});
