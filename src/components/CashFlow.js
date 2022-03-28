import React from "react";
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CashFlowMethod from './CashFlowMethod.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from './ToggleButton';

import ValueMethod from './ValueMethod.js';

export default class CashFlow extends React.Component{
    constructor(){
        super();
    }
    // handleChange(event){
    //     const {name, value} = event.target;
    //     this.setState((prevState) => {
    //         return {
    //             ...prevState, [name]: value
    //         };
    //     });
    // }
    render(){
        return(
        <Row>
            <Row className="sub-row wacc-row divider">
              <h3>Projected Cash Flow</h3>
              <hl is=""></hl>
            </Row>
            <Row className="sub-row wacc-row">
            <p className="input-subheading">Cash Flow Projection:</p>
            <Col md={3}>
              <ToggleButton 
                optionOne="Simple"
                optionOneId="simple"
                optionTwo="Custom"
                optionTwoId="custom"
                currentMethod={this.props.cashFlowMethod}
                currentMethodName="cashFlowMethod"
                handleChange={this.props.handleChange}
              />
            </Col>
            </Row>
            <CashFlowMethod
            cashFlowMethod={this.props.cashFlowMethod}
            handleChange={this.props.handleChange}
            annual_fcf={this.props.annual_fcf}
            growth_rate={this.props.growth_rate}
            handleTableChange={this.props.handleTableChange}
            handleTableBlur={this.props.handleTableBlur}
            timespan={this.props.timespan}
            rowArray={this.props.rowArray}
            />
            
            <Row className="sub-row wacc-row">
            <p className="input-subheading">Terminal Valuation Method:</p>
            <Col md={3}>
              <ToggleButton
                unitsId="valueMethod" 
                optionOne="Exit Multiple"
                optionOneId="exit_multiple"
                optionTwo="Terminal Growth"
                optionTwoId="terminal_growth"
                currentMethod={this.props.valueMethod}
                currentMethodName="valueMethod"
                handleChange={this.props.handleChange}
              />
            </Col>
            </Row>
            <ValueMethod
            valueMethod={this.props.valueMethod}
            terminal_growth_rate={this.props.terminal_growth_rate}
            current_ebit={this.props.current_ebit}
            ebit_growth_rate={this.props.ebit_growth_rate}
            exit_multiple={this.props.exit_multiple}
            handleChange={this.props.handleChange}
            ebit_units={this.props.ebit_units}
            handleDropdownChange={this.props.handleDropdownChange}
            growth_rate={this.props.growth_rate}
            />
        </Row>
        );
    }
}