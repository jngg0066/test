document.getElementById("calc-entry-year-btn").addEventListener("click", function() {
  // Get the birth year input value
  var birthYearInput = document.getElementById("birth-year-input").value;

  // Convert birth year input to a Date object
  var birthDate = new Date(birthYearInput);

  // Get the year from the birth date
  var birthYear = birthDate.getFullYear();

  // Calculate the school years
  var prepYear = birthYear + 4;
  var year1 = prepYear + 1;
  var year2 = prepYear + 2;
  var year3 = prepYear + 3;
  var year4 = prepYear + 4;
  var year5 = prepYear + 5;
  var year6 = prepYear + 6;

  // Update the displayed years in the timeline
  document.querySelector('[data-tab="prep-year"]').textContent = prepYear;
  document.querySelector('[data-tab="year1"]').textContent = year1;
  document.querySelector('[data-tab="year2"]').textContent = year2;
  document.querySelector('[data-tab="year3"]').textContent = year3;
  document.querySelector('[data-tab="year4"]').textContent = year4;
  document.querySelector('[data-tab="year5"]').textContent = year5;
  document.querySelector('[data-tab="year6"]').textContent = year6;

  // Show the timeline section
  document.getElementById("timeline-section").style.display = "block";
});
