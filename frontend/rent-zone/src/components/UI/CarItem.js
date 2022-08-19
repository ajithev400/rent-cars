import React from 'react'
import { Col } from "reactstrap";
import { Link, useNavigate} from "react-router-dom";
import "../../styles/car-item.css";

const CarItem = (props) => {

    const { image, model, vehicle_name, slug, transmission, speed, price } = props.item;
    const navigate = useNavigate()
  return (
    <Col lg="4" md="4" sm="6" className="mb-5">
      <div className="car__item">
        <div className="car__img">
          <img src={image} alt="" className="w-100" />
        </div>

        <div className="car__item-content mt-4">
          <h4 className="section__title text-center">{vehicle_name}</h4>
          <h6 className="rent__price text-center mt-">
          ₹{price}.00 <span>/ Day</span>
          </h6>

          <div className="car__item-info d-flex align-items-center justify-content-between mt-3 mb-4">
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-car-line"></i> {model}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-settings-2-line"></i> {transmission}
            </span>
            <span className=" d-flex align-items-center gap-1">
              <i className="ri-timer-flash-line"></i> {speed}
            </span>
          </div>

          <button onClick={()=>navigate(`/cars/${slug}`)} className=" w-50 car__item-btn car__btn-rent">
            <Link to={`/cars/${slug}`}>Rent</Link>
          </button>

          <button onClick={()=>navigate(`/cars/${slug}`)} className=" w-50 car__item-btn car__btn-details">
            <Link to={`/cars/${slug}`}>Details</Link>
          </button>
        </div>
      </div>
    </Col>
  )
}

export default CarItem