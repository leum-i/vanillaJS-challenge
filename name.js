const nameForm = document.querySelector(".nameForm");
const nameInput = nameForm.querySelector("input");
const displayName = document.querySelector(".displayName");

const USER_LS = "currentUser";
const SHOWING = "showing";

function saveName(text){
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event){
  event.preventDefault();
  const currentValue = nameInput.value;
  showName(currentValue);
  saveName(currentValue);
}

function askForName(){
  nameForm.classList.add(SHOWING);
  nameForm.addEventListener("submit", handleSubmit);
}

function showName(text){
  nameForm.classList.remove(SHOWING);
  displayName.classList.add(SHOWING);
  displayName.innerText = `Hi ${text}!`;
}

function loadName(){
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null){
    askForName();
  } else {
    showName(currentUser);
  }
}

function init(){
  loadName();
}

init();