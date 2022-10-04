import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Col, Form, FormGroup } from 'reactstrap'
import masterCard from "../assets/all-images/master-card.jpg";
import paypal from "../assets/all-images/paypal.jpg";
import "../styles/payment-method.css";
import "../styles/booking-form.css";
import axiosService from '../features/axios';
import { toast } from 'react-toastify';


const ReservationForm = ({singleCar}) => {
    const userdata = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate()
    const date = new Date()
    const miliSec = date.getTime()
    var hr = date.getHours()
    var min = date.getMinutes()
    var sec = date.getSeconds()    
    const currentTime = hr +":"+min+":"+sec
    const [razorpay, setRazorpay] = useState(false)
    const [formData, setFormData] = useState({
        name:userdata.first_name,
        dateFrom:'',
        dateTo:'',
        timeReservation:'',
        IdNumber:'',
        note:'',
        idCars:'',
        location:'',
        documentType:'Driving Licence',
        phone:userdata.mobile,
        email:userdata.email,
        creator:userdata.id,
        transferTime:miliSec,
    })
    useEffect(() => {
        setFormData({...formData,idCars:singleCar.id, 
            location:singleCar.location, 
            creator:singleCar.owner,
            // dateFrom:
        })
    }, [singleCar.owner,singleCar.location,singleCar.id])
    
    const {name,dateFrom,dateTo,timeReservation,documentType,IdNumber,phone,email,note} = formData
    const handleOnChange =(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }
    const handleDateChange = (e)=>{
        setFormData({...formData,[e.target.name]:e.target.value +" "+ currentTime})
        
    }
    const handleTimeChange = (e)=>{
        setFormData({...formData,[e.target.name]:miliSec})
    }

    const handlePaymentChange = ()=>{
        setRazorpay(!razorpay)
    }
    console.log("razorpay:",razorpay);
    console.log("formData",formData);

    const submitHandler = (e) => {
        e.preventDefault();
        if(!razorpay){
            toast.error('choose a payment method')
        }else{

            axiosService.createCarReservation(formData)
            .then((res)=>{
                
              toast.success(res.message)
              localStorage.setItem('reservationData',JSON.stringify(formData))
              localStorage.setItem('reservationId',JSON.stringify(res.data))
              navigate('payment/')
            })
            .catch((res)=>{
                toast.error(res.message)
            })
            
        }
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
                    // onChange={handleOnChange}
                    />
                </FormGroup>

                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={handleOnChange}
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
                    onChange={handleOnChange}
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
                    <select name="documentType" value={documentType} onChange={handleOnChange}>
                    <option >Driving Licence</option>
                    <option >Aadhar</option>
                    <option >PAN Number</option>
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
                    <input 
                    type="date" 
                    placeholder="Journey Date" 
                    onChange={handleDateChange}
                    name='dateFrom'
                    value={dateFrom}
                    />
                </FormGroup>
                <FormGroup className="booking__form d-inline-block me-4 mb-4">
                    <input 
                    type="date" 
                    placeholder="Return Date" 
                    onChange={handleDateChange}
                    name='dateTo'
                    value={dateTo}
                    />
                </FormGroup>
                <FormGroup className="booking__form d-inline-block ms-1 mb-4">
                    <input
                    type="time"
                    placeholder="Journey Time"
                    className="time__picker"
                    name='timeReservation'
                    value={timeReservation}
                    onChange={handleTimeChange}
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
                <input type="checkbox"  name= 'mastar-card' /> Master Card
                </label>

                <img src={masterCard} alt="master-card" />
                </div>

                <div className="payment mt-3 d-flex align-items-center justify-content-between">
                    <label htmlFor="" className="d-flex align-items-center gap-2">
                    <input type="checkbox" checked= {razorpay} value={razorpay} name= 'razorpay' onChange={handlePaymentChange} /> Razorpay
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