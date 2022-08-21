import React from 'react'
import "../../styles/become-driver.css";
import { Container, Row, Col } from "reactstrap";
import driverImg from "../../assets/all-images/max-bmw.png";
import { Link, useNavigate } from 'react-router-dom';


const BecomeVendor = () => {

    const navigate = useNavigate

  return (
    <section className="become__driver">
      <Container>
        <Row>
          <Col lg="6" md="6" sm="12" className="become__driver-img">
            <img src={driverImg} alt="" className="w-100" />
          </Col>

          <Col lg="6" md="6" sm="12">
            <h2 className="section__title become__driver-title">
              Do You Want to Earn With Us? So Don't Be Late
            </h2>

            <button onClick={()=>navigate("/register-vendor")} className="btn become__driver-btn mt-4">
             <Link style={{ 'text-decoration': 'None' }} to={"/register-vendor"} > Become a Vendor </Link> 
            </button>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default BecomeVendor