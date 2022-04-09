import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import UnitsDropdown from "../UnitsDropdown.js";

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
              disabled={this.props.open_1_0?true:false}
              required={!this.props.open_1_0}
              className='input-results dropdown-input'
              type="number" placeholder="20" min="0" max="999"
              step=".00001" 
              name="terminal_value_input"
              value={this.props.terminal_value_input}
              onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0-999
            </Form.Control.Feedback>
            <UnitsDropdown
              form_title="terminal_value_units"
              form_units={this.props.terminal_value_units}
              handleDropdownChange={this.props.handleDropdownChange}
            />
        </InputGroup>
        </Form.Group>
      </>
    );
    }
}