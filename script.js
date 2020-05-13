let countdown;
const counter = document.querySelector('.display_time_left_count');

function timer(seconds) {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if(secondsLeft < 0) {
      clearInterval(countdown);
      return;
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

// ALARM SOUND
const sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
// sound.loop = true;

const alarmTimeValue = document.querySelector('.display_time_left_count').innerText;

function alarmSound() {
  if(alarmTimeValue == "0:00") {
    sound.play();
  }
}
