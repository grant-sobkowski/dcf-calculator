import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

export default class NaviBar extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
    <Navbar bg="dark" variant="dark">
      <Container>
      <Button variant="outline-secondary" as={Navbar.Link} onClick={this.props.loadHomeScreen}>Home</Button>
      <Nav className="me-auto">
        <Nav.Link>How It Works</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
    );
    }
}