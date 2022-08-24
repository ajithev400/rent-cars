import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { checkAuth, getUser } from '../../features/auth/authSlice'
import { isLoggedIn, isPathAllowed } from '../../utils/commonService'

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
      <Outlet/>
    )
  }else{
    return <Navigate to={'/'}/>
  }

}

export default Base