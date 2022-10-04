import axios from "axios";
    
export const getGroups = () => {
   return axios.get(`${URL}/api/grupo`)
               .catch()
}
