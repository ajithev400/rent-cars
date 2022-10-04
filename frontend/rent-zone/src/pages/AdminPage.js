import React from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import AdminNavBar from '../components/Admin/AdminNav/AdminNavBar'
import { logout } from '../features/auth/authSlice'


const AdminPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleOnClick = ()=>{
    // localStorage.removeItem('jwtToken')

    dispatch(logout())
    localStorage.clear()
    navigate('/login')
  }
  return (
    <>
    <div className="container-fluid" style={{"background":"#eee;"}}>
        <div className="row">
          <div className="col">
          <AdminNavBar/>
          </div>
        <div className="col-md-10  col-sm-8 main-content">

      {/* AdminPageBody */}
      <main className="content"  >
				<div className="container-fluid">

					<div className="row mb-2 mb-xl-3 mt-2">
						<div className="col-auto d-none d-sm-block">
							<h3><strong>Rent-Zone</strong> Dashboard</h3>
						</div>

						<div className="col-auto ms-auto text-end mt-n1">
							<button onClick={handleOnClick} className="btn btn-light bg-white me-2">Logout</button>
							<a href="{#}" className="btn btn-primary">New Project</a>
						</div>
					</div>
          <Outlet/>
          
        </div>
        
      </main>
      
        
        </div>
        </div>
      </div>
    </>
  )
}

export default AdminPage