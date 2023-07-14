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

// Calculate and add to DOM
function calculate(input) {
  if (input.classList.contains('year')) {
    const date = new Date();

    let ageInYears = date.getFullYear() - year.value;
    let ageInMonth = date.getMonth() - (month.value - 1);
    let ageInDays = date.getDate() - day.value;

    if (ageInMonth < 0 || (ageInMonths === 0 && ageInDays < 0)) {
      ageInYears--;
      if (ageInMonth < 0) {
        ageInMonth += 12;
      }
      if (ageInDays < 0) {
        const lastMonthDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() - 1,
          0
        ).getDate();
        ageInDays += lastMonthDate;
      }
    }

    const age = {
      years: ageInYears,
      months: ageInMonth,
      days: ageInDays,
    }

    addToDOM(age)

  }
}

//Add To DOM
function addToDOM(age) {
  console.log(age)
  yearsEl.innerHTML = `<span>${age.years}</span>`
  monthsEl.innerHTML = `<span>${age.months}</span>`
  daysEl.innerHTML = `<span>${age.days}</span>`

  setTimeout(() => {
    year.value = ''
    month.value = ''
    day.value = ''
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
  document.querySelectorAll('.placeholder').forEach(holder => {
     holder.classList.add('animate')

    setTimeout(() => {
      holder.classList.remove('animate')
    }, 3000);
  })
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
