import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

export default class InputCell extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
        <input
        type="number"
        name={this.props.name}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur} 
        value={this.props.value}
        id={this.props.id}
        className="tableInput"
        >
        </input>
    );
    }
}