import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAuth, getUser } from '../../features/auth/authSlice'
import { isCustomer, isLoggedIn, isPathAllowed } from '../../utils/commonService'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Base = () => {

  const dispatch = useDispatch()
  const {pathname} = useLocation()
  useEffect(() => {
    dispatch(checkAuth()) 
    dispatch(getUser())
  }, [dispatch])  


  const isAllowed = isPathAllowed(pathname)


  
  if(isLoggedIn() && isAllowed){
    return (
      <>
      {isCustomer() ? <Header/>:null}
      <Outlet/>
      {isCustomer()  ? <Footer/>:null}
      </>
    )
  }else{
    return <Navigate to={'/login'}/>
  }

}

export default Base