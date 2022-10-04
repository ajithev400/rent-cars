import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axiosService from '../features/axios'
import '../styles/vendor-dashboard.css'

const VendorPage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [profile, setProfile] = useState({})
  const [vendor, setVendor] = useState({})
  const id = user.id
  const email = user.email
  useEffect(() => {
    axiosService.getUserProfile(id)
    .then((res)=>{
      setProfile(res.data)
    })
    .catch((res)=>{
      console.log(res.data);
    })
    axiosService.searchVendor(email)
    .then((res)=>{
      setVendor(res.data.results[0])
    })
  }, [id,email])
  
  console.log("Profile",profile);
  console.log("Vendor",vendor);
  console.log("User:",user);
  
  return (
    <>
    <div className="content">
    <div className="container">
        <div className="row">
            <div className="col-sm-12">
                {/* <!-- meta --> */}
                <div className="profile-user-box card-box bg-custom">
                    <div className="row">
                        <div className="col-sm-6"><span className="float-left mr-3"><img src={vendor.image!==null?vendor.image:"https://bootdey.com/img/Content/avatar/avatar1.png"} alt={profile.profile_picture} className="thumb-lg rounded-circle"/></span>
                            <div className="media-body text-white">
                                <h4 className="mt-1 mb-1 font-18">{user.first_name }</h4>
                                <p className="font-13 text-light">{email}</p>
                                  <p className="text-light mb-0">{vendor.GST_number}</p>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="text-right ms-10">
                                <button style={{"marginLeft":"100px",'marginTop':'40px'}} className="btn btn-light waves-effect">Add New Car</button>
                                <Link to={'add-cars'} style={{"marginLeft":"100px",'marginTop':'40px'}} className="btn btn-light waves-effect">Edit Profile</Link>

                            </div>
                        </div>
                    </div>
                </div>
                {/* <!--/ meta --> */}
            </div>
        </div>
        {/* <!-- end row --> */}
        <div className="row">
            <div className="col-xl-4">
                {/* <!-- Personal-Information --> */}
                <div className="card-box">
                    <h4 className="header-title mt-0">Personal Information</h4>
                    <div className="panel-body">
                        <p className="text-muted font-13">Hye, I’m Johnathan Doe residing in this beautiful world. I create websites and mobile apps with great UX and UI design. I have done work with big companies like Nokia, Google and Yahoo. Meet me or Contact me for any queries. One Extra line for filling space. Fill as many you want.</p>
                        <hr/>
                        <div className="text-left">
                            <p className="text-muted font-13"><strong>Full Name :</strong> <span className="m-l-15">{user.first_name +" "+user.last_name}</span></p>
                            <p className="text-muted font-13"><strong>Mobile :</strong><span className="m-l-15">{vendor.mobile}</span></p>
                            <p className="text-muted font-13"><strong>Email :</strong> <span className="m-l-15">{vendor.email}</span></p>
                            <p className="text-muted font-13"><strong>Location :</strong> <span className="m-l-15">Bengaluru</span></p>
                        </div>
                        <ul className="social-links list-inline mt-4 mb-0">
                            <li className="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="#!" data-original-title="Facebook"><i className="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="#!" data-original-title="Twitter"><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a title="" data-placement="top" data-toggle="tooltip" className="tooltips" href="#!" data-original-title="Skype"><i className="fa fa-skype"></i></a></li>
                        </ul>
                    </div>
                </div>
                {/* <!-- Personal-Information --> */}
                <div className="card-box ribbon-box">
                    <div className="ribbon ribbon-primary">Messages</div>
                    <div className="clearfix"></div>
                    <div className="inbox-widget">
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Tomaslau</p>
                                <p className="inbox-item-text">I've finished it! See you so...</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Stillnotdavid</p>
                                <p className="inbox-item-text">This theme is awesome!</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Kurafire</p>
                                <p className="inbox-item-text">Nice to meet you</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Shahedk</p>
                                <p className="inbox-item-text">Hey! there I'm available...</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar6.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Adhamdannaway</p>
                                <p className="inbox-item-text">This theme is awesome!</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Tomaslau</p>
                                <p className="inbox-item-text">I've finished it! See you so...</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                        <a href="#!">
                            <div className="inbox-item">
                                <div className="inbox-item-img"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="rounded-circle" alt=""/></div>
                                <p className="inbox-item-author">Stillnotdavid</p>
                                <p className="inbox-item-text">This theme is awesome!</p>
                                <p className="inbox-item-date">
                                    <button type="button" className="btn btn-icon btn-sm waves-effect waves-light btn-success">Reply</button>
                                </p>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="col-xl-8">
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card-box tilebox-one"><i className="icon-layers float-right text-muted"></i>
                            <h6 className="text-muted text-uppercase mt-0">Orders</h6>
                            <h2 className="text-success">1,587</h2><span className="badge badge-custom">+11% </span><span className="text-muted">From previous period</span></div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-sm-4">
                        <div className="card-box tilebox-one"><i className="icon-paypal float-right text-muted"></i>
                            <h6 className="text-muted text-uppercase mt-0">Revenue</h6>
                            <h2 className="text-success">$<span>46,782</span></h2><span className="badge badge-danger">-29% </span><span className="text-muted">From previous period</span></div>
                    </div>
                    {/* <!-- end col --> */}
                    <div className="col-sm-4">
                        <div className="card-box tilebox-one"><i className="icon-rocket float-right text-muted"></i>
                            <h6 className="text-muted text-uppercase mt-0">Product Sold</h6>
                            <h2 className="text-success">1,890</h2><span className="badge badge-custom">+89% </span><span className="text-muted">Last year</span></div>
                    </div>
                    {/* <!-- end col --> */}
                </div>
                {/* <!-- end row --> */}
                {/* <div className="card-box">
                    <h4 className="header-title mt-0 mb-3">Experience</h4>
                    <div className="">
                        <div className="">
                            <h5 className="text-custom">Lead designer / Developer</h5>
                            <p className="mb-0">websitename.com</p>
                            <p><b>2010-2015</b></p>
                            <p className="text-muted font-13 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                        <hr/>
                        <div className="">
                            <h5 className="text-custom">Senior Graphic Designer</h5>
                            <p className="mb-0">coderthemes.com</p>
                            <p><b>2007-2009</b></p>
                            <p className="text-muted font-13 mb-0">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        </div>
                    </div>
                </div> */}
                <div className="card-box">
                    <h4 className="header-title mb-3">My Cars</h4>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Project Name</th>
                                    <th>Start Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th>Assign</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span className="label label-info">Work in Progress</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Adminox Frontend</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span className="label label-success">Pending</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span className="label label-pink">Done</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Adminox Frontend</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span className="label label-purple">Work in Progress</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Adminox Admin</td>
                                    <td>01/01/2015</td>
                                    <td>07/05/2015</td>
                                    <td><span className="label label-warning">Coming soon</span></td>
                                    <td>Coderthemes</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* <!-- end col --> */}
        </div>
        {/* <!-- end row --> */}
    </div>
    {/* <!-- container --> */}
    </div>
    </>
  )
}

export default VendorPage