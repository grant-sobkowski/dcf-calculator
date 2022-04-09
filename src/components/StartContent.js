import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'

export default class StartContent extends React.Component{
    render(){
    return(
    <div className="start-container">
        <h1 className="start-title">DCF Tool</h1>
        <Button variant="outline-success" className='start-button' onClick={this.createForm}>Start</Button>{' '}
        <div className='home-content-container'>
            <Row>
                <p>
                    DCF Tool brings users the utility of the beloved Discounted Cash Flow Method 
                    without the headaches of big applications. 
                </p>
            </Row>
            <Row>
            <Col sm={8} lg={3}>
                <h2></h2>
                <image></image>
                <p></p>
            </Col>
            <Col sm={8} lg={3}>
                <h2></h2>
                <image></image>
                <p></p>
            </Col>
            <Col sm={8} lg={3}>
                <h2></h2>
                <image></image>
                <p></p>
            </Col>
            </Row>
        </div>
    </div>
    );
    }
}