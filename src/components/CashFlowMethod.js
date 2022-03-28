import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import FlowTable from '../InputTable/FlowTable.js';

export default class CashFlowMethod extends React.Component{
    constructor(){
        super();
    }
    render(){
    if(this.props.cashFlowMethod == "simple"){
    return(
        <>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Current Annual FCF ($)</Form.Label>
          <InputGroup>
          <Form.Control 
            className={this.props.scene == 2 ? 'input-results' : ''}
            required
            type="number"
            placeholder="5"
            min="0"
            max="999"
            step=".01"
            name="annual_fcf"
            value={this.props.annual_fcf}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0 - 999 Trillion.
            </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        <Form.Group as={Col} className="mb-3">
          <Form.Label>Annual FCF Growth (%)</Form.Label>
          <InputGroup>
          <Form.Control 
            className={this.props.scene == 2 ? 'input-results' : ''}
            required
            type="number"
            placeholder="5"
            min="0"
            max="999"
            step=".01"
            name="growth_rate"
            value={this.props.growth_rate}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0 - 999 Trillion.
            </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        </>
    );
    }
    return(
        <FlowTable
        handleChange={this.props.handleChange}
        handleTableChange={this.props.handleTableChange}
        handleTableBlur={this.props.handleTableBlur}
        timespan={this.props.timespan}
        rowArray={this.props.rowArray}
        />
    );
    }
}