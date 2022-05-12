import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
const btnStart = document.querySelector('[data-start]');
const refs = {
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};
btnStart.disabled = true;

flatpickr("#datetime-picker", {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        
        dataCheck(selectedDates[0]);
        // btnStart.addEventListener('click', ()=>{dataCheck(selectedDates[0])});
  },
});



function dataCheck(value) {
    const deadline = value;
    const date = new Date();
    if (deadline < date) {
        btnStart.disabled = true;
        window.alert("Please choose a date in the future");
    }
    else {
        btnStart.disabled = false;
        btnStart.addEventListener('click', ()=>{countTimer(value)});
        // countTimer(value)
    }   
};


function countTimer(value) {
    
    setInterval(() => {
        const deadline = value;
        const date = new Date();
        const timerTime = convertMs(deadline.getTime()-date.getTime());
        refs.days.textContent = timerTime.days;
        refs.hours.textContent = timerTime.hours;
        refs.minutes.textContent = timerTime.minutes;
        refs.seconds.textContent = timerTime.seconds;
        console.log(convertMs(deadline.getTime()-date.getTime()));
    }, 1000)
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};


function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};
