import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
// import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Helmet from '../components/Helmet/Helmet'
import axiosService from '../features/axios'

const VendorRegPage = () => {

    const {isLoading} = useSelector(state=>state.auth)
    const inputRef = useRef()

    const [formData, setFormData] = useState({
        vendor_name:'',
        mobile:'',
        GST_number:'',
        image:null
      })

    const { vendor_name, mobile, GST_number}= formData

    const handleOnChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleImageChange = (e) =>{
        console.log(inputRef.current.files[0]);
        setFormData({...formData,[e.target.name]:inputRef.current.files[0]})
        // ref = {inputRef}
        // image:e.target.files[0]
    }

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        // const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!vendor_name || !mobile || !GST_number) {
        toast.error("Enter all fields");
        }  else if (!/^\d{10}$/.test(mobile)){
           toast.error("Invalid number must be ten digits")
        } else {
        axiosService.createVendor(formData)
        }
    }


  return (
    <Helmet title = 'Register As Vendor' >
    {/* <div className="sidenav">
         <div className="login-main-text">
            <h2>Rent-Zone Vendor<br/>Register Page</h2>
            <p>Login or register from here to access.</p>
         </div>
      </div> */}
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form onSubmit={handleOnSubmit}>
                  {/* <div className="form-group">
                     <label>Email</label>
                     <input 
                     type="email"
                     name='email'
                     onChange={handleOnChange}
                     value={email} 
                     className="form-control mt-2" 
                     placeholder="Email"/>
                  </div> */}
                  <div className="form-group mt-2">
                     <label>Vendor Name</label>
                     <input 
                      type="text"
                      name='vendor_name'
                      onChange={handleOnChange}
                      value={vendor_name}
                      className="form-control mt-2" 
                      placeholder="Vendor Name"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>GST Number</label>
                     <input 
                      type="text"
                      name='GST_number'
                      onChange={handleOnChange}
                      value={GST_number}
                      className="form-control mt-2" 
                      placeholder="GST Number"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>Mobile</label>
                     <input 
                      type="number"
                      name='mobile'
                      onChange={handleOnChange}
                      value={mobile}
                      className="form-control mt-2" 
                      placeholder="Mobile"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>Profile Image</label>
                     <input 
                      type="file"
                      name='image'
                      id='image'
                      accept='image/*'
                      ref={inputRef}
                      onChange={handleImageChange}
                      className="form-control mt-2" 
                      placeholder="Mobile"/>
                  </div>
                  {isLoading?(
                     <div className="spinner-border text-primary" role="status">
                     <span className="visually-hidden">Loading...</span>
                   </div>
                  ):(
                  <button type="submit" className="btn btn-warning mt-2">Register</button>
                  )}
                  {/* <button type="submit" className="btn btn-secondary mt-2 ms-2">Register</button> */}
               </form>
{/* 
               <p className='mt-3'>
                      Have already an account?{" "}
                      <Link to="/login" className=" text-body">
                        <u>Login</u>
                      </Link>
                    </p> */}
            </div>
         </div>
      </div>
    </Helmet>
  )
}

export default VendorRegPage