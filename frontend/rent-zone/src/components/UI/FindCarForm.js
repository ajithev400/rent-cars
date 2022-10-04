import React, { useState } from "react";
import "../../styles/find-car-form.css";
import {Container, Form, FormGroup, Row } from "reactstrap";
import axiosService from "../../features/axios";
import CarItem from "./CarItem";

const FindCarForm = () => {
  const [carData, setCarData] = useState([])
  const [show, setShow] = useState(false)
  const [formData, setFormData] = useState({
    date_from:[],
    date_to:[],
    transfer_time:[],
  })

  const {date_from,date_to,transfer_time}=formData

  // let t = transfer_time; // mm:ss
  // let ms = Number(t.split(':')[0]) * 60 * 1000 + Number(t.split(':')[1]) * 1000;
  // console.log(ms);
  
  const handleOnChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value})
  }
  // const data = ''
  // useEffect(() => {
  //   axiosService.getVehicles(data)
  //   .then((res)=>{
  //     setCarData(res.data.results)
  //   })
  // },[])

  const handleOnclick =()=>{
    if (carData !== []){
      setShow(true)
    }
  }

  const handleOnSubmit = (e)=>{
    e.preventDefault()
    console.log("FormData:",formData);
    axiosService.findCars(formData)
    .then((res)=>{
      setCarData(res.data)
      console.log("CarData::::",carData);
    })
    .catch((res)=>{
      console.log(res);
    })
  }

  return (
    <>
      <Form className="form" onSubmit={handleOnSubmit}>
        <div className=" d-flex align-items-center justify-content-between flex-wrap">
          <FormGroup className="form__group">
            <input type="text" placeholder="From address"  />
          </FormGroup>
  
          {/* <FormGroup className="form__group">
            <input type="text" placeholder="To address" required />
          </FormGroup> */}
  
          <FormGroup className="form__group">
            <input 
            type="date" 
            placeholder="Journey date" 
            name="date_from"
            value={date_from}
            onChange={handleOnChange}
            required />
          </FormGroup>
  
          <FormGroup className="form__group">
            <input
              className="return date"
              type="date"
              placeholder="Return date"
              name="date_to"
              value={date_to}
              onChange={handleOnChange}
              required
            />
          </FormGroup>

          <FormGroup className="form__group">
            <input
              className="journey__time"
              type="time"
              placeholder="Journey time"
              name="transfer_time"
              value={transfer_time}
              onChange={handleOnChange}
              required
            />
          </FormGroup>
          <FormGroup className="select__group">
            <select>
              <option value="ac">AC Car</option>
              <option value="non-ac">Non AC Car</option>
            </select>
          </FormGroup>
          <FormGroup className="select__group">
            <select>
              <option value="ac">Manual Transmission</option>
              <option value="non-ac">Automatic</option>
            </select>
          </FormGroup>
  
          <FormGroup className="form__group">
            <button onClick={handleOnclick} className="btn find__car-btn">Find Car</button>
          </FormGroup>
        </div>
      </Form>
      {show?(
        
        <Container >
          <Row>
            {carData.slice(0, 6).map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      ):(
        null
        // <Container>
        //   <Col>
        //   <div className="spinner-border text-primary" role="status">
        //   </div>
        //   </Col>
        // </Container>
      )}
      
    </>
    
    
  );
};

export default FindCarForm;