import React, { useState } from 'react'
import { getAllProducts } from '../api/fetchApi'
import { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
// import { cartUserId } from '../api/fetchApi';


function Home() {

    const [product, setProduct] = useState([])
    const header = {
        'Authorization':   `token${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }

    
    

    useEffect(()=>{
        getAllProducts().then((res)=>{
            console.log(res.data);
            setProduct(res.data)

        })

        // cartUserId(header).then((res)=>{
        //         const id = res.data.id
        //         console.log('User id: ', id);
        //         setId(res.data.id)
                
        //     })
        
    },[])
    console.log(product);
    

  return (
    <div>
        {/* <Link  to={`cart/${userid}`} className='btn btn-light'>Cart</Link> */}
    <Container>
      <Row>
        {
            product.length > 0 ?
                product.map((prod)=>(
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={prod.image} height={'150px'} />
                            <Card.Body>
                                <Card.Title>{prod.product_name}</Card.Title>
                                <Card.Text>
                                    <h5>
                                        {prod.price}
                                    </h5>
                                    <span>{prod.total_reviews}</span>
                                </Card.Text>
                                <Link to={`detail/${prod.id}`} className='btn btn-success'>Detail View</Link>
                                
                            </Card.Body>
                        </Card>
                    </Col> 
                ))
            : <h3>No Data</h3>
        }
      </Row>
    </Container>
        
    </div>
  )
}

export default Home