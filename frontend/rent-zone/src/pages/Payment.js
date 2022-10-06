import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosService from '../features/axios';

const  API_URL = process.env.REACT_APP_API_URL
const token = JSON.parse(localStorage.getItem('jwtToken'))
console.log(API_URL);

const Payment = () => {
  const {slug} = useParams()
  console.log("params:",slug);
  const [car, setCar] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [days, setdays] = useState(0)
  const [paymentData, setpaymentData] = useState({})
  const [formData, setFormData] = useState({
    "amount":null,
    "name":'',
    "car_id":'',
    "date_from":'',
    "date_to":'',
    "res_id":''
  })
  console.log("FormData:",formData);
  const reservationData = JSON.parse(localStorage.getItem('reservationData'))
  const reservationId = JSON.parse(localStorage.getItem("reservationId"))
  console.log("ReservaionId",reservationId);
  console.log("reservationData:",reservationData);

  useEffect(() => {
    axiosService.getSingleCar(slug)
    .then((res)=>{
      setCar(res.data)
      
      const data_form = new Date(reservationData.dateFrom)
      const date_to = new Date(reservationData.dateTo)
      const days =(Math.trunc((date_to-data_form)/(1000*60*60*24)))
      setdays(days)
    
      console.log(days,car.price);
      const sub_total = (days*res.data.price)
      
      setSubTotal(sub_total)
      setFormData({
        "amount":sub_total,
        "name":reservationData.name,
        "car_id":reservationData.idCars,
        "date_from":reservationData.dateFrom.slice(0,10),
        "date_to":reservationData.dateTo.slice(0,10),
        "res_id":reservationId.reservation_id,
      })
    })
    // console.log('reserivationId:::',reservationId.reservation_id);
    
  }, [slug])

  console.log("car:",car);
  // this will load a script tag which will open up Razorpay payment card to make //transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const handlePaymentSucess = async (response) =>{
    try{
        let bodyData = new FormData()
        bodyData.append("response",JSON.stringify(response))
        bodyData.append('res_id',JSON.stringify(reservationId.reservation_id))
        console.log("BodyData",bodyData);
        axiosService.handlePaymentSuccess(bodyData)
        .then((res)=>{
            console.log("Everything is Ok!");
            setFormData({
                "amount":null,
                "name":'',
                "car_id":'',
                "date_from":'',
                "date_to":'',
                "res_id":'',
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }catch(error){
        console.log(console.error())
    }
  }

  const showRazorpay = async () =>{
    const res = await loadScript()

    const data = await axiosService.reservationPayment(formData)
    .then((res)=>{
        console.log("res",res);
        setpaymentData(res.data)
      return res.data
    })

    console.log("DATA",data);

    var options = {
        key_id: process.env.REACT_APP_RAZOR_KEY_ID,
        key_secret : process.env.REACT_APP_RAZOR_KEY_SECRET,
        amount: paymentData.payment.amount,
        currency: "INR",
        name: "Org. Name",
        description: "Test teansaction",
        image: "", // add image url
        order_id:paymentData.payment.id,
        handler: function(response){
            handlePaymentSucess(response)
        },
        prefill: {
            name: reservationData.name,
            email: reservationData.email,
            contact: reservationData.phone,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },

    }
    var rzpl = new window.Razorpay(options)
    rzpl.open()
    console.log(options,"Options");
  }
  
  return (
    <>
      <div className="container">
        <div className="row m-0">
            <div className="col-lg-7 pb-5 pe-lg-5">
                <div className="row">
                    <div className="col-12 p-5">
                        <img src={car.image}
                            alt="img"/>
                    </div>
                    <div className="row m-0 bg-light">
                        <div className="col-md-4 col-6 ps-30 pe-0 my-4">
                            <p className="text-muted">Model</p>
                            <p className="h5">{car.model}</p>
                        </div>
                        <div className="col-md-4 col-6  ps-30 my-4">
                            <p className="text-muted">Transmission</p>
                            <p className="h5 m-0">{car.transmission}</p>
                        </div>
                        <div className="col-md-4 col-6 ps-30 my-4">
                            <p className="text-muted">Seat Type</p>
                            <p className="h5 m-0">{car.seat_type}</p>
                        </div>
                        {/* <div className="col-md-4 col-6 ps-30 my-4">
                            <p className="text-muted">Body</p>
                            <p className="h5 m-0">Coupe</p>
                        </div>
                        <div className="col-md-4 col-6 ps-30 my-4">
                            <p className="text-muted">Color</p>
                            <p className="h5 m-0">White</p>
                        </div>
                        <div className="col-md-4 col-6 ps-30 my-4">
                            <p className="text-muted">Daily UI</p>
                            <p className="h5 m-0">#002</p>
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="col-lg-5 p-0 ps-lg-4">
                <div className="row m-0">
                    <div className="col-12 px-4">
                        <div className="d-flex align-items-end mt-4 mb-2">
                            <p className="h4 m-0"><span className="pe-1">{car.name}</span></p>
                            
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="textmuted">Days</p>
                            <p className="fs-14 fw-bold">{days}</p>
                        </div>
                        <div className="d-flex justify-content-between mb-2">
                            <p className="textmuted">Subtotal</p>
                            <p className="fs-14 fw-bold"><span className="fas fa-dollar-sign pe-1"></span>{subTotal}</p>
                        </div>
                        
                        <div className="d-flex justify-content-between mb-3">
                            <p className="textmuted fw-bold">Total</p>
                            <div className="d-flex align-text-top ">
                                <span className="fas fa-dollar-sign mt-1 pe-1 fs-14 "></span><span className="h4">{subTotal}/-</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 px-0">
                        <div className="row bg-light m-0">
                            <div className="col-12 px-4 my-4">
                                <p className="fw-bold">Payment detail</p>
                            </div>
                            {/* <div className="col-12 px-4">
                                <div className="d-flex  mb-4">
                                    <span className="">
                                        <p className="text-muted">Card number</p>
                                        <input className="form-control" type="text" value="4485 6888 2359 1498"
                                            placeholder="1234 5678 9012 3456"/>
                                    </span>
                                    <div className=" w-100 d-flex flex-column align-items-end">
                                        <p className="text-muted">Expires</p>
                                        <input className="form-control2" type="text" value="01/2020" placeholder="MM/YYYY"/>
                                    </div>
                                </div>
                                <div className="d-flex mb-5">
                                    <span className="me-5">
                                        <p className="text-muted">Cardholder name</p>
                                        <input className="form-control" type="text" value="David J.Frias"
                                            placeholder="Name"/>
                                    </span>
                                    <div className="w-100 d-flex flex-column align-items-end">
                                        <p className="text-muted">CVC</p>
                                        <input className="form-control3" type="text" value="630" placeholder="XXX"/>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                        <div className="row m-0">
                            <div className="col-12  mb-4 p-0">
                                <button type='submit' onClick={showRazorpay} className="btn btn-primary">Pay with Razorpay</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Payment