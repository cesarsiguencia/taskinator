var taskIdCounter  = 0;
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");


var taskFormHandler = function(event){

  event.preventDefault(); //- Prevents the refresh of the page when a form submits. Browsers automatically load when forms are submitted

  var taskNameInput = document.querySelector("input[name='task-name']").value;

  var taskTypeInput = document.querySelector("select[name='task-type']").value;

  //check if input values are empty strings
  if (!taskNameInput || !taskTypeInput) {
    alert("You need to fill out the task form!");
    return false; // <-prevents the function from continuing, go back to square one
  }
  formEl.reset();   // <-Resets the form after every click of the btn

  var isEdit = formEl.hasAttribute("data-task-id"); //if we are editing, grab the ID
  console.log(isEdit); // is the editing command true?


    // has data attribute, so get task id and call function to complete edit process
  if (isEdit) {
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNameInput, taskTypeInput, taskId);
  } 
  // no data attribute, so create object as normal and pass to createTaskEl function
  else {
    //package up data as an object, creating new variables for js
    var taskDataObj = {
      name: taskNameInput,
      type: taskTypeInput
    };

  
  //send it as an arguement to createTaskEl
  createTaskEl(taskDataObj); // <- THIS CAUSES THE DATA TO ESCAPE THIS FUNCTIONS BOUNDARY AND GO TO NEXT CLOSE FUNCTIONS BY HAVING ARE VARIABLE GO INTO THE NEXT FUNCTION AS AN ARGUEMENT
  }
};
var completeEditTask = function(taskName, taskType, taskId) {
  console.log(taskName, taskType, taskId);

    // find the matching task list item
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // set new values
  taskSelected.querySelector("h3.task-name").textContent = taskName;
  taskSelected.querySelector("span.task-type").textContent = taskType;

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  
  };


var createTaskEl = function (taskDataObj) {

  //create list item
  var listItemEl = document.createElement("li");
  listItemEl.className = "task-item";

  // add task id as a custom attribute
  listItemEl.setAttribute("data-task-id", taskIdCounter)

  //create div to hold task info and add to list item
  var taskInfoEl = document.createElement("div");
  taskInfoEl.className = "task-info";

  //add HTML content to div
  taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
  listItemEl.appendChild(taskInfoEl)

  var taskActionsEl = createTaskActions(taskIdCounter);
  console.log(taskActionsEl);
  listItemEl.appendChild(taskActionsEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
  // increase task counter for next unique id
  taskIdCounter++;

};



var createTaskActions = function(taskIdNumber) {
  var actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  //create Edit button
  var editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn"
  editButtonEl.setAttribute("data-task-id", taskIdNumber);

  actionContainerEl.appendChild(editButtonEl);

  //create Delete button
  var deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn"
  deleteButtonEl.setAttribute("data-task-id", taskIdNumber);

  actionContainerEl.appendChild(deleteButtonEl);

  var statusSelectEl = document.createElement("select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskIdNumber);



  actionContainerEl.appendChild(statusSelectEl);

  var statusChoices = ["To Do", "In Progress","Completed"];

  for (var i = 0; i < statusChoices.length; i++){
    //create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    //append to select

    statusSelectEl.appendChild(statusOptionEl);
  }

  return actionContainerEl;
}




formEl.addEventListener("submit", taskFormHandler); // <--- EXECUTE THE ENTIRE FUNCTION ABOVE, submit refers to the form listening action.

//ADDING EFFECTS

//CAPTURING THE ELEMENT WE WANT USING OUR NEWLY CREATED ATTRIBUTE IN JS

var taskButtonHandler = function(event){
  console.log(event.target);
  //get target element from event, so that it can be used in multiple IF statements
  var targetEl = event.target;

  //creating an even where .edit btn is touched
  if (targetEl.matches(".edit-btn")){
    var taskId= event.target.getAttribute('data-task-id');
    console.log(taskId);
    editTask(taskId);
    //edit button was clicked
  }
  
  //CREATING AN EVENT WHERE .DELETE BTN IS TOUCHED
  else if (targetEl.matches(".delete-btn")){
    console.log("you clicked a delete button!");
    //get the element's correct task id
    var taskId = event.target.getAttribute("data-task-id");
    console.log(taskId);
    deleteTask(taskId);
    //delete button was clicked
  } 


};

pageContentEl.addEventListener("click", taskButtonHandler)
//gives functionality that anything in the MAIN body is clicked and has a certain purpose based on what is clicked

var editTask = function(taskId){
   //selecting the LI element through .task-item and using the data-task-id attribute with number to grab the correct LI that we are trying to edit.
  var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
  console.log(taskSelected)
  //get content froom task name and type
  var taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

  var taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;

  document.querySelector("#save-task").textContent = "Save Task";

  formEl.setAttribute("data-task-id", taskId);

}



var deleteTask = function(taskId){
  //selecting the LI element through .task-item and using the data-task-id attribute with number to grab the correct LI that we are trying to delete. 
  var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
  console.log(taskSelected);
  //removing the selected LI through the new variable for good 
  taskSelected.remove();
  
 
};

var taskStatusChangeHandler = function(event){
  console.log(event.target);
  console.log(event.target.getAttribute("data-task-id"));

  // get the task item's id
  var taskId = event.target.getAttribute("data-task-id");

  // get the currently selected option's value and convert to lowercase
  var statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  } 
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }  
}

pageContentEl.addEventListener("change", taskStatusChangeHandler);




