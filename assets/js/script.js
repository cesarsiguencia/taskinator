var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");




var createTaskHandler = function(){
  var listItemEl = document.createElement("li");
  tasksToDoEl.appendChild(listItemEl);
  listItemEl.className = "task-item";
  listItemEl.textContent = "This is a new task.";
}

buttonEl.addEventListener("click", createTaskHandler);
