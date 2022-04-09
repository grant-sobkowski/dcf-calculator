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
        <>
        <Form.Control
        required={this.props.isrequired}
        type="number"
        name={this.props.name}
        onChange={this.props.onChange}
        onBlur={this.props.onBlur} 
        value={this.props.value}
        title={this.props.title}
        className="tableInput"
        />
        <Form.Control.Feedback type="invalid" className="table-feedback">
        Invalid
        </Form.Control.Feedback>
        </>
    );
    }
}