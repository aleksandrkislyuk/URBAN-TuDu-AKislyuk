document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
});

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.querySelector("taskList");
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>$(task)</span>
      <button onClick=editTask(this)>Редактировать</button>
      <button onClick=deleteTask(this)>Удалить</button>
  `;
    taskList.appendChild('li');
  });
  filterTasks();
}

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText === '') return;

  const taskList = document.getElementById('taskList');
  const li = document.createElement('li');
  li.innerHTML = `
  <span>$(task)</span>
  <button onClick=editTask(this)>Редактировать</button>
  <button onClick=deleteTask(this)>Удалить</button>
`;
  taskList.appendChild(li);
  saveTasks();
  taskInput.value = "";
  filterTasks();
}

function saveTasks() {
  const taskList = document.getElementById('taskList');
  const tasks = Array.from(taskList.children).map(li => li.querySelector('span').textContent);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask(button) {
  const li = button.parentElement;
  li.remove();
  saveTasks();
  filterTasks();
}

function editTask(button) {
  const li = button.parentElement;
  const taskText = li.querySelector('span').textContent;
  const newTaskText = prompt("Редактировать задачу", taskText);

  if (newTaskText !== null && newTaskText.trim() !== "") {
    li.querySelector('span').textContent = newTaskText.trim();
    saveTasks();
    filterTasks();
  }
}

function filterTasks() {
  const filterInput = document.getElementById('filterInput');
  const filterText = filterInput.value.toLoverCase();
  const taskList = document.getElementById('taskList');

  Array.from(taskList.children).forEach(li => {
    const taskText = li.querySelector('span').textContent.toLocaleLowerCase();
    if (taskText.includes(filterText)) {
      li.style.display = '';
    }
    else {
      li.style.display = 'none';
    }
  })
}