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
        <Nav.Link href="https://docs.google.com/document/u/1/d/e/2PACX-1vSoFBMiAzs8Xke99C-odbukgBQ0KNxFbb9T2KDmFy2HvAah2fXg6pHBaLpTKTP1imV2cw0ptazZnvSv/pub" target="_blank" rel="noopener noreferrer">How It Works</Nav.Link>
      </Nav>
      </Container>
    </Navbar>
    );
    }
}