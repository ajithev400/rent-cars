import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/'
const token = JSON.parse(localStorage.getItem('jwtToken'))

const getVehicles = (data) =>{ return axios.get(API_URL+`api/vehicle/?search=${data}`)
    .catch((res)=>{
        console.log(res);
    })
}

const getSingleCar = (slug)=>{
    return axios.get(API_URL+`api/vehicle/${slug}/`)
}

const createVendor = ( formData ) =>{
    axios.post(API_URL+'api/vendor/',formData,{
        headers:{
            'Content-Type':'application/json',
            "Content-Type": "multipart/form-data",
            'Authorization':`Bearer ${token.access}`
        }
    })
    .then((res)=>{
        console.log(res);
    })
    .catch((res)=>{
        console.log("Errr",res);
    })
}

const getVendorApplication = (data)=>{
    return axios.get(API_URL+`api/vendor/?search=${data}`,{
        headers:{
            'Authorization':`Bearer ${token.access}`
        }
    })
    .catch((res)=>{
        console.log(res);
    })
}

const getSingleVendor = (data)=>{
    return axios.get(API_URL+`api/vendor/${data}`,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
    .catch((res)=>{
        console.log(res);
    })
}

const findCars = (formData) =>{ 
    console.log("axios formData",formData);
    return axios.post(API_URL+'api/filter/reservation/',formData,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
}
const getUserProfile = (pk)=>{
    return axios.get(API_URL+`api/profile/${pk}/`,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
}
const createCarReservation = (formData)=>{
    return axios.post(API_URL+'api/reservation/car/create/',formData,{
        headers:{
           
            "Content-Type": "multipart/form-data",
            'Authorization':`Bearer ${token.access}`
        }
    })
}

const listReservationCars = (data) =>{
    return axios.get(API_URL+`api/reservation/list/user/car/${data}/0/`,{
        headers:{           
            'Authorization':`Bearer ${token.access}`
        }
    })
}

const getReservationDetails = (data)=>{
    return axios.get(API_URL+`api/car/single/reservation/${data}/`,{
        headers:{           
            'Authorization':`Bearer ${token.access}`
        }
    })
}

const axiosService = {
    getVehicles,
    getSingleCar,
    createVendor,
    getVendorApplication,
    getSingleVendor,
    findCars,
    getUserProfile,
    createCarReservation,
    listReservationCars,
    getReservationDetails,
}

export default axiosService