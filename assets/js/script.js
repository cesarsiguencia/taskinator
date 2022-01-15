var taskIdCounter  = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content")

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
//CREATING AN EVENT WHERE .DELETE BTN IS TOUCHED
  if (event.target.matches(".delete-btn")){
    console.log("you clicked a delete button!");
    //get the element's correct task id
    var taskId = event.target.getAttribute("data-task-id");
    console.log(taskId);
    deleteTask(taskId);
  }

};

pageContentEl.addEventListener("click", taskButtonHandler)

var deleteTask = function(taskId){
  //selecting the LI element through .task-item and using the data-task-id attribute with number to grab the correct LI that we are trying to delete. 
  var taskSelected = document.querySelector(".task-item[data-task-id='"+ taskId + "']");
  console.log(taskSelected);
  //removing the selected LI for good
  taskSelected.remove();
  
 
};




