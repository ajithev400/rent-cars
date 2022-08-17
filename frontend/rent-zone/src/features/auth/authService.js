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


const authService = {
    registerUser,
    loginUser,
    verifyOtp,
    checkAuth
}

export default authService