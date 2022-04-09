import React from 'react';
import Accordion from 'react-bootstrap/Accordion'
import AccordionItem from 'react-bootstrap/esm/AccordionItem';
import Collapse from 'react-bootstrap/Collapse';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import InputGroup from 'react-bootstrap/InputGroup';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from './ToggleButton';
import Form from 'react-bootstrap/Form';

import ResultsWacc from './resultsForm/ResWacc.js';
import ResCashFlows from './resultsForm/ResCashFlows.js';
import ResTerminalValue from './resultsForm/ResTerminalValue.js';
import UnitsDropdown from './UnitsDropdown';
import EquityParams from './resultsForm/EquityParams.js';
import CollapseButton from './CollapseButton.js'
import { ThemeProvider } from 'react-bootstrap';
import TerminalParams from './resultsForm/TerminalParams.js';
import CashFlowMethod from './CashFlowMethod.js'

export default class AccordionInput extends React.Component{
    constructor(subComponent, inputGroup){
        super();
    }
    render(){
    console.log('ACCORDION termInputValue at render = '+ this.props.terminal_value_input)
    const handler = this.props.handleChange;
    return(
    <Form
    noValidate
    validated={this.props.isValidated}
    onSubmit={this.props.handleSubmit}
    >
        <Row>
            <p className='input-subheading'>WACC (%):</p>
            <Col xs={1} sm={1}>
                <CollapseButton 
                stateVar={this.props.open_0_0} stateId="open_0_0" handleCollapse={this.props.handleCollapse}/>
            </Col>
            <Col xs={11} sm={11}>
                
                <ResultsWacc wacc={this.props.wacc} handleChange={handler} open_0_0={this.props.open_0_0}/>
                <Collapse in={this.props.open_0_0}>
                    <div>
                        <EquityParams
                        CoE={this.props.CoE}
                        open_0_0={this.props.open_0_0}
                        open_0_1={this.props.open_0_1}
                        handleCollapse={this.props.handleCollapse}
                        handleChange={this.props.handleChange}
                        risk_free_rate={this.props.risk_free_rate}
                        current_dividend={this.props.current_dividend}
                        dividend_growth_rate={this.props.dividend_growth_rate}
                        market_return={this.props.market_return}
                        equityMethod={this.props.equityMethod}
                        />
                    </div>
                </Collapse>

            </Col>
        </Row>
        <Row>
            <p className='input-subheading'>Terminal Value</p>
            <Col xs={1} sm={1}>
                <CollapseButton
                stateVar={this.props.open_1_0} stateId="open_1_0" handleCollapse={this.props.handleCollapse}/>
            </Col>
            <Col xs={11} sm={11}>
                <ResTerminalValue 
                handleChange={this.props.handleChange}
                handleDropdownChange={this.props.handleDropdownChange}
                terminal_value_input={this.props.terminal_value_input} 
                terminal_value_units={this.props.terminal_value_units}
                terminal_growth_rate={this.props.terminal_growth_rate} 
                open_0_0={this.props.open_0_0}
                open_1_0={this.props.open_1_0}
                />
                <Collapse in={this.props.open_1_0}>
                    <div>
                    <ToggleButton
                    unitsId="valueMethod" 
                    optionOne="Exit Multiple"
                    optionOneId="exit_multiple"
                    optionTwo="Perpetual Growth"
                    optionTwoId="terminal_growth"
                    currentMethod={this.props.valueMethod}
                    currentMethodName="valueMethod"
                    handleChange={this.props.handleChange}
                    />
                    <TerminalParams
                    handleChange={this.props.handleChange}
                    handleDropdownChange={this.props.handleDropdownChange}
                    cashFlowMethod={this.props.cashFlowMethod}
                    valueMethod={this.props.valueMethod}
                    current_ebit={this.props.current_ebit}
                    ebit_units={this.props.ebit_units}
                    ebit_growth_rate={this.props.ebit_growth_rate}
                    exit_multiple={this.props.exit_multiple}
                    terminal_growth_rate={this.props.terminal_growth_rate}
                    open_1_0={this.props.open_1_0}
                     />
                    </div>
                </Collapse>
            </Col>
        </Row>
        <Row>
            <p className='input-subheading'>Cash Flows</p>
            <ToggleButton 
                optionOne="Simple"
                optionOneId="simple"
                optionTwo="Custom"
                optionTwoId="custom"
                currentMethod={this.props.cashFlowMethod}
                currentMethodName="cashFlowMethod"
                handleChange={this.props.handleChange}
              />
              <Collapse>
              <CashFlowMethod
                scene={this.props.scene}
                cashFlowMethod={this.props.cashFlowMethod}
                handleChange={this.props.handleChange}
                handleDropdownChange={this.props.handleDropdownChange}
                handleTableChange={this.props.handleTableChange}
                handleTableBlur={this.props.handleTableBlur}
                table_units={this.props.table_units}
                timespan={this.props.timespan}
                rowArray={this.props.rowArray}
                growth_rate={this.props.growth_rate}
                annual_fcf={this.props.annual_fcf}
                annual_fcf_units={this.props.annual_fcf_units}
                />
              </Collapse>
        </Row>
        <Row>
            <Button className="btn-submit btn-refresh" variant="outline-success" type="submit">
                Refresh
            </Button>
        </Row>
    </Form>
    );
    }
}