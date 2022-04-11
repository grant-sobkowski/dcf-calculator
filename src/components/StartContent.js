import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import iconCustom from '../assets/custom_icon.png';
import iconFree from '../assets/free_icon.png';
import iconSimple from '../assets/simple_icon.png';
import Button from 'react-bootstrap/Button'

export default class StartContent extends React.Component{
    render(){
    return(
    <div>
        <div className='home-content-container'>
            <Row className="static-description-container">
                <span className="static-description">
                    Our DCF Tool brings users the utility of the ubiquitous Discounted Cash Flow Method 
                    without the headaches of big applications. 
                </span>
            </Row>
            <Row className="chick-foot-row">
            <Col sm={10} md={2} className="icon-container">
                <div className="chick-icon">
                    <img src={iconFree} alt="icon"></img>
                </div>
                <h2>Free</h2>
                <p></p>
            </Col>
            <Col sm={10} md={2} className="icon-container">
                <div className="chick-icon">
                <img src={iconCustom} alt="icon"></img>
                </div>
                <h2>Customizable</h2>
                <p></p>
            </Col>
            <Col sm={10} md={2} className="icon-container">
                <div className="chick-icon">
                <img src={iconSimple} alt="icon"></img>
                </div>
                <h2>Simple</h2>
                <p></p>
            </Col>
            </Row>
        </div>
    </div>
    );
    }
}