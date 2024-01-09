//* Event listeners
let startEvent = document.querySelector(".js-start-button").addEventListener("click", () => {
   startStopwatch();
})

let stopEvent = document.querySelector(".js-stop-button").addEventListener("click", () => {
   stopStopwatch();
});


//* Global variables
let isStopwatchRunning = false;

let interval;

let countHours = 0;
let countMinutes = 0;
let countSeconds = 0;
let countMiliseconds = 0;

function startStopwatch() {
   if (!isStopwatchRunning) {
      interval = setInterval(() => {
         if (countMiliseconds <= 999) {
            countMiliseconds+=Math.round(4.1);
         } else {
            countMiliseconds = 0;

            if (countSeconds < 59) {
               countSeconds++;
            } else {
               countSeconds = 0;

               if (countMinutes < 59) {
                  countMinutes++;
               } else {
                  countMinutes = 0;
                  countHours++;
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
   const timeEl = document.querySelector(".js-stopwatch-seconds");
   const milisecondsEl = document.querySelector(".js-stopwatch-miliseconds");

   let messageHours;
   let messageMinutes;
   let messageSeconds;
   let messageMiliseconds;

   if (countHours <= 9) {
      messageHours = `0${countHours}`;
   } else {
      messageHours = countHours;
   }

   if (countMinutes <= 9) {
      messageMinutes = `0${countMinutes}`;
   } else {
      messageMinutes = countMinutes;
   }

   if (countSeconds <= 9) {
      messageSeconds = `0${countSeconds}`;
   } else {
      messageSeconds = countSeconds;
   }

   if (countMiliseconds <= 9) {
      messageMiliseconds = `00${countMiliseconds}`;
   } else if (countMiliseconds <= 99) {
      messageMiliseconds = `0${countMiliseconds}`;
   } else {
      messageMiliseconds = countMiliseconds;
   }

   timeEl.innerHTML = `<p>${messageHours}:${messageMinutes}:${messageSeconds}</p>`;
   milisecondsEl.innerHTML = `<p class = "stopwatch-miliseconds js-stopwatch-miliseconds">${messageMiliseconds}</p>`;
}

function stopStopwatch() {
   if (isStopwatchRunning) {
      clearInterval(interval);

      disableButton("stop", "start");
      isStopwatchRunning = false;
   }
}

function disableButton(classOne, classTwo) {
   document.querySelector(`.js-${classOne}-button`).classList.add("disabled");
   document.querySelector(`.js-${classTwo}-button`).classList.remove("disabled");
}