import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/'
const token = JSON.parse(localStorage.getItem('jwtToken'))


const registerUser = async (userData) =>{
    const res = await axios.post(API_URL + 'api/register/', userData)
    return res.data
}

const loginUser = async(userData) =>{
    const res = await axios.post(API_URL + 'api/token/', userData)
    if (res.data){
        localStorage.setItem('jwtToken',JSON.stringify(res.data))
    }
    return res.data
}

const verifyOtp = async(data)=>{
    const res = await axios.post(API_URL + 'api/verify-otp/',data)
    
    return res.data
}

const checkAuth = async() =>{
    
    const res = await axios.post(API_URL+'api/token/verify/',{token: token.access})
    return res.data
}

const logOut = async()=>{
    const res = await axios.post(API_URL+'api/logout/blacklist/',{refresh_token:token.refresh})
    return res.data
}

const getUser =async ()=> {
    const token = JSON.parse(localStorage.getItem('jwtToken'))
  if(token){
    try{
        const res= await axios.get(API_URL+'api/getuser/',{
            headers:{
                'Authorization': `Bearer ${token.access}`
            }
        })
        if(res.data){
            localStorage.setItem("user",JSON.stringify(res.data));
        }
        
       return res.data;
       }catch(err){
        console.log(err);
       }
  }
}




const authService = {
    registerUser,
    loginUser,
    verifyOtp,
    checkAuth,
    getUser,
    logOut,
}

export default authService