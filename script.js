let countdown;
const counter = document.querySelector('.display_time_left_count');
const alarmTimeValue = document.querySelector('.display_time_left_count').innerHTML;
const stopButton = document.getElementById("stop-btn");
// ALARM SOUND
const sound = new Audio("https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg");
sound.loop = true;

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      sound.play();
      return;
      // Not working yet
      stopButton.addEventListener("click", function() {
        console.log("hello");
        sound.pause();
        sound.currentTime = 0;
      })
    }
    displayTimeLeft(secondsLeft)
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  const counterDisplay = `${minutes} : ${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  counter.textContent = counterDisplay;
}

function setDateOfToday() {
  const today = new Date;
  const todayShow = today.getUTCDate();
  const todayShowMonth = today.getUTCMonth();
  const todayYear = today.getUTCFullYear();
  document.querySelector(".date-field").innerHTML = `${todayYear} / ${todayShowMonth} / ${todayShow}`;
}

setDateOfToday();

document.customForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
})

// PAUSE TIMER BUTTON
// document.getElementById('stop-btn').addEventListener('click', () => {
//    if (countdown)
//      clearInterval(countdown);
//  });
