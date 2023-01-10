function countDeadline(deadline) {
   const monthsEl = document.querySelector('[data-monts] .counter__number');
   const daysEl = document.querySelector('[data-days] .counter__number');
   const hoursEl = document.querySelector('[data-hours] .counter__number');
   const minutsEl = document.querySelector('[data-minutes] .counter__number');
   const secondsEl = document.querySelector('[data-seconds] .counter__number');
   if (secondsEl && minutsEl && hoursEl && daysEl && monthsEl) {
      const intervalId = setInterval(updateClock, 1000);
      updateClock();

      function updateClock() {
         const time = countdown(deadline);
         monthsEl.textContent = time.months;
         daysEl.textContent = time.days;
         hoursEl.textContent = time.hours;
         minutsEl.textContent = time.minutes;
         secondsEl.textContent = time.seconds;
         if (time.timestamp <= 0) {
            daysEl.textContent =
               hoursEl.textContent =
               minutsEl.textContent =
               secondsEl.textContent = "00";

            clearInterval(intervalId);
         }
      }
   }
}

function countdown(deadline) {
   const currentDate = Date.now();
   const deadlineDate = new Date(deadline);
   const timestamp = deadlineDate - currentDate,
      diffSec = timestamp / 1000,
      seconds = Math.floor(diffSec % 60),
      minutes = Math.floor(diffSec / 60 % 60),
      hours = Math.floor(diffSec / 60 / 60 % 24),
      days = Math.floor(diffSec / 60 / 60 / 24 % 30),
      months = Math.floor(diffSec / 60 / 60 / 24 / 30)

   return {
      timestamp,
      seconds: addZero(seconds),
      minutes: addZero(minutes),
      hours: addZero(hours),
      days: addZero(days),
      months: addZero(months),
   }
}

function addZero(num) {
   return ('00' + num).slice(-2);
}

const date = new Date();
date.setMonth(date.getMonth() + 3);
countDeadline(date);