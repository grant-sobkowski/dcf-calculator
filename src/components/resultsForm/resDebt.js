import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import UnitsDropdown from "../UnitsDropdown";

export default class NAME extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
    <Accordion.Item>
        <Accordion.Header>
            CoD
            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
            <InputGroup>
                <Form.Control
                  required
                  className='input-results'
                  pattern='[\d+]'
                  type="number" 
                  placeholder="20" min="0" max="999"
                  step=".0001"
                  name="debt"
                  value={this.props.debt}
                  onChange={this.props.handleChange} />
                  <UnitsDropdown
                  form_title={this.props.debt_units}
                  form_units="this.props.debt_units"
                  handleDropdownChange={this.handleDropdownChange}
                  />
                <Form.Control.Feedback type="invalid">
                  Please enter a number within the range 0 - 999 Trillion
                </Form.Control.Feedback>
            </InputGroup>
            </Form.Group>
        </Accordion.Header>
        <Accordion.Body>
            Interest growth_rate
            <Form.Group as={Col} className="mb-3" controlId="exampleForm.ControlInput1">
            <InputGroup>
                <Form.Control
                  required
                  className='input-results'
                  pattern='[\d+]'
                  type="number" 
                  placeholder="20" min="0" max="999"
                  step=".0001"
                  name="interest"
                  value={this.props.interest}
                  onChange={this.props.handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please enter a number within the range 0 - 999
                </Form.Control.Feedback>
            </InputGroup>
            </Form.Group>
        </Accordion.Body>
    </Accordion.Item>
    );
    }
}