import React, { useEffect, useState } from 'react'
import axiosService from '../../../features/axios'

const UserList = () => {
    const [users, setUsers] = useState([])
    useEffect(() => {
      axiosService.getAllUsers().then((res)=>{
        setUsers(res.data)
      })
      .catch((res)=>{
        console.log("VendorsError:",res);
    })
    }, [])
    console.log("users",users);
    
  return (
    

    <div className="container bootstrap snippets bootdey">
        <div className="row">
            <div className="col-lg-12">
                <div className="main-box no-header clearfix">
                    <div className="main-box-body clearfix">
                        <div className="table-responsive">
                            <table className="table user-list">
                                <thead>
                                    <tr>
                                    <th><span>User</span></th>
                                    <th><span>moblie</span></th>
                                    <th className="text-center"><span>Role</span></th>
                                    <th><span>Email</span></th>
                                    <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    users.map((item)=>{
                                        return(
                                        <tr key={item.id}>
                                            <td>
                                                <img src="https://bootdey.com/img/Content/user_1.jpg" alt="img"/>
                                                <a href="#!" className="user-link">{item.first_name+" "+item.last_name}</a>
                                                <span className="user-subhead">Member</span>
                                            </td>
                                            <td>{item.mobile}</td>
                                            <td className="text-center">
                                                <span className="label label-default">{item.role}</span>
                                            </td>
                                            <td>
                                                <a href="#!">{item.email}</a>
                                            </td>
                                            <td style={{"width": "20%;"}}>
                                                <a href="#!" className="table-link text-warning">
                                                    <span className="fa-stack">
                                                        <i className="fa fa-square fa-stack-2x"></i>
                                                        <i className="fa fa-search-plus fa-stack-1x fa-inverse"></i>
                                                    </span>
                                                </a>
                                                <a href="#!" className="table-link text-info">
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
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserList