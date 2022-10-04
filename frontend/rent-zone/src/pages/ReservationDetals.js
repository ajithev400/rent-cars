import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import axiosService from '../features/axios';

function ReservationDetals() {
    const API_URL = 'http://127.0.0.1:8000'
    const param = useParams()
    const id = param.slug
    const [reservation, setReservation] = useState({})
    const imageUrl = reservation?.id_cars?.image
    console.log(API_URL+imageUrl);
    useEffect(() => {
        axiosService.getReservationDetails(id)
        .then((res)=>{
          setReservation(res.data)
        })
        .catch((res)=>{
          toast.error(res.data)
        })
    }, [id])
  return (
    <div>
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha256-2XFplPlrFClt0bIdPgpz8H7ojnk10H69xRqd9+uTShA=" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ti-icons@0.1.2/css/themify-icons.css"/> */}
        <div className='container mt-1 mb-1'>
            <div className="row justify-content-center">
                <div className="col-md-7 col-lg-4 mb-5 mb-lg-0 wow fadeIn">
                    <div className="card border-0 shadow">
                        <img src={API_URL+imageUrl} alt={reservation?.id_car?.image}/>
                        <div className="card-body p-1-9 p-xl-5">
                            <div className="mb-4">
                                <h3 className="h4 mb-0">{reservation?.id_cars?.name}</h3>
                                <span className="text-primary">{reservation?.id_cars?.brand} {reservation?.id_cars?.model}</span>
                            </div>
                            <ul className="list-unstyled mb-4">
                                <li className="mb-3"><i className="far fa-envelope display-25 me-3 text-secondary">Reg Number</i>{reservation?.id_cars?.code_registration}</li>
                                <li className="mb-3"><i className="fas fa-mobile-alt display-25 me-3 text-secondary">Seat Type</i>{reservation?.id_cars?.seat_type}</li>
                                <li className="mb-3"><i className="fas fa-mobile-alt display-25 me-3 text-secondary">Seat Type</i>{reservation?.id_cars?.seat_type}</li>
                                <li className="mb-3"><i className="fas fa-mobile-alt display-25 me-3 text-secondary">Transmission</i>{reservation?.id_cars?.transmission}</li>
                                <li><i className="fas fa-map-marker-alt display-25 me-3 text-secondary">Max Speed</i>{reservation?.id_cars?.speed}</li>
                            </ul>
                            <ul className="social-icon-style2 ps-0">
                                <li><a href="#!" className="rounded-3"><i className="fab fa-facebook-f"></i></a></li>
                                <li><a href="#!" className="rounded-3"><i className="fab fa-twitter"></i></a></li>
                                <li><a href="#!" className="rounded-3"><i className="fab fa-youtube"></i></a></li>
                                <li><a href="#!" className="rounded-3"><i className="fab fa-linkedin-in"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="ps-lg-1-6 ps-xl-5">
                        <div className="mb-5 wow fadeIn">
                            <div className="text-start mb-1-6 wow fadeIn">
                                <h2 className="mb-0 text-primary">Reservation Details</h2>
                            </div>
                            <div className="row mt-n4">
                                <div className="col-sm-6 col-xl-4 mt-4">
                                    <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                            <i className="ti-bookmark-alt icon-box medium rounded-3 mb-4"></i>
                                            <h3 className="h5 mb-3">User</h3>
                                            <p className="mb-0">{reservation?.client_name}</p>
                                            <p className="mb-0">{reservation?.client_phone}</p>
                                            <p className="mb-0">{reservation?.client_email}</p>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-4 mt-4">
                                    <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                            <i className="ti-pencil-alt icon-box medium rounded-3 mb-4"></i>
                                            <h3 className="h5 mb-3">Reservation details</h3>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Car Location</i>{reservation?.location?.name}</p>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Date From</i>{reservation?.start_day}:{reservation?.start_month}:{reservation?.start_year}</p>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Date To</i>{reservation?.end_day}:{reservation?.end_month}:{reservation?.end_year}</p>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Status</i>{reservation?.type}</p>
                                            {/* <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Car Location</i>{reservation?.location?.name}</p> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6 col-xl-4 mt-4">
                                    <div className="card text-center border-0 rounded-3">
                                        <div className="card-body">
                                            <i className="ti-medall-alt icon-box medium rounded-3 mb-4"></i>
                                            <h3 className="h5 mb-3">Payments</h3>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Amount</i>{reservation?.id_cars?.price}</p>
                                            <p className="mb-0"><i className="far fa-envelope display-25 me-3 text-secondary">Status</i>Delay</p>
                                            <div className="payment text-end mt-5">
                                                <button className='btn' >Edit Now</button>
                                                <button className='btn ms-1' >Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="wow fadeIn">
                            <div className="text-start mb-1-6 wow fadeIn">
                                <h2 className="mb-0 text-primary">#Skills &amp; Experience</h2>
                            </div>
                            <p className="mb-4">Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose.</p>
                            <div className="progress-style1">
                                <div className="progress-text">
                                    <div className="row">
                                        <div className="col-6 fw-bold">Wind Turbines</div>
                                        <div className="col-6 text-end">70%</div>
                                    </div>
                                </div>
                                <div className="custom-progress progress rounded-3 mb-4">
                                    <div className="animated custom-bar progress-bar slideInLeft" style={{"width":"70%", "aria-valuemax":"100", "aria-valuemin":"0", "aria-valuenow":"10", 'role':"progressbar"}}></div>
                                </div>
                                <div className="progress-text">
                                    <div className="row">
                                        <div className="col-6 fw-bold">Solar Panels</div>
                                        <div className="col-6 text-end">90%</div>
                                    </div>
                                </div>
                                <div className="custom-progress progress rounded-3 mb-4">
                                    <div className="animated custom-bar progress-bar bg-secondary slideInLeft" style={{"width":"90%", "aria-valuemax":"100", "aria-valuemin":"0", "aria-valuenow":"70", "role":"progressbar"}}></div>
                                </div>
                                <div className="progress-text">
                                    <div className="row">
                                        <div className="col-6 fw-bold">Hybrid Energy</div>
                                        <div className="col-6 text-end">80%</div>
                                    </div>
                                </div>
                                <div className="custom-progress progress rounded-3">
                                    <div className="animated custom-bar progress-bar bg-dark slideInLeft" style={{"width":"80%","aria-valuemax":"100", "aria-valuemin":"0", "aria-valuenow":"70", "role":"progressbar"}}></div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
} 

export default ReservationDetals