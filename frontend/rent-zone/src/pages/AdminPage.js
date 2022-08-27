import React from 'react'
import AdminNavBar from '../components/Admin/AdminNavBar'



const AdminPage = () => {
  return (
    <>
    <div class="container-fluid">
        <div class="row">
        <AdminNavBar/>
        </div>
        <div className="col-md-10 col-sm-8 main-content">
            {/* Main content code to be written here */}
            <h1>FEEDBACK APPRECIATED! :)</h1>
            <h3>P.S.: For side navbar with dropdown menu, you may refer this snippet: http://bootsnipp.com/user/snippets/kWPoW</h3>
        </div>
      </div>
    </>
  )
}

export default AdminPage