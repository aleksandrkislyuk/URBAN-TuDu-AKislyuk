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
  <div id="task">
  <h4>${task.title}</h4>
  <p>${task.status}</p>
  <button id="button_delete" onclick="deleteTask(${taskNumber})">Удалить</button>
  <button id="button_change" onclick="changeTask(${taskNumber})">Изменить</button> 
  </div>
  `; 
}

function loadTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach(displayTask);
}

function addTask() {
  const titleInput = document.getElementById('title');
  const statusInput = document.getElementById('status');

  if (!titleInput.value.trim()) {
    alert("Поле НОВАЯ ЗАДАЧА должно быть заполнено.");
    return false;
  }

  const task = {
    title: titleInput.value,
    status: statusInput.value
  };

  tasks.push(task);
  displayTasks();
  saveTasks();
  filterTasks();
  document.forms[0].reset(); //очистка формы
  return false;
}

function deleteTask(taskNumber) {
  tasks.splice(taskNumber, 1);
  displayTasks();
  saveTasks();
}

function reload() {
  window.location.reload()
};

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function changeTask(taskNumber) {
  /*очистка формы*/
  document.forms[0].reset();
  /*определение идентификатора для поиска книги в массиве*/
  const selectedTaskList = tasks[taskNumber];
  /*Заполнение формы*/
  document.getElementById('title').value = selectedTaskList.title;
  document.getElementById('status').value = selectedTaskList.status;
  /*удалениие предыдущего варианта карточки книги*/
  deleteTask(taskNumber);
}

/*составление списка книг по шаблону*/
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

//окно выбора - удалять/не удалять весь массив
function deleteArray() {
  
  // Запрашиваем подтверждение у пользователя
  const isConfirmed = confirm('Вы уверены, что хотите очистить список задач?');

  if (isConfirmed) {
    // Очистка localStorage
    localStorage.clear();
    alert('Список задач удалён.');
  } else {
    alert('УРА, НЕ УДАЛЯТЬ! - нажмите ЗАКРЫТЬ!');
  }
  displayTasks();
  saveTasks();
}
   
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
