const taskForm = document.getElementById("toDoForm");
const taskInput = taskForm.querySelector("input");
const pendingList = document.getElementById("toDoList");
const finishedList = document.getElementById("finishList");

const PENDING_LS = "PENDING";
const FINISHED_LS = "FINISHED";

let idNum = 1;
let pendingTasks = [];
let finishedTasks = [];


function switchTasks(event){
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode === pendingList){
    finishedList.appendChild(li);
    btn.innerHTML = "⏪"
    const moveTasks = pendingTasks.filter(function(task){
      return task.id === parseInt(li.id);
    })
    finishedTasks.push(moveTasks[0]);
    const cleanTasks = pendingTasks.filter(function(task){
      return task.id !== parseInt(li.id);
    })
    pendingTasks = cleanTasks;
    saveTasks();
  } else {
    pendingList.appendChild(li);
    btn.innerHTML = "✅";
    const moveTasks = finishedTasks.filter(function(task){
      return task.id === parseInt(li.id);
    })
    pendingTasks.push(moveTasks[0]);
    const cleanTasks = finishedTasks.filter(function(task){
      return task.id !== parseInt(li.id);
    })
    finishedTasks = cleanTasks;
    saveTasks();
  }
  
}


function deleteTasks(event){
  const btn = event.target;
  const li = btn.parentNode;
  if (li.parentNode === pendingList){
    pendingList.removeChild(li);
    const cleanTasks = pendingTasks.filter(function(task){
      return task.id !== parseInt(li.id);
    })
    pendingTasks = cleanTasks;
    saveTasks()
  } else{
    finishedList.removeChild(li);
    const cleanTasks = finishedTasks.filter(function(task){
      return task.id !== parseInt(li.id);
    })
    finishedTasks = cleanTasks;
    saveTasks()
  }
}

function saveTasks(){
  localStorage.setItem(PENDING_LS, JSON.stringify(pendingTasks));
  localStorage.setItem(FINISHED_LS, JSON.stringify(finishedTasks));
}

function paintTask(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const swiBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNum;
  idNum += 1;
  span.innerText = text;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTasks);
  swiBtn.innerHTML = "✅"
  swiBtn.addEventListener("click", switchTasks);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(swiBtn);
  li.id = newId;
  pendingList.appendChild(li);
  const tasksObj = {
    id: newId,
    text: text
  }
  pendingTasks.push(tasksObj);
  saveTasks();
}

function paintFinishTask(text){
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const swiBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = idNum;
  idNum += 1;
  span.innerText = text;
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", deleteTasks);
  swiBtn.innerHTML = "⏪"
  swiBtn.addEventListener("click", switchTasks);
  li.appendChild(span);
  li.appendChild(delBtn);
  li.appendChild(swiBtn);
  li.id = newId;
  finishedList.appendChild(li);
  const tasksObj = {
    id: newId,
    text: text
  }
  finishedTasks.push(tasksObj);
  saveTasks();
}


function handleSubmit(event){
  event.preventDefault();
  const currentValue = taskInput.value;
  paintTask(currentValue);
  taskInput.value = "";
}

function loadTasks(){
  const loadPendingTasks = localStorage.getItem(PENDING_LS);
  const loadFinishedTasks = localStorage.getItem(FINISHED_LS);
  if(loadPendingTasks !== null){
    const parsedPendingTasks = JSON.parse(loadPendingTasks);
    parsedPendingTasks.forEach(function(task){
      paintTask(task.text);
    })
  }
  if(loadFinishedTasks !== null){
    const parsedFinishedTasks = JSON.parse(loadFinishedTasks);
    parsedFinishedTasks.forEach(function(task){
      paintFinishTask(task.text);
    });
  }
}

function init(){
  loadTasks();
  taskForm.addEventListener("submit", handleSubmit);
}

init();