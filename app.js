// console.log('hello world');

//Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//Load all event Listener
function loadEventListeners() {
  //DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);

  //Add Task Event
  form.addEventListener('submit', addTask);

  //remove task event
  taskList.addEventListener('click', removeTask);

  //clear task event
  clearBtn.addEventListener('click', clearTasks);

  //filter task event
  filter.addEventListener('keyup', filterTasks);
}

//get Tasks from ls

function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //['nishkarsh', 'brad']
  }
  tasks.forEach(function (task) {
    //Create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add Icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //console.log(li);

    taskList.appendChild(li);
  });
}

//add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Please Add a task!');
  } else {
    //Create li element
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create a new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add Icon
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    //console.log(li);

    taskList.appendChild(li);

    //store in local storage
    storeTaskInLocalStorage(taskInput.value);

    //clear input
    taskInput.value = '';
  }
  e.preventDefault();
}

//Store Task

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); //['nishkarsh', 'brad']
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains('delete-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();

      //remove from ls
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  // console.log(taskItem.firstChild);
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear tasks

function clearTasks(e) {
  if (e.target.classList.contains('clear-tasks')) {
    // taskList.innerHTML = '';

    //faster method
    if (confirm('Are you sure?')) {
      while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
      }
    }

    //clear tasks from ls

    clearTasksFromLocalStorage();
  }
}

function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks

function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  // console.log(text);

  document.querySelectorAll('.collection-item').forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}
