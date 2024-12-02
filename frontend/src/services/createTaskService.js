import api from "../config/axiosConfig";

const createTask = async (task) => {
  try {
    const response = await api.post("/task", task);
    return response.data; // Retorna os dados da tarefa criada
  } catch (error) {
    console.error("Error creating task:", error);
    throw error; // Opcional: permite que o erro seja tratado onde a função é chamada
  }
};

export default createTask;
