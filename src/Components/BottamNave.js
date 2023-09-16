import React from 'react'
import Container from 'react-bootstrap/Container';
import {LinkContainer} from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {RiAdminFill} from 'react-icons/ri'

export default function BottamNave() {
  return (
    <Navbar expand="rg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">INDUS UNIVERSITY</Navbar.Brand>
        
        
          <Nav className="ms-auto">
          <LinkContainer to ="/admin"><Nav.Link >Admin<RiAdminFill size={25}/></Nav.Link>
            </LinkContainer>
          </Nav>
      
      </Container>
    </Navbar>
  )
}
