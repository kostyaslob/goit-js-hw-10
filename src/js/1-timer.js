import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import warningIcon from "../img/warning-icon.svg";

const input = document.querySelector("#datetime-picker");
const startButton = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let userSelectedDate = null;
let timerInterval = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedTime = selectedDates[0];
    if (selectedTime <= new Date()) {
        iziToast.show({
            title: "Error",
            titleColor: "#fff", 
            titleSize: "16px",
            titleLineHeight: "1.5",

            message: `Please choose a date in the future`,
            messageColor: "#fff",
            messageSize: "16px",
            messageLineHeight: "1.5",

            backgroundColor: "#ef4040",
            iconUrl: warningIcon,        

            progressBar: false,
            position: "topRight",
         });
      startButton.disabled = true;
    } else {
      userSelectedDate = selectedTime;
      startButton.disabled = false;
    }
  },
};

flatpickr(input, options);

startButton.addEventListener("click", () => {
  startButton.disabled = true;
  input.disabled = true;
  
  timerInterval = setInterval(() => {
    const timeLeft = userSelectedDate - new Date();
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      input.disabled = false;
      startButton.disabled = true;
      updateTimerUI(0, 0, 0, 0);
      return;
    }
    
    const { days, hours, minutes, seconds } = convertMs(timeLeft);
    updateTimerUI(days, hours, minutes, seconds);
  }, 1000);
});

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
  return String(value).padStart(2, "0");
}

function updateTimerUI(days, hours, minutes, seconds) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMinutes.textContent = addLeadingZero(minutes);
  dataSeconds.textContent = addLeadingZero(seconds);
}
