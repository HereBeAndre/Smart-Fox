let countdown;
const counter = document.querySelector('.display_time_left_count');
const alarmTimeValue = document.querySelector('.display_time_left_count').innerHTML;
const stopButton = document.getElementById("stop-btn");
// ALARM SOUND
const sound = new Audio("audios/alarm.mp3")

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
      sound.loop = true;
      stopButton.hidden = false;
      return;
    }
    displayTimeLeft(secondsLeft)
  }, 1000);
}

stopButton.addEventListener("click", function() {
  sound.pause();
  sound.currentTime = 0;
})

function hideStopButton() {
  stopButton.hidden = true;
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  const counterDisplay = `${minutes} : ${remainingSecs < 10 ? "0" : ""}${remainingSecs}`;
  counter.textContent = counterDisplay;
}

// FUNCTION TO DISPLAY DATE OF TODAY (NOT USEFUL IMO)
// function setDateOfToday() {
//   const today = new Date;
//   const todayShow = today.getUTCDate();
//   const todayShowMonth = today.getUTCMonth();
//   const todayYear = today.getUTCFullYear();
//   document.querySelector(".date-field").innerHTML = `${todayYear} / ${todayShowMonth} / ${todayShow}`;
// }

// setDateOfToday();

document.customForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const minutes = this.minutes.value;
  if(minutes < 1) {
    alert("Value must be greater than 1");
    this.reset();
    return;
  }
  else if(isNaN(minutes)) {
    alert("Please enter a number");
    this.reset();
    return;
  }
  timer(minutes * 60);
  this.reset();
})

// PAUSE TIMER BUTTON
// document.getElementById('stop-btn').addEventListener('click', () => {
//    if (countdown)
//      clearInterval(countdown);
//  });
