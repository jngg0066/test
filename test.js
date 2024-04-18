// Function to calculate entry year for primary school
function calculateEntryYear(birthYear) {
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  // If the child is younger than 6 or not born yet
  if (age < 6) {
    return currentYear + (6 - age); // They will start primary school when they turn 6
  }

  // Calculate entry year even if the child is older than primary school age
  return currentYear - age + 6; // They started at age 6
}

function calculatePrepEntryYear(birthYear, birthMonth, birthDay) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const isBirthDateAfterApril30th =
    birthMonth > 3 || (birthMonth === 3 && birthDay > 30);

  if (isBirthDateAfterApril30th) {
    return currentYear + (5 - (currentYear - birthYear));
  } else {
    return currentYear + (4 - (currentYear - birthYear));
  }
}
// Function to calculate entry year for High School
function calculateHighSchoolEntryYear(birthYear) {
  return birthYear + 12; // High School starts 12 years after birth year
}

// Function to update the output for each type of school
function updateOutput(entryYear, outputElementId) {
  const entryYearElement = document.getElementById(outputElementId);

  if (entryYear !== null) {
    entryYearElement.textContent = entryYear;
  } else {
    entryYearElement.textContent = "-";
  }
}

document.getElementById('calc-entry-year-btn').addEventListener('click', function () {
  const birthDate = new Date(document.getElementById('birth-year-input').value);
  const birthYear = birthDate.getFullYear();
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();

  const prepEntryYear = calculatePrepEntryYear(birthYear, birthMonth, birthDay);
  const primarySchoolEntryYear = calculateEntryYear(birthYear);
  const highSchoolEntryYear = calculateHighSchoolEntryYear(birthYear);

  updateOutput(prepEntryYear, "prep-years");
  updateOutput(primarySchoolEntryYear, "primary-school-years");
  updateOutput(highSchoolEntryYear, "high-school-years");
});