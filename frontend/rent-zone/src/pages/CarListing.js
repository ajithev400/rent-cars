import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Helmet from '../components/Helmet/Helmet'
import CarItem from "../components/UI/CarItem";
import carData from "../assets/data/carData";
import axiosService from '../features/axios';

const CarListing = () => {
  const [carsData, setCarsData] = useState([])
  
  useEffect(() => {
    axiosService.getVehicles()
    .then((res)=>{
      setCarsData(res.data)
    })
    // console.log('res:',axiosService.getVehicles());
  }, [])

  return (
    <>
    <Header/>
    <Helmet title = 'Cars'>
    <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select>
                  <option>Select</option>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select>
              </div>
            </Col>

            {carsData.map((item) => (
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

export default CarListing