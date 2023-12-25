function addTask() {
    const taskInput = document.getElementById("taskInput");
    const dueDateInput = document.getElementById("dueDate");
    const priorityInput = document.getElementById("priority");

    const taskText = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = priorityInput.value;

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");

        const li = document.createElement("li");
        li.innerHTML = `
            <span>${taskText}</span>
            <span class="due-date">${dueDate}</span>
            <span class="priority ${priority}">${priority}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="removeTask(this)">Remove</button>
        `;

        taskList.appendChild(li);

        taskInput.value = "";
        dueDateInput.value = "";
        priorityInput.value = "low";

        saveTasksToLocalStorage();
    }
}

function editTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentNode;
    const span = li.querySelector("span");
    const dueDateSpan = li.querySelector(".due-date");
    const prioritySpan = li.querySelector(".priority");

    const newTaskText = prompt("Edit task:", span.innerText);
    const newDueDate = prompt("Edit due date:", dueDateSpan.innerText);
    const newPriority = prompt("Edit priority (low, medium, high):", prioritySpan.innerText);

    if (newTaskText !== null && newDueDate !== null && newPriority !== null) {
        span.innerText = newTaskText;
        dueDateSpan.innerText = newDueDate;
        prioritySpan.innerText = newPriority;
        prioritySpan.className = `priority ${newPriority}`;

        saveTasksToLocalStorage();
    }
}

function removeTask(button) {
    const taskList = document.getElementById("taskList");
    const li = button.parentNode;

    taskList.removeChild(li);

    saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.childNodes.forEach((li) => {
        const task = {
            text: li.querySelector("span").innerText,
            dueDate: li.querySelector(".due-date").innerText,
            priority: li.querySelector(".priority").innerText,
        };
        tasks.push(task);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
    const taskList = document.getElementById("taskList");

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${task.text}</span>
            <span class="due-date">${task.dueDate}</span>
            <span class="priority ${task.priority}">${task.priority}</span>
            <button onclick="editTask(this)">Edit</button>
            <button onclick="removeTask(this)">Remove</button>
        `;
        taskList.appendChild(li);
    });
}

window.onload = loadTasksFromLocalStorage;
