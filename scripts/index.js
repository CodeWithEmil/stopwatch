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

let countMinutes = 0;
let countSeconds = 0;
let countMiliseconds = 0;

function startStopwatch() {
   if (!isStopwatchRunning) {
      inverval = setInterval(() => {
         if (countMiliseconds <= 99) {
            countMiliseconds++;
         } else {
            countMiliseconds = 0;
            
            if (countSeconds < 59) {
               countSeconds++;
            } else {
               countMinutes++;
               countSeconds = 0;
            }
         }

         operatingText();
      }, 10);


      disableButton("start", "stop")
      isStopwatchRunning = true;
   }
}

function operatingText() {
   const stopwatchEl = document.querySelector(".js-stopwatch");

   let messageMinutes;
   let messageSeconds;
   let messageMiliseconds;

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
      messageMiliseconds = `0${countMiliseconds}`;
   } else {
      messageMiliseconds = countMiliseconds;
   }

   stopwatchEl.innerHTML = `<p>${messageMinutes}:${messageSeconds}:${messageMiliseconds}</p>`;
}

function stopStopwatch() {
   if (isStopwatchRunning) {
      clearInterval(inverval);

      disableButton("stop", "start");
      isStopwatchRunning = false;
   }
}

function disableButton(classOne, classTwo) {
   document.querySelector(`.js-${classOne}-button`).classList.add("disabled");
   document.querySelector(`.js-${classTwo}-button`).classList.remove("disabled");
}