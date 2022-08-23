import React from 'react'
import {Routes, Route} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Blog from '../pages/Blog'
import BlogDetails from '../pages/BlogDetails'
import CarListing from '../pages/CarListing'
import CarDetails from '../pages/CarDetails'
import NotFound from '../pages/NotFound'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import VendorRegPage from '../pages/VendorRegPage'
import Base from '../components/Layout.js/Base'

const Routers = () => {
  return (
    <Routes>
        <Route path ='/register' element = {<RegisterPage/>} />
        <Route path ='/login' element = {<LoginPage/>} />
        <Route path='/' element={<Base/>}>

          <Route index element = {<HomePage/>} />
          <Route path ='/cars' element = {<CarListing/>} />
          <Route path ='/cars/:slug' element = {<CarDetails/>} />
          <Route path ='/blogs' element = {<Blog/>} />
          <Route path ='/Blogs/:slug' element = {<BlogDetails/>} />
          <Route path ='register-vendor' element = {<VendorRegPage/>} />   
        </Route>
        <Route path ='*' element = {<NotFound/>} />

    </Routes>
  )
}

export default Routers