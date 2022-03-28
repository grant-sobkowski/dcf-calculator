import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

export default class ResTerminalValue extends React.Component{
    constructor(){
        super();
    }

    render(){
    return(
      <>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <InputGroup>
            <Form.Control
              disabled={this.props.open_2_0?true:false}
              required
              className='input-results'
              type="number" placeholder="20" min="0" max="999"
              step=".01" 
              name="CoE"
              value={this.props.CoE}
              onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0-999
            </Form.Control.Feedback>
        </InputGroup>
        </Form.Group>
      </>
    );
    }
}