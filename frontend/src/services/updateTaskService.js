import api from "../config/axiosConfig";



const updateTask = async (task,id)=>{
     

      api.put(`/task/${id}`,task)
      .then((response) => {
        console.log(response.data)
        return response.data
      }).catch((error) => {
        console.error("error",error)
      });
}

export default updateTask