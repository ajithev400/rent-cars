import React, { useEffect, useState } from 'react'
import {Container, Row, Col} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import HeroSlider from '../components/UI/HeroSlider'
import FindCarForm from '../components/UI/FindCarForm'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import { useDispatch} from 'react-redux'
import { checkAuth,getUser } from '../features/auth/authSlice'
import AboutSection from '../components/UI/AboutSection'
import axiosService from '../features/axios'
import CarItem from '../components/UI/CarItem'
// import ServicesList from '../components/UI/ServicesList'

const HomePage = () => {
  const dispatch = useDispatch()

  const [carData, setCarData] = useState([])

  useEffect(() => {
    axiosService.getVehicles()
    .then((res)=>{
      setCarData(res.data)
    })
  }, [])
  
  
  useEffect(()=>{
    dispatch(checkAuth())
    dispatch(getUser())
  },[dispatch])
  
  
  return (
    <>
    <Header  />
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

      <AboutSection/>

      <section>
        <Container>
          <Row>
            <Col lg="12" className="text-center mb-5">
              <h6 className="section__subtitle">Come with</h6>
              <h2 className="section__title">Hot Offers</h2>
            </Col>

            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>

    </Helmet>
    <Footer/>
    </>
  )
}

export default HomePage