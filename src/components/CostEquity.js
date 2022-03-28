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
        <Row className="sub-row wacc-row">
        <Form.Group as={Col}>
          <Form.Label>Market Capitalization ($)</Form.Label>
          <InputGroup>
          <Form.Control 
            required
            type="number" 
            placeholder="106"
            min="0"
            max="999"
            step=".01"
            name="market_cap"
            value={this.props.market_cap}
            onChange={this.props.handleChange} />
            <UnitsDropdown
              form_title="market_cap_units"
              form_units={this.props.market_cap_units}
              handleDropdownChange={this.props.handleDropdownChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0 - 999 Trillion
            </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
        </Row>
        <Row className="sub-row">
        <Form.Group as={Col}>
          <Form.Label>Historical Beta</Form.Label>
          <Form.Control
            required
            type="number" 
            placeholder=".80"
            min=".01"
            max="100"
            step=".01"
            name="beta"
            value={this.props.beta}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range .01 - 100
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Expected Market Return (%)</Form.Label>
          <Form.Control 
            required
            type="number" 
            placeholder="12"
            min=".01"
            max="100"
            step=".01"
            name="market_return"
            value={this.props.market_return}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .01 - 100
            </Form.Control.Feedback>
        </Form.Group>
        </Row>
    </Row>

    );
    }
    return(
      <Row className="sub-row wacc-row">
        <Form.Group as={Col}>
          <Form.Label>Dividend Yield (%)</Form.Label>
          <Form.Control 
            required
            type="number"
            placeholder="3.60"
            min=".01"
            max="100"
            step=".01"
            name="current_dividend"
            value={this.props.current_dividend}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .01 - 100
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Dividend Growth Rate (%)</Form.Label>
          <Form.Control 
            required
            type="number"
            placeholder="1.00"
            min=".01"
            max="100"
            step=".01"
            name="dividend_growth_rate"
            value={this.props.dividend_growth_rate}
            onChange={this.props.handleChange} />
            <Form.Control.Feedback type="invalid">
             Please enter a number within the range of .01 - 100
            </Form.Control.Feedback>
        </Form.Group>
      </Row>
    );
    }
}