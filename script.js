document.addEventListener('DOMContentLoaded', () => {
  displayTasks();
});

const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
const taskList = document.querySelector("#taskList");

function displayTasks() {
  taskList.innerHTML = "";
  tasks.forEach(displayTask);
}

function displayTask(task) {
  const taskNumber = tasks.indexOf(task);
  taskList.innerHTML += `
    <div id="task" class="card">
    <h4>${task.title}</h4>
    <span>${task.status}</span>
    <button id="button_delete" onclick="deleteTask(${taskNumber})">Удалить</button>
    <button id="button_change" onclick="changeTask(${taskNumber})">Изменить</button> 
    </div>
    `;
}

function deleteTask(taskNumber) {
  tasks.splice(taskNumber, 1);
  displayTasks();
  saveTasks();
  filterTasks();
  //reload();
}

function add_Task() {
  const titleInput = document.getElementById('newTask');
  if (!titleInput.value.trim()) {
    alert("Поле ОТРЕДАКТИРУЙТЕ ЗАДАЧУ должно быть заполнено.");
    return false;
  }
  const task = {};
  task.title = document.getElementById('newTask').value;
  task.status = document.getElementById('newStatus').value;
  tasks.push(task);
  
  displayTasks();
  saveTasks();
  filterTasks();
  modal.style.display = 'none'; // Скрыть модальное окно
  backdrop.style.display = 'none'; // Скрыть фоновую подложку
   //reload();
  document.forms[1].reset(); //очистка формы
  return false;
}

function changeTask(taskNumber) {
  document.forms[1].reset(); //очистка формы модального окна
  const selectedTaskList = tasks[taskNumber]; //определение идентификатора для поиска задачи в массиве
  document.getElementById('newTask').value = selectedTaskList.title; //Заполнение формы
  document.getElementById('newStatus').value = selectedTaskList.status; //Заполнение формы
  const modal = document.getElementById('editModal');
  const backdrop = document.getElementById('modalBackdrop');
  modal.style.display = 'block'; // Показать модальное окно
  backdrop.style.display = 'block'; // Показать фоновую подложку
   deleteTask(taskNumber);    // Удаляем предыдущую карточку задачи
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(displayTask);
}

function addTask() {
  const titleInput = document.getElementById('title');
  //const statusInput = document.getElementById('status');

  if (!titleInput.value.trim()) {
    alert("Поле НОВАЯ ЗАДАЧА должно быть заполнено.");
    return false;
  }

  const task = {};
  task.title = document.getElementById('title').value;
  task.status = document.getElementById('status').value;

  tasks.push(task);
  displayTasks();
  saveTasks();
  filterTasks();
  reload();
  document.forms[0].reset(); //очистка формы
  return false;
}

function deleteArray() {
  localStorage.clear();
  reload();
  alert('Список задач удалён.');
}

function reload() {
  window.location.reload();
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}



/*составление списка задач по шаблону*/
const taskListHTML = tasks.map(task => {
  return `<li>${task.title},  ${task.status}.</li>`;
}).join('\n');
document.getElementById('list').innerHTML = taskListHTML;

/*количество задач*/
const numOfTasks = tasks.length;
document.getElementById('allList').innerHTML = `Всего задач: ${numOfTasks}`;

/*количество выполненных задач*/
function readTask() {
  let readTasks = tasks.filter(task => task.status === 'Выполнено');
  return readTasks.length;
}
let read = readTask();
document.getElementById('read').innerHTML = `${read}`;

/*количество не выполненных задач*/

function notReadTask() {
  let notReadTasks = tasks.filter(task => task.status === 'Не выполнено');
  return notReadTasks.length;
}
let notRead = notReadTask();
document.getElementById('notRead').innerHTML = `${notRead}`;



function filterTasks() {
  const filterTasks = document.getElementById('filterTasks');
  const filterText = filterTasks.value.toLowerCase();
  const taskList = document.getElementById('taskList');

  Array.from(taskList.children).forEach(task => {
    const taskText = task.querySelector('h4').textContent.toLowerCase();
    if (taskText.includes(filterText)) {
      task.style.display = '';
    }
    else {
      task.style.display = 'none';
    };
  });
}
