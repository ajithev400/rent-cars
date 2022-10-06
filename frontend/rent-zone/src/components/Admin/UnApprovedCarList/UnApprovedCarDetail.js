import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosService from '../../../features/axios'

const UnApprovedCarDetail = () => {

    const location = useLocation()

    console.log("CARIDDDDD",location.state.CarId);
   
    const API_URL = process.env.REACT_APP_API_URL
    const [car, setCar] = useState({})
    const [carDoc,setCarDoc] = useState({})
    const [form, setForm] = useState({
        car_id:location.state.CarId,
        is_active:false
    })
    const [carId, setCarId] = useState({
        car_id:location.state.CarId
    })
    useEffect(() => {
        setCarId({car_id:location.state.CarId})
      axiosService.getSingleUnApprovedCar(carId)
      .then((res)=>{
        setCar(res.data)
      })
      axiosService.getCarDoc(location.state.CarId)
      .then((res)=>{
        setCarDoc(res.data)
      })

    }, [location.state.CarId])

    const handleOnClick = ()=>{
        console.log(form);
        setForm({...form,'is_active':!car.is_active})
        axiosService.ApproveCar(form)
        .then((res)=>{
            console.log(res);
            setCar(res.data.data)
            toast.success('Car Status Changed')
        })
    }
    
    console.log("CarId:",carId);
    console.log('CardDoc',carDoc);
    
  return (
    <>       
    <div class="container">
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">{car.name}</h3>
                <h6 class="card-subtitle">{car.model}</h6>
                <div class="row">
                    <div class="col-lg-5 col-md-5 col-sm-6">
                        <div class="white-box text-center"><img src={API_URL+car.image} alt={car.image} class="img-responsive"/></div>
                    </div>
                    <div class="col-lg-7 col-md-7 col-sm-6">
                        <h4 class="box-title mt-5">Product description</h4>
                        <p>{car.description}</p>
                        <a href={API_URL+carDoc.document} className='btn btn-primary' >Download Documents</a>
                        {
                            car.is_active?<button className='btn btn-danger ms-2' onClick={handleOnClick} >Make Unverified </button>
                            :<button className='btn btn-success ms-2' onClick={handleOnClick} >Make Car Verified</button>
                        }
                        
                    </div>
                    
                    <div class="col-lg-12 col-md-12 col-sm-12">
                        <h3 class="box-title mt-5">General Info</h3>
                        <div class="table-responsive">
                            <table class="table table-striped table-product">
                                <tbody>
                                    <tr>
                                        <td width="390">Brand</td>
                                        <td>{car.brand}</td>
                                    </tr>
                                    <tr>
                                        <td>Registration Number</td>
                                        <td>{car.code_registration}</td>
                                    </tr>
                                    <tr>
                                        <td>Delivery Condition</td>
                                        {car.is_available?
                                        <td>Available</td>
                                        :
                                        <td>Not Available</td>
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>Active</td>
                                        {car.is_active?
                                        <td>Active</td>
                                        :
                                        <td>Not Active</td>
                                        }
                                        
                                    </tr>
                                    <tr>
                                        <td>Seat Type</td>
                                        <td>{car.seat_type}</td>
                                    </tr>
                                    <tr>
                                        <td>Transmission</td>
                                        <td>{car.transmission}</td>
                                    </tr>
                                    <tr>
                                        <td>Max Speed Limit</td>
                                        <td>{car.speed}</td>
                                    </tr>
                                    <tr>
                                        <td>Wheels Included</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Created Date</td>
                                        <td>{car.created_at}</td>
                                    </tr>
                                    <tr>
                                        <td>Owner</td>
                                        <td>{car.creator}</td>
                                    </tr>
                                    {/* <tr>
                                        <td>Head Support</td>
                                        <td>No</td>
                                    </tr>
                                    <tr>
                                        <td>Suitable For</td>
                                        <td>Study&amp;Home Office</td>
                                    </tr>
                                    <tr>
                                        <td>Adjustable Height</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Model Number</td>
                                        <td>F01020701-00HT744A06</td>
                                    </tr>
                                    <tr>
                                        <td>Armrest Included</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>Care Instructions</td>
                                        <td>Handle With Care,Keep In Dry Place,Do Not Apply Any Chemical For Cleaning.</td>
                                    </tr>
                                    <tr>
                                        <td>Finish Type</td>
                                        <td>Matte</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default UnApprovedCarDetail