document.addEventListener("DOMContentLoaded", () => {
    const taskTextEl = document.getElementById("task-text");
    const taskDateEl = document.getElementById("task-date");
    const taskListEl = document.getElementById("task-list");
    const addTaskBtn = document.getElementById("add-task-btn");
    const filterBtns = document.querySelectorAll(".task-filters button");

    addTaskBtn.addEventListener("click", () => {
        const text = taskTextEl.value.trim();
        const date = taskDateEl.value;

        if (!text) return alert("Please enter a task!");

        const task = { id: Date.now(), text, date, completed: false };
        saveTasks([...getTasks(), task]);

        taskTextEl.value = "";
        taskDateEl.value = "";
        renderTasks();
    });

    filterBtns.forEach(btn =>
        btn.addEventListener("click", () => renderTasks(btn.dataset.filter))
    );

    taskListEl.addEventListener("click", e => {
        const id = Number(e.target.closest("li")?.dataset.id);
        if (!id) return;

        let tasks = getTasks();

        if (e.target.classList.contains("complete-btn")) {
            tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        } 
        else if (e.target.classList.contains("edit-btn")) {
            const newText = prompt("Edit Task:", tasks.find(t => t.id === id).text);
            if (newText) {
                tasks = tasks.map(t => t.id === id ? { ...t, text: newText } : t);
            }
        } 
        else if (e.target.classList.contains("delete-btn")) {
            tasks = tasks.filter(t => t.id !== id);
        }

        saveTasks(tasks);
        renderTasks();
    });

    function getTasks() {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    }

    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks(filter = "all") {
        taskListEl.innerHTML = "";
        getTasks()
            .filter(t => filter === "all" || (filter === "pending" && !t.completed) || (filter === "completed" && t.completed))
            .forEach(task => {
                const li = document.createElement("li");
                li.dataset.id = task.id;
                li.className = task.completed ? "completed" : "";
                li.innerHTML = `
                    <span>${task.text} ${task.date ? `<small>(${task.date})</small>` : ""}</span>
                    <div>
                        <button class="complete-btn">✔</button>
                        <button class="edit-btn">✏</button>
                        <button class="delete-btn">🗑</button>
                    </div>
                `;
                taskListEl.appendChild(li);
            });
    }

    renderTasks();
});
