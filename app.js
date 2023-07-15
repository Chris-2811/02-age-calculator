const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const daysEl = document.getElementById('days');
const monthsEl = document.getElementById('months');
const yearsEl = document.getElementById('years');

const form = document.getElementById('form');
const errorMessage = document.getElementById('error');

console.log(form);

// Check all required fields
function checkRequired(inputArr) {
  let isEmpty = false;

  inputArr.forEach((input) => {
    if (input.value === '') {
      showError(input, 'This field is required');
      isEmpty = true;
    }
  });

  if (!isEmpty) {
    inputArr.forEach((input) => {
      displayResults(input);
    });
  }
}

// Check day
function checkDay(day) {
  const monthWith30Days = [4, 6, 9, 11];
  const dayValue = parseInt(day.value);

  if (monthWith30Days.includes(+month.value)) {
    if (dayValue < 1 || dayValue > 30) {
      showError(day, 'Must be a valid date');
    }
  } else {
    if (dayValue < 1 || dayValue > 31) {
      showError(day, 'Must be a valid date');
    }
  }
}

// Check month
function checkMonth(month) {
  const monthValue = parseInt(month.value);

  if (monthValue < 1 || monthValue > 12) {
    showError(month, 'Must be a valid date');
  }
}

// Check Year
function checkYear(year) {
  const date = new Date();
  const currentYear = date.getFullYear();

  if (year.value > currentYear) {
    showError(year, 'Must be a valid date');
  }
}

// Show Error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';

  const small = formControl.querySelector('small');
  small.innerText = message;
}

// Display results
function displayResults(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control';

  const results = calculateResults();

  daysEl.innerHTML = `<span>${results.day}</span>`;
  monthsEl.innerHTML = `<span>${results.month}</span>`;
  yearsEl.innerHTML = `<span>${results.year}</span>`;

  setTimeout(() => {
    day.value = '';
    month.value = '';
    year.value = '';
  }, 5000);
}

// Calculate Results
function calculateResults() {
  const dayValue = parseInt(day.value);
  const monthValue = parseInt(month.value);
  const yearValue = parseInt(year.value);

  let currentDate = new Date();
  let currentDay = currentDate.getDate();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();

  const monthArr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (dayValue > currentDay) {
    currentDay = currentDay + monthArr[currentMonth - 1];
    console.log(currentDay);
    currentMonth = currentMonth - 1;
  }

  if (monthValue > currentMonth) {
    currentMonth = currentMonth + 12;
    currentYear = currentYear - 1;
  }

  let days = currentDay - dayValue;
  let months = currentMonth - monthValue;
  let years = currentYear - yearValue;

  return {
    day: days,
    month: months,
    year: years,
  };
}

// Format value
function formatValue(input) {
  console.log(input.value);
  if (input.value.length === 1) {
    input.value = `0${input.value}`;
  } else {  
    input.value = input.value;
  }
}

// Add Eventlistener
form.addEventListener('submit', (e) => {
  console.log(e.target);
  e.preventDefault();
  checkRequired([day, month, year]);
  checkDay(day);
  checkMonth(month);
  checkYear(year);
  formatValue(day)
  formatValue(month)

  document.querySelectorAll('.placeholder').forEach((el) => {
    el.classList.add('animate');
    setTimeout(() => {
      el.classList.remove('animate');
    }, 3000);
  });
});

// Limit the input to two and four characters

day.addEventListener('input', (e) => {
  if (day.value.length >= 2) {
    day.value = day.value.slice(0, 2);
  }
});

month.addEventListener('input', (e) => {
  if (month.value.length >= 2) {
    month.value = month.value.slice(0, 2);
  }
});

year.addEventListener('input', (e) => {
  if (year.value.length >= 4) {
    year.value = year.value.slice(0, 4);
  }
});
