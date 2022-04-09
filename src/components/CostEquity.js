import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'
import UnitsDropdown from './UnitsDropdown.js'

export default class CostEquity extends React.Component {
    constructor(){
        super();
    }
    render(){
    if(this.props.equityMethod == "CAPM"){
    return(
    <Row className = "sub-row wacc-row">
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Expected Market Return (%)</Form.Label>
          <Form.Control 
            required
            type="number" 
            placeholder="12"
            min=".0001"
            max="100"
            step=".0001"
            name="market_return"
            value={this.props.market_return}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .0001 - 100
            </Form.Control.Feedback>
        </Form.Group>
    </Row>

    );
    }
    return(
      <Row className="sub-row wacc-row">
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Forward Dividend Yield (%)</Form.Label>
          <Form.Control 
            required
            type="number"
            placeholder="3.60"
            min=".0001"
            max="100"
            step=".0001"
            name="current_dividend"
            value={this.props.current_dividend}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .0001 - 100
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} sm={12} md={6}>
          <Form.Label>Dividend Growth Rate (%)</Form.Label>
          <Form.Control 
            required
            type="number"
            placeholder="1.48"
            min=".0001"
            max="100"
            step=".0001"
            name="dividend_growth_rate"
            value={this.props.dividend_growth_rate}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .0001 - 100
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
    }
}