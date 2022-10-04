import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
const token = JSON.parse(localStorage.getItem('jwtToken'))

const instance = axios.create({
    baseURL:API_URL
})

const getVehicles = (data) =>{ return axios.get(API_URL+`/api/vehicle/?search=${data}`)
    .catch((res)=>{
        console.log(res);
    })
}

const getSingleCar = (slug)=>{
    return axios.get(API_URL+`/api/vehicle/${slug}/`)
}

const getAllUsers = () =>{
    return axios.get(API_URL+'/api/user/',{
        headers:{
            'Authorization':`Bearer ${token.access}`
        } 
    })
}

const createVendor = ( formData ) =>{
    axios.post(API_URL+'/api/vendor/',formData,{
        headers:{
            
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

const getallVendors = ()=>{
    return axios.get(API_URL+'/api/vendor/',{
        headers:{
            'Authorization':`Bearer ${token.access}`
        } 
    })
}

const getVendorApplication = (data)=>{
    return axios.get(API_URL+`/api/vendor/?search=${data}`,{
        headers:{
            'Authorization':`Bearer ${token.access}`
        }
    })
    .catch((res)=>{
        console.log(res);
    })
}

const getSingleVendor = (data)=>{
    return axios.get(API_URL+`/api/vendor/${data}`,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
    .catch((res)=>{
        console.log(res);
    })
}

const searchVendor = (email) =>{
    return axios.get(API_URL+`/api/vendor/?search=${email}`,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
    .catch((err)=>{
        console.log("Error:",err);
    })
}

const findCars = (formData) =>{ 
    console.log("axios formData",formData);
    return axios.post(API_URL+'/api/filter/reservation/',formData,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
}
const getUserProfile = (pk)=>{
    return axios.get(API_URL+`/api/profile/${pk}/`,{
        headers:{
            'Authorization':`Bearer ${token.access}`,
        }
    })
}
const createCarReservation = (formData)=>{
    return axios.post(API_URL+'/api/reservation/car/create/',formData,{
        headers:{
           
            "Content-Type": "multipart/form-data",
            'Authorization':`Bearer ${token.access}`
        }
    })
}

const listReservationCars = (data) =>{
    return axios.get(API_URL+`/api/reservation/list/user/car/${data}/0/`,{
        headers:{           
            'Authorization':`Bearer ${token.access}`
        }
    })
}

const getReservationDetails = (data)=>{
    return axios.get(API_URL+`/api/car/single/reservation/${data}/`,{
        headers:{           
            'Authorization':`Bearer ${token.access}`
        }
    })
}
const getCarListWithVendorId = (id)=>{
    return axios.get(API_URL+`/api/cars/vendor/${id}`,{
        headers:{           
            'Authorization':`Bearer ${token.access}`
        }
    })
}
const approveVendor =(id)=>{
    // console.log(token.access);
    return axios.patch(API_URL+`/api/vendor/${id}/`,{ 
        "is_active": true,
        "is_verified": true 
    },
    {
        headers:{           
            'Authorization': `Bearer ${token.access}`,
            'Content-Type':'application/json'
        }
    })
} 

const reservationPayment = (formData)=>{
    return axios.post(API_URL+`/api/reservation/payment/`,formData,{
        headers:{           
            'Authorization': `Bearer ${token.access}`,
            'Content-Type':'application/json'
        }
    })
}

const handlePaymentSuccess = (formData)=>{
    return axios.post(API_URL+'/api/reservation/payment/success/',formData,{
        headers:{           
            'Authorization': `Bearer ${token.access}`,
            'Content-Type':'application/json'
        }
    })
}

const axiosService = {
    getVehicles,
    getSingleCar,
    getAllUsers,
    createVendor,
    getallVendors,
    getVendorApplication,
    getSingleVendor,
    searchVendor,
    findCars,
    getUserProfile,
    createCarReservation,
    listReservationCars,
    getReservationDetails,
    getCarListWithVendorId,
    approveVendor,
    reservationPayment,
    handlePaymentSuccess,
}

export default axiosService