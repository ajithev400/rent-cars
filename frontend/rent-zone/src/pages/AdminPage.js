import React from 'react'
import AdminNavBar from '../components/Admin/AdminNav/AdminNavBar'
import OverallStatus from '../components/Admin/OverallStatus/OverallStatus'



const AdminPage = () => {
  return (
    <>
    <div className="container-fluid">
        <div className="row">
          <div className="col">
          <AdminNavBar/>
          </div>
        <div className="col-md-10  col-sm-8 main-content">
        <main className="content"  >
				<div className="container-fluid">

					<div className="row mb-2 mb-xl-3 mt-2">
						<div className="col-auto d-none d-sm-block">
							<h3><strong>Rent-Zone</strong> Dashboard</h3>
						</div>

						<div className="col-auto ms-auto text-end mt-n1">
							<a href="#" className="btn btn-light bg-white me-2">Invite a Friend</a>
							<a href="#" className="btn btn-primary">New Project</a>
						</div>
					</div>
          <OverallStatus/>
          
        </div>
        
      </main>
        </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage