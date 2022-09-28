import React from 'react'
import { Link } from 'react-router-dom'
import "../../../styles/Admin/AdminStyle.css"

const AdminNavBar = () => {
  return (
    <>
            <div className="col-md-2 col-sm-4 nav sidebar1">
                <div className="logo">
                    {/* <img className="img-responsive center-block" alt="Logo"/> */}
                </div>
                <br/>
                <div className="left-navigation ">
                    <ul className="list">
                        <h5><strong>Dashboard</strong></h5>
                        <li><Link to={'/admin'}>Home</Link></li>
                        <li><Link to={'vehicles'}>Vehicles</Link></li>
                        <li><Link to={'user-list'}>Users</Link></li>
                        <li><Link to={'vendor-list'}>Vendors</Link></li>
                        <li>Vehicle Status</li>
                        <li>Sales</li>
                    </ul>

                    <br/>

                    <ul className="list">
                        <h5><strong>Status</strong></h5>
                        <li><Link to={'new-applications'}>New Vendor Applications</Link></li>
                        {/* <li>Rafting</li>
                        <li>Badminton</li>
                        <li>Tennis</li>
                        <li>Sketching</li>
                        <li>Horse Riding</li> */}
                    </ul>
                </div>
            </div>

    </>

  )
}

export default AdminNavBar