import React, { useEffect, useState } from "react";
import createTask from "../services/createTaskService";
import findAllTask from "../services/findAllTaskService";
import updateTask from "../services/updateTaskService";
import deleteByIdTask from "../services/deleteTaskService";
import "./ToDoList.css";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [taskDescription, setTaskDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para carregar todas as tarefas
  const refreshTasks = async () => {
    setLoading(true);
    try {
      const response = await findAllTask();
      setTasks(response || []);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carregar tarefas ao montar o componente
  useEffect(() => {
    refreshTasks();
  }, []);

  // Criar nova tarefa
  const handleAddTask = async () => {
    if (taskDescription.trim()) {
      setLoading(true);
      try {
        console.log("Task description before creation:", taskDescription);
        let newTask = await createTask({ description: taskDescription });
        console.log("New task created:", newTask);
  
        if (newTask) {
          // Adicione a tarefa criada com o status 'CREATED'
          const taskWithStatus = {
            ...newTask,
            taskStatus: newTask.taskStatus || "CREATED",
          };
          setTasks((prevTasks) => [...prevTasks, taskWithStatus]);
          setTaskDescription(""); // Limpa o campo de input
        }
      } catch (error) {
        console.error("Failed to create task:", error);
        alert("Failed to create task. Please try again.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Task cannot be empty!");
    }
  };

  // Alterar status da tarefa
  const handleChangeStatus = async (id, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task?.id === id ? { ...task, taskStatus: newStatus } : task
      )
    );

    try {
      const updatedTask = await updateTask({ taskStatus: newStatus }, id);
      if (updatedTask) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task?.id === id ? { ...task, taskStatus: updatedTask.taskStatus } : task
          )
        );
      }
    } catch (error) {
      console.error("Failed to update task:", error);
      alert("An error occurred while updating the task.");
    }
  };

  // Excluir uma tarefa
  const handleDeleteTask = async (id) => {
    try {
      await deleteByIdTask(id);
      setTasks((prevTasks) => prevTasks.filter((t) => t?.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Renderizar tarefas por status
  const renderTasks = (status) => {
    const filteredTasks = tasks.filter((t) => t?.taskStatus === status);

    if (filteredTasks.length === 0) {
      return <p className="empty-message">No tasks here!</p>;
    }

    return filteredTasks.map((t) => (
      <li key={t.id} className="task-item">
        <span className="task-text">{t.description}</span>
        <div className="actions">
          {status === "CREATED" && (
            <button
              className="action-button start"
              onClick={() => handleChangeStatus(t.id, "IN_PROGRESS")}
            >
              Start
            </button>
          )}
          {status === "IN_PROGRESS" && (
            <button
              className="action-button complete"
              onClick={() => handleChangeStatus(t.id, "COMPLETED")}
            >
              Complete
            </button>
          )}
          <button
            className="action-button delete"
            onClick={() => handleDeleteTask(t.id)}
          >
            Delete
          </button>
        </div>
      </li>
    ));
  };

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <div className="input-container">
        <input
          type="text"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Add a new task..."
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button" disabled={loading}>
          {loading ? "Adding..." : "Add"}
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="task-section">
            <h3>Created</h3>
            <ul className="task-list">{renderTasks("CREATED")}</ul>
          </div>

          <div className="task-section">
            <h3>In Progress</h3>
            <ul className="task-list">{renderTasks("IN_PROGRESS")}</ul>
          </div>

          <div className="task-section">
            <h3>Completed</h3>
            <ul className="task-list">{renderTasks("COMPLETED")}</ul>
          </div>
        </>
      )}
    </div>
  );
}

export default ToDoList;
