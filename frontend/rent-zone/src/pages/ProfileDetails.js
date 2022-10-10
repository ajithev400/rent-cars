import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify';
import axiosService from '../features/axios';

const ProfileDetails = ({user}) => {
  console.log("user",user);
  const [formData, setFormData] = useState({
    first_name:'',
    email:'',
    phone:'',
    profile_picture:null,
    gender:'MALE',
    aadhar_no:null,
    driving_licence:null,
    pan_card_no:null,
    aadhar_image:null,
    driving_licence_image:null,
    pan_card_image:null,

  })

  const [id_card, setId_card] = useState("Dr Licence")
  const [id_number, setId_number] = useState('')

  useEffect(() => {
    setFormData({...formData,"first_name":user.first_name,'email':user.email,'phone':user.phone})
  }, [user])
  
  const inputRef = useRef()

  const [edit, setEdit] = useState(false)

  const {first_name,email,phone,gender}=formData

  const handleOnChange = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const handleOnEdit = ()=>{
    setEdit(true)
  }
  const handleImageChange = (e)=>{
    setFormData({...formData,'profile_picture':inputRef.current.files[0]})
  }
  const handleIdChange = (e)=>{
    console.log(e.target.value);
    setId_card(e.target.value)
  }
  const handleIdNumberChange = (e)=>{
    setId_number(e.target.value)
    if(id_card ==='Dr Licence'){
      setFormData({...formData,'driving_licence':e.target.value,'pan_card_no':null,"aadhar_no":null})
    }else if(id_card === "Pan Card"){
      setFormData({...formData,'pan_card_no':e.target.value,"driving_licence":null,"aadhar_no":null})
    }else if(id_card === "Aadhar"){
      setFormData({...formData,'aadhar_no':e.target.value,'driving_licence':null,'pan_card_no':null})
    }
  }

  const handleIdImageChange = (e)=>{
    if(id_card ==='Dr Licence'){
      setFormData({...formData,'driving_licence_image':inputRef.current.files[0],'aadhar_image':null,'pan_card_image':null})
    }else if(id_card === "Pan Card"){
      setFormData({...formData,'pan_card_image':inputRef.current.files[0],'driving_licence_image':null,'aadhar_image':null})
    }else if (id_card === 'Aadhar'){
      setFormData({...formData,"aadhar_image":inputRef.current.files[0],'driving_licence_image':null,'pan_card_image':null})
    }
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    console.log("Data to Submit",formData);
    axiosService.editProfileById(formData,user.id)
    .then((res)=>{
      console.log("res:",res);
      toast.success("Profile Updated Success")
      setEdit(false)
    })
    .catch((err)=>{
      console.log("err:",err);
    })
  }

  console.log("FormData:::",formData);
  console.log(user.first_name);
  return (
    <>
    {edit?
    <form onSubmit={handleOnSubmit}>
    <div className="card-body">
        <div className="row">
        <h4 className="d-flex align-items-center mb-3">Profile</h4>

          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            <input 
            value={first_name} 
            name="first_name" 
            onChange={handleOnChange}
            type="text" 
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            <input 
            type="text" 
            name='email' 
            value={email} 
            onChange={handleOnChange}
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Gender</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            <select 
            type="text" 
            name='gender' 
            value={gender} 
            onChange={handleOnChange}
            >
            <option value='MALE'>Male</option>
            <option value='FEMALE'>Female</option>
            </select>
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            
            <input 
            type="text" 
            name='phone' 
            value={phone} 
            onChange={handleOnChange}
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Profile Picture</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            
            <input 
            type="file" 
            name='profile_picture' 
            accept='image/*'
            ref={inputRef}
            onChange={handleImageChange}
            />
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Id Card Type</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            <select 
            type="text" 
            name='id_card' 
            value={id_card} 
            onChange={handleIdChange}
            >
            <option value='Dr Licence'>Driving Licence</option>
            <option value="Pan Card">PAN Card</option>
            <option value="Aadhar">Aadhar</option>
            </select>
          </div>
        </div>
        <hr/>
       
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Upload {id_card}</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            
            <input 
            type="file" 
            name='profile_picture' 
            accept='image/*'
            ref={inputRef}
            onChange={handleIdImageChange}
            />
          </div>
        </div>
        <hr/>

        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">{id_card+" Number"}</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            
            <input 
            type="text" 
            name='id_number' 
            value={id_number} 
            onChange={handleIdNumberChange}
            />
          </div>
        </div>
        <hr/>
        
        
        {/* <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            Bay Area, San Francisco, CA
          </div>
        </div>
        <hr/> */}
        <div className="row">
          <div className="col-sm-12">
            <button type='submit' className="btn btn-info " target="__blank">submit</button>
          </div>
        </div>
      </div>   
  </form>:
    <div className="card-body">
        <div className="row">
        <h4 className="d-flex align-items-center mb-3">Profile</h4>

          <div className="col-sm-3">
            <h6 className="mb-0">Full Name</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            {user.first_name}
          </div>
          
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            {user.email}
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            {user.phone}
          </div>
        </div>
        <hr/>
        {/* <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            (320) 380-4539
          </div>
        </div>
        <hr/> */}
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Address</h6>
          </div>
          <div className="booking__form d-inline-block col-sm-9">
            Bay Area, San Francisco, CA
          </div>
        </div>
        <hr/>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-info " target="__blank" onClick={handleOnEdit} >Edit</button>
          </div>
        </div>
      </div>    
    }
    </>
  )
}

export default ProfileDetails