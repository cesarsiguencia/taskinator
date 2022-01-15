var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event){

  event.preventDefault(); //- I DONT KNOW WHAT THIS IS

  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false; // <-prevents the function from adding a blank "li" if the form is filled out empty
  }
  formEl.reset();   // <-Resets the form after every click of the btn

  //package up data as an object, creating new variables for js
  var taskDataObj = {
    name: taskNameInput,
    type: taskTypeInput
  };

  //send it as an arguement to createTaskEl
  createTaskEl(taskDataObj); // <- THIS CAUSES THE DATA TO ESCAPE THIS FUNCTIONS BOUNDARY AND GO TO NEXT CLOSE FUNCTIONS BY HAVING ARE VARIABLE GO INTO THE NEXT FUNCTION AS AN ARGUEMENT

};

var createTaskEl = function (taskDataObj) {

  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl)

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
  
};




formEl.addEventListener("submit", taskFormHandler); // <--- EXECUTE THE ENTIRE FUNCTION ABOVE, I don't know what submit is though

