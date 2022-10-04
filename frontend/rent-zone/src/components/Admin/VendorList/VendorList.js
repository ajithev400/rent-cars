import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosService from '../../../features/axios'
import '../../../styles/Admin/adminTableCss.css'

const VendorList = () => {
    const navigate = useNavigate()
    const [vendors, setVendors] = useState([])
    useEffect(() => {
        axiosService.getallVendors().then((res)=>{
            const data = res.data.results.filter((item)=>item.is_verified===true)
            setVendors(data)
        })
        .catch((res)=>{
            console.log("VendorsError:",res);
        })
    }, [])
    console.log(vendors);
    
  return (
    <>
    
    <div className="container">
    <div className="row">
        <div className="col-lg-12">
            <div className="main-box clearfix">
                <div className="table-responsive">
                    <table className="table user-list">
                        <thead>
                            <tr>
                                <th><span>User</span></th>
                                <th><span>Created</span></th>
                                <th className="text-center"><span>Status</span></th>
                                <th><span>Email</span></th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            vendors.map((items)=>{
                                return(
                                <tr key={items.id}>
                                    <td onClick={()=> navigate(`/admin/vendor/${items.id}`)} >
                                        <img src={items.image} alt="img"/>
                                        <a href="#!" className="user-link">{items.vendor_name}.</a>
                                        <span className="user-subhead">{items.GST_number}</span>
                                    </td>
                                    <td>
                                        {items.created_at.slice(0,10)}
                                    </td>
                                    <td className="text-center">
                                        {
                                            items.is_active?
                                            <span className="label label-success">Active</span>
                                            :<span className="label label-success">Block</span>
                                        }
                                    </td>
                                    <td>
                                        <a href="#!">{items.email}</a>
                                    </td>
                                    <td st  yle={{"width": "20%;"}}>
                                        <Link to={`/admin/vendor/${items.id}`} className="table-link">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </Link>
                                        <a href="#!" className="table-link">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-pencil fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                        <a href="#!" className="table-link danger">
                                            <span className="fa-stack">
                                                <i className="fa fa-square fa-stack-2x"></i>
                                                <i className="fa fa-trash-o fa-stack-1x fa-inverse"></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                )
                            })
                        }

                        </tbody>
                    </table>
                </div>
                <ul className="pagination pull-right">
                    <li><a href="#!"><i className="fa fa-chevron-left"></i></a></li>
                    <li><a href="#!">1</a></li>
                    <li><a href="#!">2</a></li>
                    <li><a href="#!">3</a></li>
                    <li><a href="#!">4</a></li>
                    <li><a href="#!">5</a></li>
                    <li><a href="#!"><i className="fa fa-chevron-right"></i></a></li>
                </ul>
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default VendorList