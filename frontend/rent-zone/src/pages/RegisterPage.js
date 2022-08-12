import '../styles/LoginPageStyle.css'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {registerUser} from '../features/auth/authSlice'
import Helmet from '../components/Helmet/Helmet'
import OtpForm from '../components/Otp/OtpForm'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const {registered, isLoading } = useSelector(state => state.auth)

    const [formData, setFormData] = useState({
        first_name:'',
        last_name:'',
        email:'',
        mobile:'',
        password:'',
        password2:''
      })

      const {first_name, last_name, email, mobile, password, password2}= formData
      
      const handleOnChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleOnSubmit = (e) =>{
      e.preventDefault()
      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!first_name || !last_name || !mobile || !password || !email || !password2) {
      toast.error("Enter all fields");
      } else if (!regex.test(email)) {
      toast.error("Email is invalid");
      } else if (!/^\d{10}$/.test(mobile)){
         toast.error("Invalid number must be ten digits")
      }else if (password.length <= 6){
         toast.error("Password must be at least 6 digit!")
      }
       else if (password !== password2) {
      toast.error("These passwords don't match");
      } else {
      dispatch(registerUser(formData));

      }
  }
  if (registered) return <OtpForm mobile = {formData.mobile} />
  return (
    <Helmet  title = 'Login' >
    <div className="sidenav">
         <div className="login-main-text">
            <h2>Rent-Zone<br/>Register Page</h2>
            {/* <p>Login or register from here to access.</p> */}
         </div>
      </div>
      <div className="main">
         <div className="col-md-6 col-sm-12">
            <div className="login-form">
               <form onSubmit={handleOnSubmit}>
                  <div className="form-group">
                     <label>Email</label>
                     <input 
                     type="email"
                     name='email'
                     onChange={handleOnChange}
                     value={email} 
                     className="form-control mt-2" 
                     placeholder="Email"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>First Name</label>
                     <input 
                      type="text"
                      name='first_name'
                      onChange={handleOnChange}
                      value={first_name}
                      className="form-control mt-2" 
                      placeholder="First Name"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>Last Name</label>
                     <input 
                      type="text"
                      name='last_name'
                      onChange={handleOnChange}
                      value={last_name}
                      className="form-control mt-2" 
                      placeholder="Last Name"/>
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
                     <label>Password</label>
                     <input 
                      type="password"
                      name='password'
                      onChange={handleOnChange}
                      value={password}
                      className="form-control mt-2" 
                      placeholder="Password"/>
                  </div>
                  <div className="form-group mt-2">
                     <label>Conform Password</label>
                     <input 
                      type="password"
                      name='password2'
                      onChange={handleOnChange}
                      value={password2}
                      className="form-control mt-2" 
                      placeholder="Password"/>
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

               <p className='mt-3'>
                      Have already an account?{" "}
                      <Link to="/login" className=" text-body">
                        <u>Login</u>
                      </Link>
                    </p>
            </div>
         </div>
      </div>
    </Helmet>
  )
}

export default RegisterPage