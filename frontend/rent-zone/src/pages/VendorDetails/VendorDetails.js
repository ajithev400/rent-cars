import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosService from "../../features/axios";

// const url = process.env.REACT_APP_API_URL
const url = process.env.REACT_APP_API_URL


const VendorDetails = () => {
  const para = useParams();
  const vendorId = para.slug;
  const [vendor, setVendor] = useState({});
  const [cars, setCars] = useState([])
  useEffect(() => {
    axiosService.getSingleVendor(vendorId).then((res) => {
      setVendor(res.data);
    });
    axiosService.getCarListWithVendorId(vendorId).then((res)=>{
      setCars(res.data)
    })
    .catch((res)=>{
      toast.error(res.data)
    })
  }, [vendorId]);

  const handleOnClick = ()=>{
    axiosService.approveVendor(vendor.id).then((res)=>{
      setVendor(res.data)
    })
  }

  
  console.log(vendor);
  console.log("Cars",cars);
  console.log(url);
  return (
    <>

    <div className="container">
        <div className="row">
            <div className="col-md-3">
                <div className="osahan-account-page-left shadow-sm bg-white h-100">
                    <div className="border-bottom p-4">
                        <div className="osahan-user text-center">
                            <div className="osahan-user-media">
                                <img 
                                className="mb-3 rounded-pill shadow-sm mt-1" 
                                src={vendor.image} 
                                alt={vendor.image}
                                width="150px"
                                
                                />
                                <div className="osahan-user-media-body">
                                    <h6 className="mb-2">{vendor.vendor_name}</h6>
                                    <p className="mb-1">{vendor.mobile}</p>
                                    <p>{vendor.email}</p>
                                    <p className="mb-0 text-black font-weight-bold"><a className="text-primary mr-3" data-toggle="modal" data-target="#edit-profile-modal" href="#!"><i className="icofont-ui-edit"></i> EDIT</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul className="nav nav-tabs flex-column border-0 pt-4 pl-4 pb-4" id="myTab" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" id="favourites-tab" data-toggle="tab" href="#favourites" role="tab" aria-controls="favourites" aria-selected="false">Products</a>
                            <a className="nav-link" id="favourites-tab" data-toggle="tab" href="#favourites" role="tab" aria-controls="favourites" aria-selected="false">Profile</a>
                            <a className="nav-link" id="favourites-tab" data-toggle="tab" href="#favourites" role="tab" aria-controls="favourites" aria-selected="false"> BLOCK Vendor</a>
                            <a className="nav-link" id="favourites-tab" data-toggle="tab" href="#favourites" role="tab" aria-controls="favourites" aria-selected="false"> Repote</a>

                        </li>
                    </ul>
                </div>
            </div>
            <div className="col-md-9">
                <div className="osahan-account-page-right shadow-sm bg-white p-4 h-100">
                    <div className="tab-content" id="myTabContent">
                        <div className="tab-pane fade  active show" id="favourites" role="tabpanel" aria-labelledby="favourites-tab">
                            <h4 className="font-weight-bold mt-0 mb-4">Cars</h4>
                            <div className="row">

                            
                              {
                                cars[0]?
                                cars.map((item)=>{
                                  return(

                                  <div className="col-md-4 col-sm-6 mb-4 pb-2" key={item.id} >
                                      <div  className="list-card bg-white h-100 rounded overflow-hidden position-relative shadow-sm" >
                                          <div className="list-card-image" >
                                              <div className="star position-absolute"><span className="badge badge-success"><i className="icofont-star"></i> 3.1 (300+)</span></div>
                                              <div className="favourite-heart text-danger position-absolute"><a href="#!"><i className="icofont-heart"></i></a></div>
                                              <div className="member-plan position-absolute"><span className="badge badge-dark">Promoted</span></div>
                                              <Link to={`/admin/vendor-car/${item.slug}`}>
                                                  <img src={url+item.image} alt="img" className="img-fluid item-img"/>
                                              </Link>
                                          </div>
                                          <div className="p-3 position-relative">
                                              <div className="list-card-body">
                                                  <h6 className="mb-1"><a href="#!" className="text-black">{item.name}
                                                  </a>
                                                </h6>
                                                  <p className="text-gray mb-3">{item.code_registration}, {item.model}, {item.transmission}</p>
                                                  <p className="text-gray mb-3 time"><span className="bg-light text-dark rounded-sm pl-2 pb-1 pt-1 pr-2"><i className="icofont-wall-clock"></i> For 1 Day</span> <span className="float-right text-black-50"> ₹{item.price}</span></p>
                                              </div>
                                              <div className="list-card-badge">
                                                  <h6 className="mb-1"><a href="#!" className="text-black">Download Document</a></h6>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                                  )
                                })

                                :null
                              }
                                
                                <div className="col-md-12 text-center load-more">
                                  {
                                    vendor.is_verified?
                                    // <button className="btn btn-primary" type="button" disabled="">
                                    //     <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Block Vendor
                                    // </button>
                                    null
                                    :
                                    <button className="btn btn-primary" type="button" onClick={handleOnClick}>
                                        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Approve Vendor
                                    </button>
                                  }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  );
};

export default VendorDetails;
