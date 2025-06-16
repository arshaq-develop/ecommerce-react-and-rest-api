import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { userRegister } from '../api/fetchApi';


function Register() {
    const [user, setUser] = useState({
        email:'', username:'', password:''
    })
    console.log(user);

    const formSubmit=()=>{
        userRegister(user).then((res)=>{
           console.log(res);
           

        })
        .catch((error)=>{
            console.log(error);
            
        })

    }
    

  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className=' w-50 p-4'>
        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
            <Form.Control type="email" placeholder="name@example.com"  onChange={(e)=>{setUser({...user,email:e.target.value})}} />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Username" className="mb-3">
            <Form.Control type="text" placeholder="Username" onChange={(e)=>{setUser({...user,username:e.target.value})}} />
         </FloatingLabel>
         <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUser({...user,password:e.target.value})}} />
        </FloatingLabel>
        <button onClick={()=>{formSubmit()}} className='btn btn-success'>Submit</button>
        </div>
    </div>
  )
}

export default Register