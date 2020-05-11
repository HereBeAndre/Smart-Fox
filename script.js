let countdown;
const counter = document.querySelector('.display_time_left_count');
// const dateOfToday = document.querySelector(".date-field");
const valueOfForm = document.getElementById('submitButton');

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
  // dateOfToday.textContent = `${todayShow} - ${todayShowMonth}`;
}

setDateOfToday();

document.customForm.addEventListener("submit", function(event) {
  event.preventDefault();
  const minutes = this.minutes.value;
  timer(minutes * 60);
  this.reset();
  })
document.getElementById('submitButton').addEventListener("click", function(event) {
  event.preventDefault();
  const minutes = valueOfForm.value;
  console.log(minutes);
  // console.log(minutes);
})
