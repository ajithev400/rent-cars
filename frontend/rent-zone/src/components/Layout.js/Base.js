import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAuth, getUser } from '../../features/auth/authSlice'
import { isLoggedIn, isPathAllowed } from '../../utils/commonService'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Base = () => {

  const dispatch = useDispatch()

  const {pathname} = useLocation()

  const isAllowed = isPathAllowed(pathname)


    useEffect(() => {
      dispatch(checkAuth()) 
      dispatch(getUser())
    }, [dispatch])  
  
  if(isLoggedIn() && isAllowed){
    return (
      <>
      {pathname !== '/admin'  ? <Header/>:null}
      <Outlet/>
      {pathname !== '/admin'  ? <Footer/>:null}
      </>
    )
  }else{
    return <Navigate to={'/'}/>
  }

}

export default Base