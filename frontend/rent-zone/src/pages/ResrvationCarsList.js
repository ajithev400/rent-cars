import React from 'react'
import { useNavigate } from 'react-router-dom';

const ResrvationCarsList = ({item}) => {
 console.log("key:",item.id);
 const navigate = useNavigate()
 const handleOnClickNavigation = ()=>{
  console.log("Click");
  navigate(`reservations/${item.id}`)
 }
  return (
    <>
    <div className="col-sm-6 mb-3" onClick={handleOnClickNavigation}>
        <div className="card h-100">
          <div className="card-body">
            <h4 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2"></i>Reservation</h4>          
            
          <div className="row">
          <div className="col-sm-3">
          <h6 className="mb-0">Car</h6>
          </div>
          <div className="col-sm-9 text-secondary">
            {item.id_cars['name']}
          </div>
          </div>
          <div className="row">
          <div className="col-sm-3">
          <h6 className="mb-0">Model</h6>
          </div>
          <div className="col-sm-9 text-secondary">
          {item.id_cars['model']}
          </div>
          </div>
          <div className="row">
          <div className="col-sm-3">
          <h6 className="mb-0">Rent Date</h6>
          </div>
          <div className="col-sm-9 text-secondary">
          {item.date_from}
          </div>
          </div>
          <div className="row">
          <div className="col-sm-3">
          <h6 className="mb-0">Location</h6>
          </div>
          <div className="col-sm-9 text-secondary">
          {item.location['name']}
          </div>
          </div>
          <div className="row">
          <div className="col-sm-3">
          <h6 className="mb-0">Rent</h6>
          </div>
          <div className="col-sm-9 text-secondary">
          {item.id_cars.price}
          </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ResrvationCarsList