//* Event listeners
let startEvent = document.querySelector(".js-start-button").addEventListener("click", () => {
   startStopwatch();
})

let stopEvent = document.querySelector(".js-stop-button").addEventListener("click", () => {
   stopStopwatch();
});

const resetEvent = document.querySelector(".js-reset-button").addEventListener("click", () => {
   resetStopwatch();
})


document.addEventListener("keydown", (event) => {
   if (event.key === " " || event.key === "Enter") {
      if (isStopwatchRunning === false) {
         startStopwatch();
      } else {
         stopStopwatch();
      }
   } else if (event.key === "Backspace") {
      resetStopwatch();
   }
})


//* Global variables
let isStopwatchRunning = false;
let interval;

let countTime = {
   hours: 0,
   minutes: 0,
   seconds: 0,
   miliseconds: 0
}

/*let countHourds = 0;
let countMinuteds = 0;
let countSecondds = 0;
let countMilisecondds = 0;*/

function startStopwatch() {
   //Starting the stopwatch: if the milisecond time is greater than 999 (1 second), the milisecond time is reset and increases seconds by one. This same logic is applied from seconds to minutes and minutes to hours

   if (!isStopwatchRunning) {
      interval = setInterval(() => {
         if (countTime.miliseconds <= 998) {
            countTime.miliseconds+=Math.round(4.1);
            //countTime.miliseconds++;
         } else {
            countTime.miliseconds = 0;

            if (countTime.seconds < 59) {
               countTime.seconds++;
            } else {
               countTime.seconds = 0;

               if (countTime.minutes < 59) {
                  countTime.minutes++;
               } else {
                  countTime.minutes = 0;
                  countTime.hours++;
               }
            }
         }

         operatingText();
      }, 1);

      document.querySelector(".js-stopwatch-miliseconds").classList.add("stopwatch-miliseconds-margin-reduced");
      disableButton("start", "stop")
      isStopwatchRunning = true;
   }
}

function operatingText() {
   //Function declared to manage the text and the way it is displayed: basically adding 0's in front of the seconds display case they're needed (when the value is less than 10)

   const timeEl = document.querySelector(".js-stopwatch-seconds");
   const milisecondsEl = document.querySelector(".js-stopwatch-miliseconds");

   let messageHours;
   let messageMinutes;
   let messageSeconds;
   let messageMiliseconds;

   if (countTime.hours <= 9) {
      messageHours = `0${countTime.hours}`;
   } else {
      messageHours = countTime.hours;
   }

   if (countTime.minutes <= 9) {
      messageMinutes = `0${countTime.minutes}`;
   } else {
      messageMinutes = countTime.minutes;
   }

   if (countTime.seconds <= 9) {
      messageSeconds = `0${countTime.seconds}`;
   } else {
      messageSeconds = countTime.seconds;
   }

   if (countTime.miliseconds <= 9) {
      messageMiliseconds = `00${countTime.miliseconds}`;
   } else if (countTime.miliseconds <= 99) {
      messageMiliseconds = `0${countTime.miliseconds}`;
   } else {
      messageMiliseconds = countTime.miliseconds;
   }

   timeEl.innerHTML = `<p>${messageHours}:${messageMinutes}:${messageSeconds}</p>`;
   milisecondsEl.innerHTML = `<p class = "stopwatch-miliseconds js-stopwatch-miliseconds">${messageMiliseconds}</p>`;
}

function stopStopwatch() {
   //Stopping the stopwatch

   if (isStopwatchRunning) {
      clearInterval(interval);

      disableButton("stop", "start");
      isStopwatchRunning = false;
   }
}

function disableButton(classOne, classTwo) {
   //Basically taking the pressed button and giving it the class "disabled" (makes button unclickable), and removing it from the other button

   document.querySelector(`.js-${classOne}-button`).classList.add("disabled");
   document.querySelector(`.js-${classTwo}-button`).classList.remove("disabled");
}

function resetStopwatch() {
   //Function resetting the stopwatch and all the adjount values from the countTime object, ass well as intervals and CSS classess

   clearInterval(interval);
   interval = null;

   isStopwatchRunning = false;

   countTime = { ...countTime, hours: 0, minutes: 0, seconds: 0, miliseconds: 0 };

   /*countTime.hours = 0;
   countTime.minutes = 0;
   countTime.seconds = 0;
   countTime.miliseconds = 0;*/

   document.querySelector(".js-start-button").classList.remove("disabled");
   document.querySelector(".js-stop-button").classList.remove("disabled");

   document.querySelector(".js-reset-button").classList.add("reset-button-active");
   setTimeout(() => {
      document.querySelector(".js-reset-button").classList.remove("reset-button-active");
   }, 200);

   operatingText();
}