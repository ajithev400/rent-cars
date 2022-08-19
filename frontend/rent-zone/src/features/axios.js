import axios from 'axios'
const API_URL = 'http://127.0.0.1:8000/'


const getVehicles = () =>{ return axios.get(API_URL+'api/vehicle/')
    .catch((res)=>{
        console.log(res);
    })
}

const getSingleCar = (slug)=>{
    return axios.get(API_URL+`api/vehicle/${slug}/`)
}


const axiosService = {
    getVehicles,
    getSingleCar
}

export default axiosService