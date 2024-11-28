import api from "../config/axiosConfig";



const createTask = async (task)=>{
     

      api.post("/task",task)
      .then((response) => {
        console.log(response.data)
        return response.data
      }).catch((error) => {
        console.error("error",error)
      });
}

export default createTask