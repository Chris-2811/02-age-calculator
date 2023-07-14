const day = document.getElementById('day');
const month = document.getElementById('month');
const year = document.getElementById('year');

const daysEl = document.getElementById('days');
const monthsEl = document.getElementById('months');
const yearsEl = document.getElementById('years');

const form = document.getElementById('form');
const errorMessage = document.getElementById('error');

// Show error
function showError(item, message) {
  const formControl = item.parentElement;
  formControl.className = 'form-control error';

  const small = item.parentElement.querySelector('small');
  small.innerText = message;
}

// Show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control';
}

// Check required fields
function checkRequired(inputArr) {
  console.log(inputArr);
  inputArr.forEach((item) => {
    if (item.value === '') {
      showError(item, 'This field is required');
    } else {
      checkIfValid(1, 31, day);
      checkIfValid(1, 12, month);
      checkYear(year);
    }
  });
}

// Check if valid
function checkIfValid(min, max, input) {
  if (input.value < min || input.value > max) {
    showError(input, 'Must be a valid date');
  } else {
    showSuccess(input);
    addToDOM(input);
  }
}

// check if year is valid
function checkYear(input) {
  const date = new Date();
  const currentYear = date.getFullYear();

  if (input.value > currentYear) {
    showError(input, 'Must be a valid date');
  } else {
    showSuccess(input);
    calculate(input);
  }
}


function calculate(input) {
  if (input.classList.contains('year')) {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const year = parseInt(document.querySelector('.year').value);
    const month = parseInt(document.querySelector('.month').value);
    const day = parseInt(document.querySelector('.day').value);

    let ageInYears = currentYear - year;
    let ageInMonths = currentMonth - month;
    let ageInDays = currentDay - day;

    if (currentMonth < month || (currentMonth === month && currentDay < day)) {
      ageInYears--;
      if (currentMonth < month) {
        ageInMonths = 12 - (month - currentMonth);
      } else {
        ageInMonths = 11;
      }

      const lastMonthDate = new Date(currentYear, currentMonth - 1, 0).getDate();
      const remainingDays = lastMonthDate - day + currentDay;
      ageInDays = remainingDays < lastMonthDate ? remainingDays : 0;
    }

    const age = {
      years: ageInYears,
      months: ageInMonths,
      days: ageInDays,
    };

    addToDOM(age);
  }
}





//Add To DOM
function addToDOM(age) {
  console.log(age);
  yearsEl.innerHTML = `<span>${age.years}</span>`;
  monthsEl.innerHTML = `<span>${age.months}</span>`;
  daysEl.innerHTML = `<span>${age.days}</span>`;

  setTimeout(() => {
    year.value = '';
    month.value = '';
    day.value = '';
  }, 3000);
}

// Limit input length
function limitInputLength() {
  let inputValue = this.value;

  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 2);
    this.value = inputValue;
  }
}

// limit input for year
function limitInputLength4() {
  let inputValue = this.value;

  if (inputValue.length > 2) {
    inputValue = inputValue.slice(0, 4);
    this.value = inputValue;
  }
}

// Add Eventlistener
form.addEventListener('submit', (e) => {
  e.preventDefault();
  checkRequired([day, month, year]);
  document.querySelectorAll('.placeholder').forEach((holder) => {
    holder.classList.add('animate');

    setTimeout(() => {
      holder.classList.remove('animate');
    }, 3000);
  });
});

day.addEventListener('input', limitInputLength);
month.addEventListener('input', limitInputLength);
year.addEventListener('input', limitInputLength4);

day.addEventListener('change', (e) => {
  let value = day.value;
  if (value < 10) {
    day.value = '0' + value;
  }
});
