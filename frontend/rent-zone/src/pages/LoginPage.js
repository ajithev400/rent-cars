import '../styles/LoginPageStyle.css'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {toast} from 'react-toastify'
import {login} from '../features/auth/authSlice'
import { Navigate } from 'react-router-dom'
import Helmet from '../components/Helmet/Helmet'

const LoginPage = () => {
   const dispatch = useDispatch()

    const {isAuthenticated,message} = useSelector(
        state => state.auth
    )

    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const {email, password} = formData

    const handleOnChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value})
    }
   
    useEffect(() => {
      if(message){
         toast.error("Username or password is incorect")
      }
    }, [message])
    
    const handleOnSubmit = (e) =>{
        e.preventDefault()
        const regex =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!password || !email) {
        toast.error("Enter all fields");
        } else if (!regex.test(email)) {
        toast.error("Email is invalid");
        } else {
        dispatch(login(formData));
        }
    }
    
    if (isAuthenticated) return <Navigate to='/' />;
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
                     <label>Password</label>
                     <input 
                      type="password"
                      name='password'
                      onChange={handleOnChange}
                      value={password}
                      className="form-control mt-2" 
                      placeholder="Password"/>
                  </div>
                  <button type="submit" className="btn btn-warning mt-2">Login</button>
                  {/* <button type="submit" className="btn btn-secondary mt-2 ms-2">Register</button> */}
               </form>

               <p className='mt-3'>
                      Have already an account?{" "}
                      <Link to="/register" className=" text-body">
                        <u>Register here</u>
                      </Link>
                    </p>
            </div>
         </div>
      </div>

    </Helmet>
  )
}

export default LoginPage