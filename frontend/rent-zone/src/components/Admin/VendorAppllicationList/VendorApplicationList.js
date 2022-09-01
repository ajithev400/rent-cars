import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosService from '../../../features/axios'

const VendorApplicationList = () => {
    const navigate = useNavigate()
    const [vendorData, setVendorData] = useState([])
    const [searchData,setSearchData] = useState('')
    useEffect(() => {
        axiosService.getVendorApplication(searchData)
        .then((res)=>{
            setVendorData(res.data)
            
        })
    }, [searchData])
    
  return (
    <>
    <div>VendorApplicationList</div>
    <div class="table-wrapper">
        <table class="fl-table">
            <thead>
            <tr>
                <th>Vendor Name</th>
                <th>email</th>
                <th>Model</th>
                <th>GST_number</th>
                <th>Verified</th>
                <th>Status</th>
                <th>More</th>
            </tr>
            </thead>
            {vendorData.map((item)=>(
            <tr key={item.id}>
                <td>{item.vendor_name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.GST_number}</td>
                {item.is_verified?
                <td>
                    <h5 style={{"color":"green"}}>Verified</h5>
                </td>:<td>
                <h5 style={{"color":"red"}}>Not Verified</h5>
                    </td>}
                    {item.is_active?
                <td>
                    <h5 style={{"color":"green"}}>Active</h5>
                </td>:<td>
                <h5 style={{"color":"red"}}>Blocked</h5>
                    </td>}
                <td>
                <button onClick={()=>navigate(`${item.vendor_name}`)} className="btn btn-warning">open</button>
                </td>
            </tr>

            ))}
            
        </table>
    </div>
    </>
    
  )
}

export default VendorApplicationList