import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { addReviews } from '../api/fetchApi';
import { useParams } from 'react-router-dom';





function Reviews() {

    const [user, setUser] = useState({

    })
    console.log(user);
    

    const {id} = useParams()

    const header = {
        'Authorization':   `token ${sessionStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    }

    const formSubmit=()=>{
        addReviews(id, user, header).then(()=>{
            console.log('review added');

        })
    }


  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className=' w-50 p-4'>
            <FloatingLabel controlId="floatingInput" label="Comment" className="mb-3">
                <Form.Control type="text" placeholder="Comment" onChange={(e)=>{setUser({...user,comment:e.target.value})}} />
            </FloatingLabel>
            <FloatingLabel controlId="floatingInput" label="Rating" className="mb-3">
                <Form.Control type="number" placeholder="Rating" onChange={(e)=>{setUser({...user,ratings:e.target.value})}} />
            </FloatingLabel>
            <div className='d-flex justify-content-center'>
                <button onClick={()=>{formSubmit()}} className='btn btn-success'>Add Review</button>
            </div>
        </div>
    </div>

  )
}

export default Reviews