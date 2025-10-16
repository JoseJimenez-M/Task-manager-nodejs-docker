const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');

const API_URL = 'http://localhost:3000/tasks';

function createTaskElement(task) {
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.dataset.id = task.id;
    if (task.completed) {
        li.classList.add('completed');
    }
    li.appendChild(document.createTextNode(task.title));
    
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
    
    taskList.appendChild(li);
}

async function getTasks() {
    try {
        const response = await fetch(API_URL);
        const tasks = await response.json();
        taskList.innerHTML = '';
        tasks.forEach(task => createTaskElement(task));
    } catch (error) {
        console.error('Failed to fetch tasks:', error);
    }
}

async function addTask(e) {
    e.preventDefault();
    const title = taskInput.value;

    if (!title) {
        alert('Please add a task');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title })
        });
        const newTask = await response.json();
        createTaskElement(newTask);
        taskInput.value = '';
    } catch (error) {
        console.error('Failed to add task:', error);
    }
}

async function updateTask(id, liElement) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'PATCH'
        });
        liElement.classList.toggle('completed');
    } catch (error) {
        console.error('Failed to update task:', error);
    }
}

function handleListClick(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        const li = e.target.parentElement.parentElement;
        removeTask(li.dataset.id, li);
    } else if (e.target.matches('.collection-item')) {
        updateTask(e.target.dataset.id, e.target);
    }
}

async function removeTask(id, liElement) {
    if (confirm('Are you sure?')) {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            liElement.remove();
        } catch (error) {
            console.error('Failed to remove task:', error);
        }
    }
}

async function clearTasks() {
    if (confirm('Are you sure you want to clear all tasks?')) {
        try {
            await fetch(API_URL, { method: 'DELETE' });
            taskList.innerHTML = '';
        } catch (error) {
            console.error('Failed to clear tasks:', error);
        }
    }
}

function loadEventListeners() {
    document.addEventListener('DOMContentLoaded', getTasks);
    form.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleListClick);
    clearBtn.addEventListener('click', clearTasks);
}

loadEventListeners();