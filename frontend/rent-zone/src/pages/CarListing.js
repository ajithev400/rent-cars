import React, { useEffect, useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import Helmet from '../components/Helmet/Helmet'
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import axiosService from '../features/axios';

const CarListing = () => {
  const [carsData, setCarsData] = useState([])
  // const [searchData, setSearchData] = useState('')

  const [searchData,setSearchData] = useState('')
  const [sort,setSort] = useState("");

  useEffect(() => {
    axiosService.getVehicles(searchData)
    .then((res)=>{
      setCarsData(res.data)
    })
    // console.log('res:',axiosService.getVehicles());
  }, [searchData])

  
  useEffect(() => {
    let newData =[...carsData];
    if(sort === "low"){
      newData = newData.sort((a,b) => a.price - b.price);
    }else if(sort === "high"){
      newData = newData.sort((a,b) => b.price - a.price);    
    }
    setCarsData(newData)
  },[sort])
    
  
  return (
    <>
    {/* <Header/> */}
    <Helmet title = 'Cars'>
    <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className=" d-flex align-items-center gap-3 mb-5">
                <span className=" d-flex align-items-center gap-2">
                  <i className="ri-sort-asc"></i> Sort By
                </span>

                <select onChange={(e)=>setSort(e.target.value)}>
                  <option value={null}>Select</option>
                  <option  value="low">Low to High</option>
                  <option  value="high">High to Low</option>
                </select>

                <input type="text" value={searchData} onChange={(e)=>setSearchData(e.target.value)} />
              </div>
            </Col>

            {carsData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
        </Container>
      </section>

    </Helmet>
    </>
  )
}

export default CarListing