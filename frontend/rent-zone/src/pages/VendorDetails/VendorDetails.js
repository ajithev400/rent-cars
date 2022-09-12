import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosService from "../../features/axios";

const VendorDetails = () => {
  const para = useParams();
  const vendorId = para.slug;
  const [vendor, setVendor] = useState({});
  useEffect(() => {
    axiosService.getSingleVendor(vendorId).then((res) => {
      setVendor(res.data);
    });
  }, [vendorId]);

  return (
    <>
      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">
          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                class="rounded-circle mt-5"
                width="150px"
                src={vendor.image}
                alt= {vendor.image}
              />
              <span class="font-weight-bold">{vendor.vendor_name}</span>
              <span class="text-black-50">{vendor.email}</span>
              <span> </span>
            </div>
          </div>
          <div class="col-md-5 border-right">
            <div class="p-3 py-5">
              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Profile Details</h4>
              </div>
              
              <div class="row mt-2">
                <div class="col-md-12 ">
                  <div className="d-flex">
                    <label class="labels">Vendor Name:</label>
                    <h5 className="ms-5">{vendor.vendor_name}</h5>
                  </div>
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-12">
                  <div className="d-flex">
                    <label class="labels">Mobile Number:</label>
                    <h5  className="ms-4">{vendor.mobile}</h5>
                  </div>
                </div>

                <div class="col-md-12">
                  <div className="d-flex">
                    <label class="labels">Email:</label>
                    <h5 className="ms-5">{vendor.email}</h5>
                  </div>
                </div>
                <div class="col-md-12">
                 <div className="d-flex">
                    <label class="labels">GST Number:</label>
                    <h5 className="ms-3">{vendor.GST_number}</h5>
                 </div>
                </div>
                {/* <div class="col-md-12">
                  <label class="labels">Address Line 1</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 1"
                    value=""
                  />
                </div> */}
                {/* <div class="col-md-12">
                  <label class="labels">State</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Area</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter address line 2"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Email ID</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="enter email id"
                    value=""
                  />
                </div>
                <div class="col-md-12">
                  <label class="labels">Education</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="education"
                    value=""
                  />
                </div>
              </div>
              <div class="row mt-3">
                <div class="col-md-6">
                  <label class="labels">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="country"
                    value=""
                  />
                </div>
                <div class="col-md-6">
                  <label class="labels">State/Region</label>
                  <input
                    type="text"
                    class="form-control"
                    value=""
                    placeholder="state"
                  />
                </div> */}
              </div>
              <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button" type="button">
                  Approve as Vendor
                </button>
              </div>
            </div>
          </div>
          <div class="col-md-4"></div>
        </div>
      </div>
    </>
  );
};

export default VendorDetails;
