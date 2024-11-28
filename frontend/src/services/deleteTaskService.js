import api from "../config/axiosConfig";

const deleteByIdTask = async (id)=>{

    api.delete(`/task/${id}`)
      .then((response) => {
       
      }).catch((error) => {
        console.error("error",error)
      });

}

export default deleteByIdTask