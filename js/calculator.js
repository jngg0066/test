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

// Function to show content bounce
function showContentBounce(that) {
  $hasBounced = true;
  that.find('.timeline-content').addClass('animated bounceIn');
}

// Function to show bounce
function showBounce(pos) {
  $dropDown.css('left', pos + 'px').removeClass('fadeOut').addClass('animated bounceIn');
}

// Function to follow dropdown
function dropDownFollow(pos) {
  $dropDown.css('left', pos + 'px');
}

// Function to hide dropdown
function hideDropDown() {
  $timelineItem.removeClass('selected');
  $dropDown.removeClass('bounceIn').addClass('fadeOut');
}

document.getElementById('calc-entry-year-btn').addEventListener('click', function() {
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

  // Highlight corresponding timeline item
  $('.timeline-item').removeClass('selected');
  if (prepEntryYear !== '-') {
      $('.timeline-item:nth-child(' + (prepEntryYear - birthYear) + ')').addClass('selected');
  } else if (primarySchoolEntryYear !== '-') {
      $('.timeline-item:nth-child(' + (primarySchoolEntryYear - birthYear) + ')').addClass('selected');
  } else if (highSchoolEntryYear !== '-') {
      $('.timeline-item:nth-child(' + (highSchoolEntryYear - birthYear) + ')').addClass('selected');
  }
});

// mouseenter event handler
$timelineItem.on('mouseenter', function(e) {

  var isSelected = $(this).hasClass('selected');

  if (isSelected === false) {

      var leftPos = $(this).position().left,
          left = leftPos - 88,
          $that = $(this);

      $timelineItem.removeClass('selected');
      $(this).addClass('selected');

      if ($hasHovered === false) {
          // Show Bounce

          // Set Flag
          $hasHovered = true;

          // Show DD Bounce
          showBounce(left);

          // Show DD content Bounce
          showContentBounce($that);

      } else {
          // Follow

          // Change pos of DD to follow
          dropDownFollow(left);

          // Hide previous dd content
          $timelineContent.removeClass('animated fadeIn bounceIn');

          // Show hovered dd content
          $that.find($timelineContent).addClass('animated fadeIn');
      }
  }

});

// mouseleave event handler
$timeline.on('mouseleave', function(e) {

  if (hideOnExit) {

      //   Set Flag
      $hasHovered = false;

      // Hide DD
      hideDropDown();

      // Hide DD content
      $timelineContent.removeClass('animated fadeIn');

  }

});

// Animation end event listener
$dropDown.on(prefixes, function(e) {

  if (e.originalEvent.animationName === 'fadeOut') {
      $dropDown.removeAttr('style');
  }

});
