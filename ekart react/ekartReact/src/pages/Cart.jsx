import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {cartUserId, listCart, orderPlaced } from '../api/fetchApi';
import Login from './Login';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';




function Cart() {

    const [product, setProduct] = useState([])

    const [userId, setUserId] = useState(0)



    const header = {
        'Authorization':   `token ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }

    // const logedin = sessionStorage.getItem('token')

    // const navigate = useNavigate()


    useEffect(()=>{

       cartUserId(header).then((res)=>{
        const id = res.data.id
        console.log('User id: ', id);
        setUserId(res.data.id)
        
        listCart(id, header).then((res)=>{
            console.log('asdfg');
            console.log(res.data);
            setProduct(res.data)
           })
       })

    },[])

    const formSubmit=()=>{
        orderPlaced(userId, header).then((res)=>{
            console.log(res.data);
            console.log('order placed');
            
            
        })
    }



  return (
    <div>
    <Container>
      <Row>
        {
            product.length > 0 ?
                product.map((prod)=>(
                    <Col>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img variant="top" src={`http://127.0.0.1:8004/${prod.product.image}`} height={'150px'} />
                            <Card.Body>
                                <Card.Title>Name: {prod.product.product_name}</Card.Title>
                                <Card.Text>
                                    <h5>
                                        Price: {prod.product.price}
                                    </h5>
                                    <span>Reviews: {prod.product.total_reviews}</span><br />
                                    <span>Quantity: {prod.quantity}</span>
                                </Card.Text>
                                {/* <Link className='btn btn-success'>Place Order</Link> */}
                                <Link to={`/address/${prod.id}`} className='btn btn-success'>Place Order</Link>
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

export default Cart