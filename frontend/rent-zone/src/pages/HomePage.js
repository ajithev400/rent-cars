import React, { useEffect, useState } from 'react'
import {Container, Row, Col} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import HeroSlider from '../components/UI/HeroSlider'
import FindCarForm from '../components/UI/FindCarForm'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import axiosService from '../features/axios'
import { useDispatch } from 'react-redux'
import { checkAuth } from '../features/auth/authSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  
  useEffect(() => { 
  const fetchData = async () => {  
  const result = await axiosService.getUser();
  setUser(result); 
    
  }
  fetchData();
  },[])
  
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])
  
  
  return (
    <>
    <Header user = {user} />
    <Helmet title = 'Home'>
      <section className='p-0 hero__slider-section'>
        <HeroSlider/>

        <div className="hero__form">
        <Container>
            <Row className="form__row">
              <Col lg="4" md="4">
                <div className="find__cars-left">
                  <h2>Find your best car here</h2>
                </div>
              </Col>

              <Col lg="8" md="8" sm="12">
                <FindCarForm />
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
    <Footer/>
    </>
  )
}

export default HomePage