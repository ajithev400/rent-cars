import React from 'react'
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
                        <li>Home</li>
                        <li>Vehicles</li>
                        <li>Users</li>
                        <li>Vendors</li>
                        <li>Vehicle Status</li>
                        <li>Sales</li>
                    </ul>

                    <br/>

                    <ul className="list">
                        <h5><strong>Status</strong></h5>
                        <li>New Vendor Applications</li>
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