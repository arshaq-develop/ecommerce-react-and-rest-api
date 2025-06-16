import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { userLogin } from '../api/fetchApi';
import { useNavigate } from 'react-router-dom';
// import { cartUserId } from '../api/fetchApi';

function Login() {
    const [user, setUser] = useState({
        username:'', password:''
    })
    console.log(user);
    const navigate = useNavigate()

    const formSubmit=()=>{
        userLogin(user).then((res)=>{
            console.log(res);
            sessionStorage.setItem('token', res.data.token)
            // sessionStorage.setItem('id')
            console.log('login');
            navigate('/')
        })
        
    }
    
  return (
    <div className='d-flex justify-content-center align-items-center'>
        <div className=' w-50 p-4'>
        <FloatingLabel controlId="floatingPassword" label="Username" className="mb-3">
            <Form.Control type="text" placeholder="Username" onChange={(e)=>{setUser({...user,username:e.target.value})}} />
         </FloatingLabel>
         <FloatingLabel controlId="floatingInput" label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" onChange={(e)=>{setUser({...user,password:e.target.value})}} />
        </FloatingLabel>
        <div className='d-flex justify-content-center'>
            <button onClick={()=>{formSubmit()}} className=' btn btn-success' >Log in</button>
        </div>
        </div>
    </div>
  )
}

export default Login