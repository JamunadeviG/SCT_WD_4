document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = document.getElementById("task-text").value.trim();
    const taskDate = document.getElementById("task-date").value;

    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        date: taskDate,
        completed: false
    };

    saveTask(task);
    document.getElementById("task-text").value = "";
    document.getElementById("task-date").value = "";
}

function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function displayTasks(filter = "all") {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        if (filter === "pending" && task.completed) return;
        if (filter === "completed" && !task.completed) return;

        const li = document.createElement("li");
        li.classList.add(task.completed ? "completed" : "pending");

        li.innerHTML = `
            <span>${task.text} ${task.date ? `<small>(${task.date})</small>` : ""}</span>
            <div>
                <button class="complete-btn" onclick="toggleComplete(${task.id})">✔</button>
                <button class="edit-btn" onclick="editTask(${task.id})">✏</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">🗑</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function editTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let task = tasks.find(t => t.id === id);
    let newText = prompt("Edit Task:", task.text);

    if (newText) {
        task.text = newText;
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
}

function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

function filterTasks(filter) {
    displayTasks(filter);
}

function loadTasks() {
    displayTasks();
}
