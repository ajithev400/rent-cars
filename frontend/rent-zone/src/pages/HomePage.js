import React from 'react'
import {Container, Row, Col} from 'reactstrap'
import Helmet from '../components/Helmet/Helmet'
import HeroSlider from '../components/UI/HeroSlider'
import FindCarForm from '../components/UI/FindCarForm'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

const HomePage = () => {
  return (
    <>
    <Header/>
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