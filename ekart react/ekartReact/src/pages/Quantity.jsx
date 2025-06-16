import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addToCart } from '../api/fetchApi';
import { useNavigate, useParams } from 'react-router-dom';

function Quantity() {
    const [user, setUser] = useState({

    })
    console.log(user);
    const header = {
                'Authorization':   `token ${sessionStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            }
    
    const {id} = useParams()

    const logedin = sessionStorage.getItem('token')

    const navigate = useNavigate()


    const formSubmit=()=>{
        if(!logedin){
            alert('Login First')
            navigate('/login')
        }
        else{
            addToCart(id, user, header).then(()=>{
                console.log('asdf');
                navigate('/cart')
                
            })
        }   
    }

    
    
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className=' w-50 p-4'>
            <FloatingLabel controlId="floatingInput" label="Quantity" className="mb-3">
                <Form.Control type="number" placeholder="Quantity" onChange={(e)=>{setUser({...user,quantity:e.target.value})}} />
            </FloatingLabel>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success' onClick={()=>{formSubmit()}}>Add to Cart</button>
            </div>
        </div>
    </div>
  )
}

export default Quantity