import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

export default class ToggleButton extends React.Component{
    constructor(){
        super();
    }
    render(){
        const optionOne = this.props.optionOne + 'b';
        const optionTwo = this.props.optionTwo + 'b';
    return(
    <div className="toggleContainer">
        <input as={Col} id={optionOne} className="toggle toggle-left" name={this.props.currentMethodName} type="radio" 
            value={this.props.optionOneId}
            onChange={this.props.handleChange}
            checked={this.props.currentMethod == this.props.optionOneId}
            />
        <label htmlFor={optionOne} className="btn-toggle">{this.props.optionOne}</label>
        <input as={Col} id={optionTwo} className="toggle toggle-right" name={this.props.currentMethodName} type="radio"
            onChange={this.props.handleChange} 
            value={this.props.optionTwoId}
            />
        <label htmlFor={optionTwo} className="btn-toggle">{this.props.optionTwo}</label>
    </div>
    );
    }
}