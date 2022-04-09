import React from "react";
import Tab from 'react-bootstrap/Tab';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import Form from 'react-bootstrap/Form';
import UnitsDropdown from './UnitsDropdown.js';
import ToggleButton from "./ToggleButton.js";


import CostEquity from './CostEquity.js'

export default class Wacc extends React.Component{
    constructor(){
        super();
    }
    submit(){
        //on tab-switch, send risk premium, %equity, %debt to parent
    }
    render(){
        return(
        <Row>
            <Row className="sub-row wacc-row">
            <Row className="sub-row wacc-row divider">
                <h3>Cost of Debt</h3>
                <hl is=""></hl>
            </Row>
            <Form.Group as={Col} sm={12} md={6} className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Debt ($)</Form.Label>
              <InputGroup>
              <Form.Control
                required
                pattern='[\d+]'
                type="number" 
                placeholder="20"
                min="0"
                max="999"
                step=".0001"
                name="debt"
                value={this.props.debt}
                onChange={this.props.handleChange} />
                <UnitsDropdown
                form_title="debt_units"
                form_units={this.props.debt_units}
                handleDropdownChange={this.props.handleDropdownChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a number within the range 0 - 999 Trillion
                </Form.Control.Feedback>
                </InputGroup>
            </Form.Group>
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                required
                type="number" 
                placeholder="3"
                min="0.0001"
                max="100"
                step=".0001"
                name="interest"
                value={this.props.interest}
                onChange={this.props.handleChange} />
                <Form.Control.Feedback type="invalid">
                  Please enter a number within the range .01 - 100
                </Form.Control.Feedback>
            </Form.Group>
            </Row>
            <Row className="sub-row">
            <Row className="sub-row wacc-row divider">
                <h3>Cost of Equity</h3>
                <hl is=""></hl>
            </Row>
            <Row className="sub-row market-cap">
            <Form.Group as={Col} sm={12} md={6}>
              <Form.Label>Market Capitalization ($)</Form.Label>
              <InputGroup>
              <Form.Control 
                required
                type="number" 
                placeholder="106"
                min="0.001"
                max="999"
                step=".0001"
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
              <p className="input-subheading">Equity Evaluation Method:</p>
              <ToggleButton
              handleChange={this.props.handleChange}
              unitsId="equityMethod"
              optionOne="CAPM"
              optionOneId="CAPM"
              optionTwo="DGM"
              optionTwoId="DDM"
              currentMethodName="equityMethod"
              currentMethod={this.props.equityMethod}
              />
            </Row>
            <CostEquity
              handleChange={this.props.handleChange}
              handleDropdownChange={this.props.handleDropdownChange}
              equityMethod={this.props.equityMethod}
              market_cap={this.props.market_cap}
              risk_free_rate={this.props.risk_free_rate}
              beta={this.props.beta}
              market_return={this.props.market_return}
              market_cap_units={this.props.market_cap_units}
              current_dividend={this.props.current_dividend}
              dividend_growth_rate={this.props.dividend_growth_rate}
            />
            </Row>
        </Row>
        );
    }
}