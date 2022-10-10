import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosService from '../features/axios'
import '../styles/ReservationDetailsForVendodr.css'

const ReservationDetailsForVendor = () => {
    const params = useParams()

    const [reservationData, setReservationData] = useState({})
    useEffect(() => {
        axiosService.getReservationDataById(params.slug)
        .then((res)=>{
            setReservationData(res.data)
        })
    }, [params.slug])
    
    console.log("slug;",params.slug);
    console.log("reservationData",reservationData);
    // console.log(reservationData.location.name,"location");
  return (
    <>
    <div className="container mt-5">
        <div className="row">
            <div className="col-xs-9 col-sm-9">
                
                {/* <!-- User profile --> */}
                <div className="panel panel-default">
                <div className="panel-heading">
                <h4 className="panel-title">User profile</h4>
                </div>
                <div className="panel-body">
                    <div className="profile__avatar">
                    <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="..."/>
                    </div>
                    <div className="profile__header">
                    <h4>{reservationData.client_name}</h4>
                    <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non nostrum odio cum repellat veniam eligendi rem cumque magnam autem delectus qui.
                    </p>
                    <p>
                        <p>{reservationData.client_email}</p>
                    </p>
                    </div>
                </div>
                </div>

                {/* <!-- User info --> */}
                <div className="panel panel-default">
                <div className="panel-heading">
                <h4 className="panel-title">User info</h4>
                </div>
                <div className="panel-body">
                    <table className="table profile__table">
                    <tbody>
                        <tr>
                        <th><strong>Location</strong></th>
                        <td>{reservationData.location?.name}</td>
                        </tr>
                        <tr>
                        <th><strong>Car Name</strong></th>
                        <td>{reservationData.id_cars?.name}</td>
                        </tr>
                        <tr>
                        <th><strong>Registation Number</strong></th>
                        <td>{reservationData.id_cars?.code_registration}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>

                {/* <!-- Community --> */}
                <div className="panel panel-default">
                <div className="panel-heading">
                <h4 className="panel-title">Reservation Details</h4>
                </div>
                <div className="panel-body">
                    <table className="table profile__table">
                    <tbody>
                        {/* <tr>
                        <th><strong>Comments</strong></th>
                        <td>58584</td>
                        </tr> */}
                        <tr>
                        <th><strong>Date From </strong></th>
                        <td>{reservationData.date_from.slice(0,10)}</td>
                        </tr>
                        <tr>
                        <th><strong>Date To</strong></th>
                        <td>{reservationData.date_to.slice(0,10)}</td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>

              

            </div>
            <div className="col-xs-12 col-sm-3">
                
                {/* <!-- Contact user --> */}
                <p>
                <a href="#!" className="profile__contact-btn btn btn-lg btn-block btn-info" data-toggle="modal" data-target="#profile__contact-form">
                    Contact user
                </a>
                </p>

                <hr className="profile__contact-hr"/>
                


            </div>
            </div>
        </div>

    
    </>
  )
}

export default ReservationDetailsForVendor