const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

/** Create Task */

function createTask(text) {
  const li = document.createElement("li");
  li.className =
    "flex items-center justify-between p-3.5 bg-gray-50 border border-gray-200 rounded-lg group hover:border-gray-300 transition";

  const taskSpan = document.createElement("span");
  taskSpan.className = "text-sm font-medium text-gray-700";
  taskSpan.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "text-gray-400 hover:text-red-500 transition px-2 py-1";
  deleteBtn.innerHTML = "<i class='fa-solid fa-trash-can text-sm'></i>";

  deleteBtn.addEventListener("click", deleteTask);

  li.append(taskSpan, deleteBtn);
  todoList.append(li);
}

/** Add Task from localStorage */

function addTask(e) {
  e.preventDefault();

  const taskval = todoInput.value.trim();

  if (taskval === "") {
    alert("Please fill the task");
    return;
  }

  createTask(taskval);
  tasks.push(taskval);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  todoInput.value = "";
  todoInput.focus();
}

/** Delete Task from localStorage */

function deleteTask(e) {
  if (window.confirm("Are you sure you want to delete")) {
    const li = e.currentTarget.closest("li");
    const text = li.querySelector("span").textContent;

    tasks = tasks.filter((task) => {
      if (task !== text) {
        return true;
      } else {
        return false;
      }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    li.remove();
  }
}

function loadTask() {
  tasks.forEach((task) => createTask(task));
}

todoForm.addEventListener("submit", addTask);
loadTask();