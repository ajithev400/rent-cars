import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosService from '../features/axios'
import "../styles/Admin/AdminVehicleTable.css"

const VehicleList = () => {

    const navigate = useNavigate()
    const [carData, setCarData] = useState([])
    const [searchData,setSearchData] = useState('')
    const handleClickOnItem =(slug)=>{
        navigate(`/admin/vendor-car/${slug}`)
    }

    useEffect(() => {
        axiosService.getVehicles(searchData)
        .then((res)=>{
          setCarData(res.data.results)
        })
        // console.log('res:',axiosService.getVehicles());
      }, [searchData])
      console.log(carData);
  return (
    <>
    <div>VehicleList</div>
   
        <div className="table-wrapper">
        <table className="fl-table">
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

            <tr key={item.id} onClick={()=>{handleClickOnItem(item.slug)}}>
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

export default VehicleList