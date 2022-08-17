import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/'



const getUser =async ()=> {
    const token = JSON.parse(localStorage.getItem('jwtToken'))
  if(token){
    try{
        const response= await axios.get(API_URL+'api/getuser/',{
            headers:{
                'Authorization': `Bearer ${token.access}`
            }
        })
        if(response.data){
            localStorage.setItem("user",response.data);
        }
        console.log(response.data, "response");
       return response.data;
       }catch(err){
        console.log(err);
       }
  }
}

const axiosService = {
    getUser,
}

export default axiosService