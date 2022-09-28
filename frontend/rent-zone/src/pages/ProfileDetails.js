import React, { useState } from 'react'

const ProfileDetails = ({user}) => {
  console.log("user",user);
  const [formData, setFormData] = useState({
    first_name:user.first_name,
    email:user.email,
    phone:user.phone,
    profile_picture:null,
    gender:'',
  })
  const [edit, setEdit] = useState(false)

  const {first_name,email,phone,profile_picture,gender}=formData

  const handleOnChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleOnEdit = ()=>{
    setEdit(true)
  }
  console.log("FormData:::",formData);
  console.log(user.first_name);
  return (
    <>
    {edit?
    <div>
    <div className="card-body">
        <div className="row">
        <h4 className="d-flex align-items-center mb-3">Profile</h4>

          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input 
            value={first_name} 
            name="first_name" 
            onChange={handleOnChange}
            type="text" 
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            <input 
            type="text" 
            name='email' 
            value={email} 
            onChange={handleOnChange}
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            
            <input 
            type="text" 
            name='phone' 
            value={phone} 
            onChange={handleOnChange}
            />
          </div>
        </div>
        <hr/>
        {/* <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            (320) 380-4539
          </div>
        </div>
        <hr/> */}
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            Bay Area, San Francisco, CA
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-info " target="__blank" onClick={handleOnEdit} >Edit</a>
          </div>
        </div>
      </div>   
  </div>:
    <div className="card-body">
        <div className="row">
        <h4 className="d-flex align-items-center mb-3">Profile</h4>

          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user.first_name}
          </div>
          
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user.email}
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {user.phone}
          </div>
        </div>
        <hr/>
        {/* <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            (320) 380-4539
          </div>
        </div>
        <hr/> */}
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            Bay Area, San Francisco, CA
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <a className="btn btn-info " target="__blank" onClick={handleOnEdit} >Edit</a>
          </div>
        </div>
      </div>    
    }
    </>
  )
}

export default ProfileDetails