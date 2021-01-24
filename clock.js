const clock = document.querySelector(".clock");
const clockDate = clock.querySelector(".date");
const clockTime = clock.querySelector(".time");

function getDate(){
  const date = new Date();
  const years = date.getFullYear();
  const months = date.getMonth() + 1;
  const days = date.getDate();
  clockDate.innerText = `${years} - ${months < 10 ? `0${months}` : months} - ${days < 10 ? `0${days}` : days}`
}

function getTime(){
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  clockTime.innerText = `${hours < 10 ? `0${hours}` : hours} : ${minutes < 10 ? `0${minutes}` : minutes}`
}

function init(){
  getDate();
  getTime();
  setInterval(getDate, 1000);
  setInterval(getTime, 1000);
}

init();