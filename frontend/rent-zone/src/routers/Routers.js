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
import Base from '../components/Layout/Base'
import VendorPage from '../pages/VendorPage'
import AdminPage from '../pages/AdminPage'
import VehicleList from '../pages/VehicleList'
import OverallStatus from '../components/Admin/OverallStatus/OverallStatus'
import VendorApplicationList from '../components/Admin/VendorAppllicationList/VendorApplicationList'
import VendorDetails from '../pages/VendorDetails/VendorDetails'
import UserProfile from '../pages/UserProfile'
import ReservationDetals from '../pages/ReservationDetals'
import VendorList from '../components/Admin/VendorList/VendorList'
import UserList from '../components/Admin/UserList/UserList'
import SingleCarExtentedDetails from '../pages/VendorDetails/SingleCarExtentedDetails'
import Payment from '../pages/Payment'
import CarAddingForm from '../pages/CarAddingForm'
import Vendor from '../components/UI/Vendor'
import UnApprovedCarList from '../components/Admin/UnApprovedCarList/UnApprovedCarList'
import UnApprovedCarDetail from '../components/Admin/UnApprovedCarList/UnApprovedCarDetail'

const Routers = () => {
  return (
    <Routes>
        <Route path ='/register' element = {<RegisterPage/>} />
        <Route path ='/login' element = {<LoginPage/>} />
        <Route path='/' element={<Base/>}>

          <Route index element = {<HomePage/>} />
          <Route path ='cars' element = {<CarListing/>} />
          <Route path ='cars/:slug' element = {<CarDetails/>} />
          <Route path ='blogs' element = {<Blog/>} />
          <Route path ='Blogs/:slug' element = {<BlogDetails/>} />
          <Route path ='account' element = {<UserProfile/>} />
          <Route path ='account/reservations/:slug' element = {<ReservationDetals/>} />
          <Route path ='register-vendor' element = {<VendorRegPage/>} />  
          <Route path='cars/:slug/payment' element = {<Payment/>} /> 
          <Route path ='vendor-dashboard' element = {<Vendor/>}>
            <Route index element={<VendorPage/>} />
            <Route path='add-cars' element= {<CarAddingForm/>} />
            
            </Route>   
          <Route path ='admin' element = {<AdminPage/>}>
            <Route index element= {<OverallStatus/>} />
            <Route path ='vehicles' element= {<VehicleList/>} />
            <Route path ='vehicles/new' element= {<UnApprovedCarList/>} />
            <Route path ='new-applications' element= {<VendorApplicationList/>} />
            <Route path ='vendor/:slug' element= {<VendorDetails/>} />
            <Route path ='vendor-list' element = {<VendorList/>} />
            <Route path = 'vendor-car/:slug' element = {<SingleCarExtentedDetails/>} />
            <Route path='vendor-car/unverified/:slug' element = {<UnApprovedCarDetail/>} />
            <Route path ='user-list' element = {<UserList/>} />
          </Route>   
        </Route>
        <Route path ='*' element = {<NotFound/>} />

    </Routes>
  )
}

export default Routers