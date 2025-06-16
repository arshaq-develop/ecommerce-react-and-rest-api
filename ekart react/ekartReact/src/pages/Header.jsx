import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';

function Header() {

    // const header = {
    //     'Authorization':   `token ${sessionStorage.getItem('token')}`,
    //     'Content-Type': 'application/json'
    // }

    // const {id} = product.user.id

    // useEffect(()=>{
    //     cartItmems(id,header).then(()=>{

    //     })
    // })

    const formSubmit=()=>{
        sessionStorage.removeItem('token')
    }


  return (
    <div>
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
            <Navbar.Brand href="#home">Ekart App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link href="#home">Home</Nav.Link>
                {/* <Nav.Link href="">Cart</Nav.Link> */}
                <Link to={`cart`} className='m-1 btn'>Cart</Link>
                <button onClick={()=>{formSubmit()}} className='m-1 btn'>Logout</button>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                    Another action

                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                    Separated link
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
  )
}

export default Header