import React, { useEffect, useState } from 'react'
import axiosService from '../features/axios'
import "../styles/Admin/AdminVehicleTable.css"

const VehicleList = () => {

    const [carData, setCarData] = useState([])
    const [searchData,setSearchData] = useState('')

    useEffect(() => {
        axiosService.getVehicles(searchData)
        .then((res)=>{
          setCarData(res.data)
        })
        // console.log('res:',axiosService.getVehicles());
      }, [searchData])

  return (
    <>
    <div>VehicleList</div>
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

            <tr key={item.id}>
                <td>{item.vehicle_name}</td>
                <td>Content 10</td>
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

export default VehicleList