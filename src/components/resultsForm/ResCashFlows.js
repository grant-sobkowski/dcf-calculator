import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

import UnitsDropdown from "../UnitsDropdown";

export default class ResCashFlows extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
    <Accordion.Item>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            required
            className='input-results'
            pattern='[\d+]'
            type="number" 
            placeholder="20" min="0" max="999"
            step=".0001"
            name="annual_fcf"
            value={this.props.annual_fcf}
            onChange={this.props.handleChange} />
            <UnitsDropdown
            form_title={this.props.fcf_growth_rate}
            form_units="fcf_growth_rate"
            handleDropdownChange={this.handleDropdownChange}
            />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0 - 999 Trillion
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
    </Accordion.Item>
    );
    }
}