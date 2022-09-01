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
            "content-type": "multipart/form-data",
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

const axiosService = {
    getVehicles,
    getSingleCar,
    createVendor,
    getVendorApplication
}

export default axiosService