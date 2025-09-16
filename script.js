document.addEventListener("DOMContentLoaded", () => {
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTasks(task));

addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const newTask ={
        id: Date.now(),
        text: taskText,
        completed: false
    }
    tasks.push(newTask);
    saveTasks();
    renderTasks(newTask);
    taskInput.value="";
    console.log(tasks);
});

function renderTasks(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
    `;

    li.addEventListener("click", (e) => {
        if(e.target.tagName ==="BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        tasks = tasks.filter(t => t.id !== task.id);
        li.remove();
        saveTasks();
    });
    taskList.appendChild(li);
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
});