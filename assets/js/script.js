var taskIdCounter  = 0;
var formEl = document.querySelector("#task-form");
var pageContentEl = document.querySelector("#page-content")
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var tasks = [];


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

  var isEdit = formEl.hasAttribute("data-task-id"); //if we are editing, grab the ID/ if no attribute created yet, the new list is being created and we'll see this in the IF below
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
      type: taskTypeInput,
      status: "to do"
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

  // loop through tasks array and task object with new content
  for (var i = 0; i < tasks.length; i++) {
  if (tasks[i].id === parseInt(taskId)) {
    tasks[i].name = taskName;
    tasks[i].type = taskType;
  }
};

  alert("Task Updated!");

  formEl.removeAttribute("data-task-id");
  document.querySelector("#save-task").textContent = "Add Task";

  saveTasks();
  };


var createTaskEl = function (taskDataObj) {
  console.log(taskDataObj);
  console.log(taskDataObj.status);
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

  taskDataObj.id = taskIdCounter;

  tasks.push(taskDataObj);

  var taskActionsEl = createTaskActions(taskIdCounter);
  console.log(taskActionsEl);
  listItemEl.appendChild(taskActionsEl);

  //add entire list item to list
  tasksToDoEl.appendChild(listItemEl);
  
  // increase task counter for next unique id
  taskIdCounter++;

  saveTasks();
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

  //creating an event where .edit btn is touched
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
  
    // create new array to hold updated list of tasks
  var updatedTaskArr = [];

  // loop through current tasks
  for (var i = 0; i < tasks.length; i++) {
    // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
    if (tasks[i].id !== parseInt(taskId)) {
      updatedTaskArr.push(tasks[i]);
    }
  }

  // reassign tasks array to be the same as updatedTaskArr
  tasks = updatedTaskArr;
  
  saveTasks();
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

    // update task's in tasks array
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
}
saveTasks();
}

pageContentEl.addEventListener("change", taskStatusChangeHandler);

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Gets task items from localStorage.

// Converts tasks from the string format back into an array of objects.

// Iterates through a tasks array and creates task elements on the page from it.


var loadTasks = function(){
  var savedTasks = localStorage.getItem("tasks");

  if (!savedTasks){
    return false;
  }
  console.log(savedTasks)
  savedTasks = JSON.parse(savedTasks);
  console.log(savedTasks)

  for (var i=0; i < savedTasks.length; i++){
    createTaskEl(savedTasks[i])
  }



 //=================================
 //LONG METHOD

  // if(tasks === null){ //also write as !tasks
  //   tasks = []
  //   return false
  // }

  // tasks = JSON.parse(tasks);

  // for (var i = 0; i < tasks.length; i++){
  //   console.log(tasks[i]);
  //   tasks[i].id = taskIdCounter;

  //   var listItemEl = document.createElement("li");
  //   listItemEl.className = "task-item";
  //   listItemEl.setAttribute("data-task-id",tasks[i].id)
  //   console.log(listItemEl)

  //   var taskInfoEl = document.createElement("div");
  //   taskInfoEl.className = "task-info";
  //   taskInfoEl.innerHTML = "<h3 class='task-name'>" + tasks[i].name + "</h3><span class='task-type'>" + tasks[i].type + "</span>";

  //   listItemEl.appendChild(taskInfoEl)

  //   var taskActionsEl = createTaskActions(tasks[i].id)

  //   listItemEl.appendChild(taskActionsEl);
  //   console.log(listItemEl)

  //   if (tasks[i].status === "to do"){
  //     listItemEl.querySelector("select[name='status-change']").selectedIndex = 0;

  //     tasksToDoEl.appendChild(listItemEl);
  //   } 
  //   else if (tasks[i].status === "in-progress"){
  //     listItemEl.querySelector("select[name='status-change']").selectedIndex = 1

  //     tasksInProgressEl.appendChild(listItemEl);
  //   } else if (tasks[i].status === "complete"){
  //     listItemEl.querySelector("select[name='status-change']").selectedIndex = 2

  //     tasksCompletedEl.appendChild(listItemEl);
  //   }

  //   taskIdCounter++

  // }



  // var tasks = savedTasks

  // if (!savedTasks) {
  //   return false;
  // }

  // savedTasks = JSON.parse(savedTasks);

  //   // loop through savedTasks array
  // for (var i = 0; i < savedTasks.length; i++) {
  //   // pass each task object into the `createTaskEl()` function
  //   createTaskEl(savedTasks[i]);
  //   console.log(savedTasks[i]);
  // }

  // savedTasks[i] = taskIdCounter

  // var listItemEl = document.createElement("li");
  // listItemEl.className = "task-item";

  // // add task id as a custom attribute
  // listItemEl.setAttribute("data-task-id", savedTasks[i])

  // var taskInfoEl = document.createElement("div");
  // taskInfoEl.className = "task-info";

  // taskInfoEl.innerHTML = "<h3 class='task-name'>" + savedTasks[i].name + "</h3><span class='task-type'>" + savedTasks[i].type + "</span>";
  // listItemEl.appendChild(taskInfoEl)

  // if (savedTasks[i].status === "to do"){
  //   listItemEl.querySelector("select[name='status-change']").selectedIndex=0
  //   listItemEl.appendChild(tasksToDoEl);
  // } else if (savedTasks[i].status === "in progress"){
  //   listItemEl.querySelector("select[name='status-change']").selectedIndex=1
  //   listItemEl.appendChild(tasksInProgressEl);
  // } else if (savedTasks[i].status === "complete"){
  //   listItemEl.querySelector("select[name='status-change']").selectedIndex=2
  //   listItemEl.appendChild(tasksCompletedEl);
  // }

  // taskIdCounter++
}

loadTasks();





