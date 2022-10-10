import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { Container, Row, Col } from "reactstrap";
import Helmet from '../components/Helmet/Helmet'
import CarItem from "../components/UI/CarItem";
// import carData from "../assets/data/carData";
import axiosService from '../features/axios';

const CarListing = () => {
  const [carsData, setCarsData] = useState([])


  const [searchData,setSearchData] = useState('')
  const [sort,setSort] = useState("");
  const [count, setCount] = useState(0)
  const [pageNo, setpageNo] = useState(0)

  useEffect(() => {
    axiosService.getVehicles(searchData)
    .then((res)=>{
      setCarsData(res.data.results)
      setCount(res.data.count)
    })
    // console.log('res:',axiosService.getVehicles());
  }, [searchData])

  useEffect(()=>{
    if(pageNo>0){
      axiosService.vehiclePagination(pageNo)
      .then((res)=>{
        if(res.status>=200 && res.status<=399){
          setCarsData(res.data.results)
        }
      })
      .catch((err)=>{
        console.log(err,"error");
        toast.info("Page over")
      })
    }
  },[pageNo])

  
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
                  <option valuwee={null}>Select</option>
                  <option  value="low">Low to High</option>
                  <option  value="high">High to Low</option>
                </select>

                <input type="text" placeholder='search' value={searchData} onChange={(e)=>setSearchData(e.target.value)} />

                <span className=" d-flex align-items-center gap-2">
                  Count: {count}
                </span>
              </div>
            </Col>

            {carsData.map((item) => (
              <CarItem item={item} key={item.id} />
            ))}
          </Row>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <button class="page-link" onClick={()=>{
                  if(pageNo>0){
                    setpageNo(pageNo - 1)
                  }else{
                    toast.info("page is over")
                    
                  }
                  console.log(pageNo);
                }} aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </button>
              </li>
              {/* <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li> */}
              <li class="page-item">
                <button class="page-link" onClick={()=>{
                  if(pageNo>=0){
                    setpageNo(pageNo + 1)
                  }
                  console.log(pageNo);
                }}aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </button>
              </li>
            </ul>
          </nav>
        </Container>
      </section>

    </Helmet>
    </>
  )
}

export default CarListing