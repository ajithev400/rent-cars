import React, { useEffect, useState } from 'react'
import { Col, Form, FormGroup } from 'reactstrap'
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";
import "../styles/payment-method.css";
import "../styles/booking-form.css";
const ReservationForm = () => {
    const userdata = JSON.parse(localStorage.getItem('user'))

    const [formData, setFormData] = useState({
        name:userdata.first_name,
        dateFrom:'',
        dateTo:'',
        idCars:'',
        location:1,
        timeReservation:'',
        transferTime:'',
        documentType:'',
        IdNumber:'',
        phone:'',
        email:'',
        note:'',
        creator:'',
    })
    // useEffect(() => {
    //   setFormData(userdata)
    // }, [])
    const {name,dateFrom,dateTo,idCars,location,timeReservation,transferTime,documentType,IdNumber,phone,email,note,creator} = formData
    console.log("User:",formData);
    const handleOnChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const submitHandler = (event) => {
        event.preventDefault();
      };

    
  return (
    <>  
            <Form style={{"display":'flex'}} onSubmit={submitHandler}>
            <Col lg="7" className="mt-5">
              <div className="booking-info mt-5">
                <h5 className="mb-4 fw-bold ">Booking Information</h5>
                {/* <BookingForm /> */}
                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input 
                    type="text" 
                    placeholder="First Name"
                    name='name'
                    value={name}
                    onChange={handleOnChange}
                    />
                </FormGroup>
                {/* <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input 
                    type="text" 
                    placeholder="location"
                    value={location}
                    />
                </FormGroup> */}
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input 
                    type="text" 
                    placeholder="Last Name"
                    onChange={handleOnChange}
                    />
                </FormGroup>

                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input 
                    type="email" 
                    placeholder="Email" 
                    name='email'
                    value={email}
                    />
                </FormGroup>
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input 
                    type="number" 
                    placeholder="Phone Number" 
                    name='phone'
                    value={phone}
                    />
                </FormGroup>

                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                <select name="location" onChange={handleOnChange}  >
                    <option value="1">Bengaluru</option>
                    
                </select>
                </FormGroup>
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input type="text" name="ToLocation" placeholder='To Location' />
                </FormGroup> 

                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <select name="documentType">
                    <option value="driving Licence">Driving Licence</option>
                    <option value="aadhar">Aadhar</option>
                    <option value="PAN number">PAN Number</option>
                    </select>
                </FormGroup>
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input 
                    type="text" 
                    name="IdNumber" 
                    value={IdNumber}
                    onChange={handleOnChange}
                    placeholder="ID Number" />
                </FormGroup> 

                <FormGroup className="booking__form d-inline-block me-1 mb-4">
                    <input type="date" placeholder="Journey Date" />
                </FormGroup>
                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input type="date" placeholder="Journey Date" />
                </FormGroup>
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input
                    type="time"
                    placeholder="Journey Time"
                    className="time__picker"
                    name='timeReservation'
                    value={timeReservation}
                    onChange={handleOnChange}
                    />
                </FormGroup>

                <FormGroup>
                    <textarea
                    rows={5}
                    type="textarea"
                    className="textarea"
                    placeholder="Write"
                    name='note'
                    value={note}
                    onChange={handleOnChange}
                    ></textarea>
                </FormGroup>
              </div>
            </Col>

            <Col lg="5" className="mt-5">
              <div className="payment__info mt-5">
                <h5 className="mb-4 fw-bold ">Payment Information</h5>
                {/* <PaymentMethod/> */}
                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                <label htmlFor="" className="d-flex align-items-center gap-2">
                <input type="radio" /> Master Card
                </label>

                <img src={masterCard} alt="" />
                </div>

                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                    <input type="radio" /> Razorpay
                    </label>

                    <img src={paypal} alt="" />
                </div>
                <div className="payment text-end mt-5">
                    <button type='submit' >Reserve Now</button>
                </div>
              </div>
            </Col>
            </Form>
    </>
  )
}

export default ReservationForm