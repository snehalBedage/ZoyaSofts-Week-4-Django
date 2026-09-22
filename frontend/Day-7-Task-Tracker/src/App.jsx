
import { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:8000/tasks/";

function App() {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);

  const [taskError, setTaskError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchTasks = async () => {
    try {
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }

      const data = await response.json();
      setTasks(data.tasks || []);
    } catch (err) {
      console.error(err);
      setError("Unable to connect to the Django server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const validateForm = () => {
    let valid = true;

    setTaskError("");
    setDescriptionError("");

    const taskValue = task.trim();
    const descriptionValue = description.trim();

    if (!taskValue) {
      setTaskError("Task name is required.");
      valid = false;
    } else if (taskValue.length < 3) {
      setTaskError("Task name must contain at least 3 characters.");
      valid = false;
    } else if (taskValue.length > 200) {
      setTaskError("Task name cannot exceed 200 characters.");
      valid = false;
    }

    if (
      descriptionValue.length > 0 &&
      descriptionValue.length < 5
    ) {
      setDescriptionError(
        "Description must contain at least 5 characters."
      );
      valid = false;
    }

    return valid;
  };

  const addTask = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.trim(),
          description: description.trim(),
          status: "Pending",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setTask("");
      setDescription("");
      setTaskError("");
      setDescriptionError("");

      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to add task. Please try again.");
    }
  };

  const toggleTask = async (selectedTask) => {
    const newStatus =
      selectedTask.status === "Completed"
        ? "Pending"
        : "Completed";

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedTask.id,
          title: selectedTask.title,
          description: selectedTask.description,
          status: newStatus,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to update task. Please try again.");
    }
  };

  const deleteTask = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      const response = await fetch(API_URL, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      await fetchTasks();
    } catch (err) {
      console.error(err);
      setError("Unable to delete task. Please try again.");
    }
  };

  const completedTasks = tasks.filter(
    (item) => item.status === "Completed"
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  const progress =
    tasks.length === 0
      ? 0
      : Math.round((completedTasks / tasks.length) * 100);

  const filteredTasks = useMemo(() => {
    return tasks.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const desc = item.description?.toLowerCase() || "";
      const searchText = search.toLowerCase();

      const matchesSearch =
        title.includes(searchText) ||
        desc.includes(searchText);

      const matchesFilter =
        filter === "All" ||
        (filter === "Pending" && item.status !== "Completed") ||
        (filter === "Completed" && item.status === "Completed");

      return matchesSearch && matchesFilter;
    });
  }, [tasks, search, filter]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800">

      {/* HEADER */}
      <header className="bg-blue-950 text-white shadow-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">

          <div>
            <h1 className="text-xl font-bold">
              Task Tracker
            </h1>

            <p className="text-sm text-blue-200">
              Stay organized
            </p>
          </div>

          <nav className="hidden gap-6 text-sm font-medium sm:flex">
            <a
              href="#home"
              className="transition hover:text-blue-300"
            >
              Home
            </a>

            <a
              href="#add-task"
              className="transition hover:text-blue-300"
            >
              Add Task
            </a>

            <a
              href="#tasks"
              className="transition hover:text-blue-300"
            >
              Tasks
            </a>
          </nav>

        </div>
      </header>

      <main
        id="home"
        className="mx-auto max-w-5xl px-4 py-8"
      >

        {/* MAIN HEADING */}
        <section className="mb-7">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700">
            Task Management
          </p>

          <h2 className="text-3xl font-bold text-slate-900">
            Stay Organized. Get Things Done.
          </h2>

          <p className="mt-2 max-w-2xl text-base leading-relaxed text-slate-500">
            Plan your work, track your progress, and manage your daily tasks
            in one simple place.
          </p>
        </section>

        {/* ERROR */}
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        {/* STATS */}
        <section className="mb-6 grid grid-cols-3 gap-4">

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-1 text-2xl font-bold text-orange-500">
              {pendingTasks}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-1 text-2xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

        </section>

        {/* ADD TASK */}
        <section
          id="add-task"
          className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-slate-900">
            Add New Task
          </h2>

          <p className="mb-5 text-sm text-slate-500">
            Create a task and keep track of your progress.
          </p>

          <form onSubmit={addTask} className="space-y-5">

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Task Name
              </label>

              <input
                type="text"
                value={task}
                onChange={(e) => {
                  setTask(e.target.value);
                  setTaskError("");
                }}
                placeholder="Enter task name"
                className={`w-full rounded-lg border px-4 py-3 text-sm outline-none transition ${
                  taskError
                    ? "border-red-400 bg-red-50"
                    : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {taskError && (
                <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                  ⚠ {taskError}
                </div>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("");
                }}
                placeholder="Enter task description"
                rows="3"
                className={`w-full resize-none rounded-lg border px-4 py-3 text-sm outline-none transition ${
                  descriptionError
                    ? "border-red-400 bg-red-50"
                    : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                }`}
              />

              {descriptionError && (
                <div className="mt-2 rounded-md border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-medium text-red-700">
                  ⚠ {descriptionError}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-blue-700 px-7 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-blue-800 sm:w-auto"
            >
              Add Task
            </button>

          </form>
        </section>

        {/* PROGRESS */}
        <section className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">

          <div className="mb-3 flex items-center justify-between">

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Overall Progress
              </h2>

              <p className="text-sm text-slate-500">
                Completed tasks
              </p>
            </div>

            <span className="text-base font-bold text-blue-800">
              {progress}%
            </span>

          </div>

          <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full rounded-full bg-blue-700 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

        </section>

        {/* TASKS */}
        <section
          id="tasks"
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
        >

          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Tasks
              </h2>

              <p className="text-sm text-slate-500">
                Search and manage your current tasks.
              </p>
            </div>

            <div className="flex gap-2">

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-blue-600 sm:w-48"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm outline-none"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
              </select>

            </div>

          </div>

          {loading ? (
            <div className="py-10 text-center text-sm text-slate-400">
              Loading tasks...
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center">

              <p className="text-base font-semibold text-slate-600">
                No tasks found
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add a new task or change your search/filter.
              </p>

            </div>
          ) : (
            <div className="space-y-3">

              {filteredTasks.map((item) => (
                <div
                  key={item.id}
                  className="mx-auto w-full max-w-2xl rounded-lg border border-slate-200 bg-slate-50 p-3"
                >

                  <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center lg:justify-between">

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <h3
                          className={`text-base font-bold ${
                            item.status === "Completed"
                              ? "text-slate-400 line-through"
                              : "text-slate-800"
                          }`}
                        >
                          {item.title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            item.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </div>

                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {item.description || "No description provided."}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Created:{" "}
                        {new Date(item.created_at).toLocaleDateString()}
                      </p>

                    </div>

                    <div className="flex gap-2">

                      <button
                        onClick={() => toggleTask(item)}
                        className="rounded-md bg-blue-800 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-900"
                      >
                        {item.status === "Completed"
                          ? "Mark Pending"
                          : "Complete"}
                      </button>

                      <button
                        onClick={() => deleteTask(item.id)}
                        className="rounded-md bg-red-500 px-3 py-2 text-xs font-semibold text-white transition hover:bg-red-600"
                      >
                        Delete
                      </button>

                    </div>

                  </div>

                </div>
              ))}

            </div>
          )}

        </section>

      </main>

      {/* FOOTER */}
      <footer className="mt-8 bg-blue-950 text-white">

        <div className="mx-auto max-w-5xl px-4 py-6 text-center">

          <p className="text-base font-semibold">
            Task Tracker
          </p>

          <p className="mt-1 text-sm text-blue-200">
            Built with React and Django
          </p>

          <p className="mt-2 text-xs text-blue-300">
            © 2026 Task Tracker
          </p>

        </div>

      </footer>

    </div>
  );
}

export default App;

