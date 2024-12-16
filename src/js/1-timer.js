import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const date = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
const day = document.querySelector('[data-days]');
const hour = document.querySelector('[data-hours]');
const min = document.querySelector('[data-minutes]');
const sec = document.querySelector('[data-seconds]');
button.disabled = true;
let userSelectedDate = null;
let timerId = null;

flatpickr(date, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);
    console.log(selectedDates);
    if (userSelectedDate < new Date()) {
      button.disabled = true;
      resetTimer();
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'bottomRight',
      });
    } else {
      button.disabled = false;
      iziToast.success({
        title: 'Success',
        message: 'Now you can press Start ;)',
        position: 'bottomRight',
      });
      updateTimer();
    }
  },
});

button.addEventListener('click', startCountdown);

function startCountdown() {
  button.disabled = true;
  date.disabled = true;

  timerId = setInterval(() => {
    if (!updateTimer()) {
      resetTimer();
      iziToast.info({
        title: 'Done',
        message: 'The countdown has finished!',
        position: 'bottomRight',
      });
    }
  }, 1000);
}

function updateTimer() {
  const diff = userSelectedDate.getTime() - Date.now();
  if (diff <= 0) {
    resetTimer();
    return false;
  }
  const { days, hours, minutes, seconds } = convertMs(diff);
  updateTimerDisplay(days, hours, minutes, seconds);
  return true;
}

function updateTimerDisplay(days, hours, minutes, seconds) {
  day.textContent = addLeadingZero(days);
  hour.textContent = addLeadingZero(hours);
  min.textContent = addLeadingZero(minutes);
  sec.textContent = addLeadingZero(seconds);
}

function resetTimer() {
  updateTimerDisplay(0, 0, 0, 0);
  clearInterval(timerId);
  date.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return `${value}`.padStart(2, '0');
}
