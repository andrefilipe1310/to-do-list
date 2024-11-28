import React, { useState } from "react";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now(), text: task, status: "created" }]);
      setTask("");
    }
  };

  const handleChangeStatus = (id, newStatus) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, status: newStatus } : t
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const renderTasks = (status) =>
    tasks
      .filter((t) => t.status === status)
      .map((t) => (
        <li key={t.id}>
          <span>{t.text}</span>
          <div className="actions">
            {status === "created" && (
              <button onClick={() => handleChangeStatus(t.id, "in-progress")}>
                Start
              </button>
            )}
            {status === "in-progress" && (
              <button onClick={() => handleChangeStatus(t.id, "completed")}>
                Complete
              </button>
            )}
            <button onClick={() => handleDeleteTask(t.id)}>Delete</button>
          </div>
        </li>
      ));

  return (
    <div className="todo-list">
      <div className="input-container">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={handleAddTask}>Add</button>
      </div>

      <div className="task-section">
        <h3>Created</h3>
        <ul>{renderTasks("created")}</ul>
      </div>

      <div className="task-section">
        <h3>In Progress</h3>
        <ul>{renderTasks("in-progress")}</ul>
      </div>

      <div className="task-section">
        <h3>Completed</h3>
        <ul>{renderTasks("completed")}</ul>
      </div>
    </div>
  );
}

export default ToDoList;
