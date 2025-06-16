import React, { useEffect, useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { orderPlaced } from '../api/fetchApi';
import { cartUserId } from '../api/fetchApi';
import { useParams } from 'react-router-dom';


function Address() {

    const [user, setUser] = useState([])
    console.log(user);
    

    const header={
        'Authorization':   `token ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }

    const {id} = useParams()

    const formSubmit=()=>{
        orderPlaced(id,user,header).then(()=>{
            console.log('order placed');
            

        })
    }

    return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className=' w-50 p-4'>
            <FloatingLabel controlId="floatingInput" label="Address" className="mb-3">
                <Form.Control type="text" placeholder="Address" onChange={(e)=>{setUser({...user,address:e.target.value})}} />
            </FloatingLabel>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-success' onClick={()=>{formSubmit()}}>Place Order</button>
            </div>
        </div>
    </div>
    )
}


export default Address