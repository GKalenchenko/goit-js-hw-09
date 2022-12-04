import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
//----------------------------------------------------------------------------------------------------
const startBtnRef = document.querySelector('[data-start]');
const ONEMS = 1000;
const refs = {
  input: document.getElementById('datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const dateNow = new Date();
    if (dateNow > selectedDates[0]) {
      Notiflix.Notify.warning('Please choose a date in the future');
      return;
    }
    startBtnRef.removeAttribute('disabled');
  },
};
flatpickr('#datetime-picker', options);
startBtnRef.setAttribute('disabled', 'disabled');

refs.button.addEventListener('click', callback);

function callback() {
  const id = setInterval(() => {
    const { days, hours, minutes, seconds, input } = refs;
    const dateNow = new Date();
    const selectedDate = new Date(input.value);
    const currentTime = selectedDate - dateNow.getTime();
    const timerValue = convertMs(currentTime);

    days.textContent = addLeadingZero(timerValue.days);
    hours.textContent = addLeadingZero(timerValue.hours);
    minutes.textContent = addLeadingZero(timerValue.minutes);
    seconds.textContent = addLeadingZero(timerValue.seconds);

    if (currentTime < ONEMS) {
      clearInterval(id);
    }
  });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
