function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-lg border p-4 transition ${
        task.completed
          ? "border-green-200 bg-green-50"
          : "border-slate-200 bg-white hover:border-blue-200"
      }`}
    >
      {/* Task Details */}
      <div className="flex min-w-0 items-center gap-3">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="h-5 w-5 shrink-0 cursor-pointer accent-blue-600"
        />

        <div className="min-w-0">
          <p
            className={`break-words font-medium ${
              task.completed
                ? "text-slate-400 line-through"
                : "text-slate-700"
            }`}
          >
            {task.text}
          </p>

          <p
            className={`mt-1 text-xs font-medium ${
              task.completed
                ? "text-green-600"
                : "text-orange-500"
            }`}
          >
            {task.completed ? "Completed" : "Pending"}
          </p>
        </div>
      </div>

      {/* Delete Button */}
      <button
        onClick={() => deleteTask(task.id)}
        className="shrink-0 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
      >
        Delete
      </button>
    </div>
  );
}

export default TaskItem;