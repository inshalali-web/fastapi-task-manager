
const API_URL = "/tasks/";
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const descriptionInput = document.getElementById("description");
const taskList = document.getElementById("task-list");
const message = document.getElementById("message");


// Show a message to the user
function showMessage(text) {
    message.textContent = text;
}


// Load all tasks from FastAPI
async function loadTasks() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Could not load tasks.");
        }

        const tasks = await response.json();

        taskList.replaceChildren();

        if (tasks.length === 0) {
            taskList.textContent = "No tasks yet. Add your first task!";
            return;
        }

        tasks.forEach(task => {
            const card = document.createElement("div");
            card.className = "task-card";

            if (task.completed) {
                card.classList.add("completed");
            }

            const heading = document.createElement("h3");
            heading.textContent = task.title;

            const description = document.createElement("p");
            description.textContent = task.description || "No description";

            const status = document.createElement("p");
            status.textContent = task.completed ? "Completed" : "Pending";

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const toggleButton = document.createElement("button");
            toggleButton.textContent = task.completed
                ? "Mark Pending"
                : "Mark Complete";

            toggleButton.addEventListener("click", () => {
                toggleTask(task);
            });

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", () => {
                deleteTask(task.id);
            });

            actions.append(toggleButton, deleteButton);
            card.append(heading, description, status, actions);
            taskList.appendChild(card);
        });

    } catch (error) {
        taskList.textContent =
            "Unable to load tasks. Check whether the backend is running.";
        console.error(error);
    }
}


// Create a task
taskForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const taskData = {
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        completed: false
    };

    if (!taskData.title) {
        showMessage("Please enter a task title.");
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(taskData)
        });

        if (!response.ok) {
            throw new Error("Could not create task.");
        }

        taskForm.reset();
        showMessage("Task added successfully!");
        await loadTasks();

    } catch (error) {
        showMessage("Unable to add task. Check the backend connection.");
        console.error(error);
    }
});


// Mark a task complete or pending
async function toggleTask(task) {
    const updatedTask = {
        title: task.title,
        description: task.description || "",
        completed: !task.completed
    };

    try {
        const response = await fetch(`${API_URL}${task.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        });

        if (!response.ok) {
            throw new Error("Could not update task.");
        }

        showMessage("Task status updated!");
        await loadTasks();

    } catch (error) {
        showMessage("Unable to update task.");
        console.error(error);
    }
}


// Delete a task
async function deleteTask(taskId) {
    try {
        const response = await fetch(`${API_URL}${taskId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete task.");
        }

        showMessage("Task deleted successfully!");
        await loadTasks();

    } catch (error) {
        showMessage("Unable to delete task.");
        console.error(error);
    }
}


// Load tasks when the page opens
loadTasks();