import React, { useState } from 'react'
import { useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link, useParams } from 'react-router-dom';
import {  getProduct } from '../api/fetchApi';

function Detail() {
    const [prod, setProduct] = useState({})

    const {id} = useParams()
    // const header = {
    //         'Authorization':   `token${sessionStorage.getItem('token')}`,
    //         'Content-Type': 'application/json'
    //     }

    useEffect(()=>{
        getProduct(id).then((res)=>{
            console.log(res.data);
            setProduct(res.data)
            console.log(id);
            
        })
    },[])
       
    // const formSubmit=()=>{
    //     addToCart(id, header).then((res)=>{
    //         console.log(res.data);
    //         console.log('added to cart');
            
            
    //     })
    // }

  return (
    
    <Container className='d-flex justify-content-center'>
      <Row>
        <Col>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={prod.image} height={'150px'} />
                <Card.Body>
                    <Card.Title>{prod.product_name}</Card.Title>
                    <Card.Text>
                        <p>{prod.description}</p>
                        <h5>
                            {prod.price}
                        </h5>
                        <span>{prod.total_reviews}</span>
                    </Card.Text>
                    {/* <button className='btn btn-success'>Add to Cart</button> */}
                    <Link className='btn btn-success' to={`/quantity/${prod.id}`}>Add To Cart</Link>
                    <Link className='btn btn-warning m-1' to={`/reviews/${prod.id}`}>Add Reviews</Link>
                </Card.Body>
            </Card>
        </Col> 
      </Row>
    </Container>
  )
}

export default Detail