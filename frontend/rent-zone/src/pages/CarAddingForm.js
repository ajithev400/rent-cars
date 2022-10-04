import React, { useState } from 'react'
import slugify from 'limax';

const CarAddingForm = () => {

    const [carData, setCarData] = useState({
        name:"",
        slug:"",
        code_registration:"",
        brand: "",
        model: "",
        price: null,
        creator:"",
        speed: "",
        seat_type: "",
        transmission: "",
        description: "",
        image:null,
        location:"1"
    })

    const {name,slug,model,code_registration,brand,price,speed,seat_type,transmission,description} = carData

    const handleOnChange =(e)=>{
        setCarData({...carData,[e.target.name]:e.target.value})
    }

    const createSlug = (e) =>{
        setCarData({...carData,[slug]:slugify(e.target.value)})
    }
    
    const handleOnSubmit = (e)=>{
        e.preventDefault()
        console.log('CarForm submit',carData);
    }
    console.log(carData,"CARDATA");
    
  return (
    <>
    <div className="container">
        <div className=" text-center mt-5 ">

            <h1 >Add New Cars</h1>
    
        </div>

    
    <div className="row ">
      <div className="col-lg-7 mx-auto">
        <div className="card mt-2 mx-auto p-4 bg-light">
            <div className="card-body bg-light">
       
            <div class = "container">
                             <form onSubmit={handleOnSubmit} id="contact-form" role="form">

            

            <div className="controls">

                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_name">Car Name</label>
                            <input id="form_name" 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange = {()=>{
                                handleOnChange()
                                createSlug()
                            }} 
                            className="form-control" 
                            placeholder="Please enter car Name" 
                            required="required" data-error="Firstname is required."/>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_lastname">Brand Name</label>
                            <input id="form_lastname" type="text" 
                                 name="brand"
                                 value={brand}
                                 onChange = {handleOnChange} 
                                 className="form-control" 
                                 placeholder="Please enter car Brand Name" 
                                 required="required" data-error="Lastname is required."/>
                                                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_name">Car Name slug</label>
                            <input id="form_name" 
                            type="text" 
                            name="slug" 
                            value={slug}
                            className="form-control" 
                            placeholder="Please enter car Name" 
                            required="required" data-error="Firstname is required."/>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_lastname">Model</label>
                            <input id="form_lastname" type="text" 
                                 name="model"
                                 value={model}
                                 onChange = {handleOnChange} 
                                 className="form-control" 
                                 placeholder="Please enter car Model" 
                                 required="required" data-error="Lastname is required."/>
                                                            </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_email">Registation Number</label>
                            <input id="form_email" 
                            type="text" 
                            name="code_registration" 
                            value={code_registration}
                            onChange = {handleOnChange} 

                            className="form-control" placeholder="Please enter car Refistation number" required="required" data-error="Valid email is required."/>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_need">Transmission</label>
                            <select id="form_need" 
                            value={transmission} 
                            name = 'transmission'
                            onChange = {handleOnChange} 
                             className="form-control" required="required" data-error="Please specify your need.">
                                <option 
                                
                                 selected disabled>--Select Your Issue--</option>
                                <option >Manual Transmission</option>
                                <option >Automatic</option>
                            
                            </select>
                            
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_email">Rent</label>
                            <input id="form_email" type="number" 
                            name="price" 
                            value={price}
                            onChange = {handleOnChange}
                            className="form-control" placeholder="Please enter car rent per day " required="required" data-error="Valid email is required."/>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_need">Seat Type</label>
                            <select id="form_need"
                            value={seat_type}
                            name="seat_type"
                            onChange = {handleOnChange}
                             className="form-control" required="required" data-error="Please specify your need.">
                                <option 
                                
                                 selected disabled>--Select Your Issue--</option>
                                <option >Regular</option>
                                <option >Heated seats</option>
                                
                            </select>
                            
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_email">Set Your Speed limit</label>
                            <input id="form_email" 
                            type="text" 
                            name="speed" 
                            value={speed}
                            onChange = {handleOnChange}
                            className="form-control" placeholder="Please enter car speed limit" required="required" data-error="Valid email is required."/>
                            
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label for="form_need">Location</label>
                            <select id="form_need" name="need" className="form-control" required="required" data-error="Please specify your need.">
                                <option 
                                
                                 selected disabled>--Select Your Issue--</option>
                                <option >Bengaluru</option>
                                <option >mysore</option>
                            
                            </select>
                            
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                        <div className="form-group">
                            <label for="form_email">image</label>
                            <input id="form_email" 
                            type="file" 
                            name="email" 
                            className="form-control" placeholder="Please enter car rent per day " required="required" data-error="Valid email is required."/>
                            
                        </div>
                    </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label for="form_message">Description</label>
                            <textarea 
                            id="form_message" 
                            onChange = {handleOnChange}
                            value={description}
                            name="description"
                            className="form-control" placeholder="Write your message here." rows="4" required="required" data-error="Please, leave us a message."></textarea>
                            </div>

                        </div>


                    <div className="col-md-12">
                        
                       
                        <button type="submit" className="btn btn-success btn-send  pt-2 btn-block"> Add Car </button>
                    
                </div>
          
                </div>


            </div>
            </form>
            </div>
                </div>


        </div>


        </div>


    </div>
    </div>

    </>
  )
}

export default CarAddingForm