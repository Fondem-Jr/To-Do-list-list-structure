import * as task from './populate.js';
import * as stat from './status.js';
import './style.css';

let list = [];

function todoList() {
  if (window.localStorage.getItem('localTasks')) {
    const localTasks = window.localStorage.getItem('localTasks');
    list = JSON.parse(localTasks);
  }
  document.querySelector('.todo-list').innerHTML = '';
  list.forEach((item) => {
    const taskElement = document.createElement('li');
    taskElement.classList.add('task');
    if (item.isCompleted) {
      taskElement.classList.add('completed');
    }
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-check');
    checkbox.addEventListener('click', () => {
      stat.status(item, list);
      todoList();
    });
    checkbox.checked = item.isCompleted;
    taskElement.appendChild(checkbox);
    const taskText = document.createElement('input');
    taskText.classList = 'task-text';
    taskText.value = item.description;
    taskText.addEventListener('change', () => {
      if (taskText.value.length > 0) {
        item.description = taskText.value;
        stat.saveLocal(list);
      }
    });
    taskElement.appendChild(taskText);
    const dragIcon = document.createElement('i');
    dragIcon.classList = 'fas fa-ellipsis-v drag icon';
    taskElement.appendChild(dragIcon);
    taskElement.draggable = 'true';
    document.querySelector('.todo-list').appendChild(taskElement);
  });
}

todoList();
document.querySelector('#taskForm').addEventListener('submit', (event) => {
  event.preventDefault();
  task.add(list);
  todoList();
});
document.querySelector('.clearer').addEventListener('click', () => {
  task.removeDone(list);
  todoList();
});