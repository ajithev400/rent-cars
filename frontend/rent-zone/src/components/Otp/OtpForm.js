import React, { useState } from 'react'
import Helmet from '../Helmet/Helmet'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import { sendOtp } from '../../features/auth/authSlice'
import { Navigate } from 'react-router-dom'

const OtpForm = ({mobile}) => {

    const dispatch = useDispatch()

    const {isVerifeyed, isLoading } = useSelector(state => state.auth)
    
    const [formData, setFormData] = useState({
        otp : '',
        mobile
    })
    
    const {otp} = formData

    const handleOnChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        if (!otp){
            toast.error('Fill the field')
        } else {
            dispatch(sendOtp(formData))
            console.log(formData);
        }
    }
    if (isVerifeyed) return <Navigate to= "/login"/>
  return (
    <Helmet title = 'Login'>
      <div className="sidenav">
         <div className="login-main-text">
            <h2>Rent-Zone<br/> Login Page</h2>
            {/* <p>Login or register from here to access.</p> */}
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form onSubmit={handleOnSubmit}>
                  <div className="form-group mt-2">
                     <label>OTP</label>
                     <input 
                      type="number"
                      name='otp'
                      onChange={handleOnChange}
                      value={otp}
                      className="form-control mt-2" 
                      placeholder="OTP"/>
                  </div>
                  {isLoading ?(
                    <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  ):(
                  <button type="submit" className="btn btn-warning mt-2">Login</button>
                  )}
                  {/* <button type="submit" className="btn btn-secondary mt-2 ms-2">Register</button> */}
               </form>

               <p className='mt-3'>
                      1/3
                      <Link to="/" className=" text-body">
                        <u>Skip</u>
                      </Link>
                    </p>

                    {/* <p className='mt-3'>
                      Regiser as Vendor{" "}
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

export default OtpForm