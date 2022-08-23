import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { checkAuth, getUser } from '../../features/auth/authSlice'

const Base = () => {

  const dispatch = useDispatch()

  const {user,isAuthenticated} = useSelector(state => state.auth)

    useEffect(() => {
      dispatch(checkAuth()) 
      dispatch(getUser())
    }, [dispatch])
    console.log("Auth:",user,isAuthenticated);

  if(isAuthenticated){
    return (
      <Outlet/>
    )
  }else{
    return <Navigate to={'/login'}/>
  }

}

export default Base