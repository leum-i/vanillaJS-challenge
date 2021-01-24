const body = document.querySelector("body");

const colorPalette = ["#8adfe3", "#55c5d1", "#4699c2", "#ffd574", "#f79c65", "#fc8476", "#faf1d6", "#fad4ae", "#fdafab", "#fadee1", "#d9f1f1", "#b6e3e9"]
const colorNum = colorPalette.length;

function paintColor(num){
  body.style.backgroundColor = colorPalette[num];
}

function getRandom(){
  const number = Math.floor(Math.random() * colorNum);
  return number;
}

function init(){
  const randomNumber = getRandom();
  paintColor(randomNumber);
}

init();