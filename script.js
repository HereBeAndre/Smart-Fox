let countdown;
let secondsLeft;
const counter = document.querySelector('.display_time_left_count');
const alarmTimeValue = document.querySelector('.display_time_left_count').innerHTML;
const stopButton = document.getElementById("stop-button");
const resumeButton = document.getElementById("resume-button");
// ALARM SOUND
const sound = new Audio("audios/alarm.mp3")

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    resumeButton.style.visibility = "visible";
    secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      sound.play();
      sound.loop = true;
      stopButton.hidden = false;
      resumeButton.hidden = true;
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

// RESUME/PAUSE BUTTON

let paused = 0;

resumeButton.addEventListener("click", function(event) {
  // if paused => resume
  if(paused == false) {
    // console.log("I'm paused");
    resumeButton.style.background = "#6eaa93";
    resumeButton.innerHTML = "<i class='far fa-play-circle'></i> Resume";
    clearInterval(countdown);
    paused = 1;
    return;
  };
  // else pause
  if (paused == 1) {
    // console.log("I'm running");
    resumeButton.style.background = "#F1A365";
    resumeButton.innerHTML = "<i class='far fa-pause-circle'></i> Pause";
    timer(secondsLeft);
    paused = false;
  }
});


// FUNCTION TO DISPLAY DATE OF TODAY (not useful for now)
// function setDateOfToday() {
//   const today = new Date;
//   const todayShow = today.getUTCDate();
//   const todayShowMonth = today.getUTCMonth();
//   const todayYear = today.getUTCFullYear();
//   document.querySelector(".date-field").innerHTML = `${todayYear} / ${todayShowMonth} / ${todayShow}`;
// }

// setDateOfToday();
