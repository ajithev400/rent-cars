import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosService from '../../../features/axios'
// import UnApprovedCarDetail from './UnApprovedCarDetail'

const UnApprovedCarList = () => {
  const [carData, setCarData] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    axiosService.getAllUnApprovedCars()
    .then((res)=>{
      setCarData(res.data)
    })
  }, [])

  const toCarDetails =(id)=>{
    navigate(`/admin/vendor-car/unverified/${id}/`,{state:{CarId:id}})
  }
  
  return (
    <>
    <div>Unverified VehicleList</div>

        <div class="table-wrapper">
        <table class="fl-table">
            <thead>
            <tr>
                <th>Car Name</th>
                <th>Vendor Name</th>
                <th>Model</th>
                <th>Location</th>
                <th>Status</th>
            </tr>
            </thead>
            {carData.map((item)=> (

            <tr key={item.id} onClick={()=>{toCarDetails(item.id)}}>
                <td>{item.name}</td>
                <td>{item.creator}</td>
                <td>{item.model}</td>
                <td>{item.speeed}</td>
                {item.is_available?
                <td>
                    <h5 style={{"color":"green"}}>Available</h5>
                </td>:<td>
                <h5 style={{"color":"red"}}>Not Available</h5>
                    </td>}
            </tr>
            ))}
            
        </table>
    </div>
    </>
  )
}

export default UnApprovedCarList