import api from "../config/axiosConfig";

const findAllTask = async () => {
  try {
    const response = await api.get("/task");
    console.log("API Response:", response.data); 
    return response.data; 
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    throw error;
  }
};

export default findAllTask;
