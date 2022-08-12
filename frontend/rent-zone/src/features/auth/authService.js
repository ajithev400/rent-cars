import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/'

const registerUser = async (userData) =>{
    const res = await axios.post(API_URL + 'api/register/', userData)
    return res.data
}

const loginUser = async(userData) =>{
    const res = await axios.post(API_URL + 'api/token/', userData)
    if (res.data){
        localStorage.setItem('user',JSON.stringify(res.data))
    }
    return res.data
}

const verifyOtp = async(data)=>{
    const res = await axios.post(API_URL + 'api/verify-otp/',data)
    
    return res.data
}

const authService = {
    registerUser,
    loginUser,
    verifyOtp,
}

export default authService