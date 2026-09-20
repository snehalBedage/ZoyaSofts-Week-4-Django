import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = () => {
    fetch("http://127.0.0.1:8000/tasks/")
      .then((response) => response.json())
      .then((data) => {
        setTasks(data.tasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        status: "Pending",
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setTitle("");
        setDescription("");
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error adding task:", error);
      });
  };

  const updateTask = (task) => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: task.id,
        title: task.title,
        description: task.description,
        status: "Completed",
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error updating task:", error);
      });
  };

  const deleteTask = (taskId) => {
    fetch("http://127.0.0.1:8000/tasks/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: taskId,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        fetchTasks();
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <h1>Task Tracker</h1>

      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Add Task</button>
      </form>

      <hr />

      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <p>Status: {task.status}</p>

          <button onClick={() => updateTask(task)}>
            Complete
          </button>

          <button onClick={() => deleteTask(task.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;