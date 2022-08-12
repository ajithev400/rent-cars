import React from 'react'
import {Routes, Route, Navigate} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import About from '../pages/About'
import Blog from '../pages/Blog'
import BlogDetails from '../pages/BlogDetails'
import CarListing from '../pages/CarListing'
import CarDetails from '../pages/CarDetails'
import NotFound from '../pages/NotFound'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'

const Routers = () => {
  return (
    <Routes>
        <Route path = '/' element={<Navigate to='/home'/>}/>
        <Route path ='/home' element = {<HomePage/>} />
        <Route path ='/about' element = {<About/>} />
        <Route path ='/cars' element = {<CarListing/>} />
        <Route path ='/cars/:slug' element = {<CarDetails/>} />
        <Route path ='/blog' element = {<Blog/>} />
        <Route path ='/Blogs/:slug' element = {<BlogDetails/>} />
        <Route path ='*' element = {<NotFound/>} />
        <Route path ='/register' element = {<RegisterPage/>} />
        <Route path ='/login' element = {<LoginPage/>} />
    </Routes>
  )
}

export default Routers