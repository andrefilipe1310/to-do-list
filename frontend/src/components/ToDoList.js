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
        const newTask = await createTask({ description: taskDescription });
        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskDescription("");
      } catch (error) {
        console.error("Failed to create task:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Task cannot be empty!");
    }
  };

  // Atualizar status de uma tarefa
  const handleChangeStatus = async (id, newStatus) => {
    const taskToUpdate = tasks.find((t) => t.id === id);

    if (taskToUpdate) {
      // Atualize localmente antes de chamar a API
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === id ? { ...t, taskStatus: newStatus } : t
        )
      );

      try {
        const updatedTask = await updateTask(
          { description: taskToUpdate.description, taskStatus: newStatus },
          id
        );
        // Atualize com os dados retornados da API, se necessário
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === id ? updatedTask : t))
        );
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    }
  };

  // Excluir uma tarefa
  const handleDeleteTask = async (id) => {
    // Atualize localmente antes de chamar a API
    const remainingTasks = tasks.filter((t) => t.id !== id);
    setTasks(remainingTasks);

    try {
      await deleteByIdTask(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Reverter caso a exclusão falhe
      setTasks((prevTasks) => [...prevTasks, tasks.find((t) => t.id === id)]);
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
