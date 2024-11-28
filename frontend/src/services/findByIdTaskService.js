import api from "../config/axiosConfig";

const findByIdTask = async (id)=>{

    api.get(`/task/${id}`)
      .then((response) => {
        console.log(response.data)
        return response.data
      }).catch((error) => {
        console.error("error",error)
      });

}

export default findByIdTask