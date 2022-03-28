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
        this.state={
            open_0_0 : true,
            open_0_1 : false
        }
        this.stateChanger = this.stateChanger.bind(this);
    }
    stateChanger(stateId){
        let newVal = !this.state[stateId]
        console.log(`${stateId} now equals ${newVal}`)
        this.setState({[stateId] : newVal});
    }

    render(){
    const handler = this.props.handleChange;
    return(
    <>
        <Row>
            <p className='input-subheading'>WACC (%):</p>
            <Col md={1}>
                <CollapseButton 
                stateVar={this.state.open_0_0} stateId="open_0_0" stateChanger={this.stateChanger}/>
            </Col>
            <Col md={11}>
                
                <ResultsWacc wacc={this.props.wacc} handleChange={handler} open_0_0={this.state.open_0_0}/>
                <Collapse in={this.state.open_0_0}>
                    <div>
                        <EquityParams
                        CoE={this.props.CoE}
                        stateChanger={this.stateChanger}
                        open_0_1={this.state.open_0_1}
                        handleChange={this.props.handleChange}
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
            <Col md={1}>
                <CollapseButton
                stateVar={this.state.open_2_0} stateId="open_2_0" stateChanger={this.stateChanger}/>
            </Col>
            <Col md={11}>
                <ResTerminalValue terminalVal={this.props.terminalVal} terminal_growth_rate={this.props.terminal_growth_rate} open_2_0={this.state.open_2_0}
                />
                <Collapse in={this.state.open_2_0}>
                    <div>
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
                    <TerminalParams
                    handleChange={this.props.handleChange}
                    handleDropdownChange={this.props.handleDropdownChange}
                    valueMethod={this.props.valueMethod}
                    current_ebit={this.props.current_ebit}
                    ebit_units={this.props.ebit_units}
                    ebit_growth_rate={this.props.ebit_growth_rate}
                    exit_multiple={this.props.exit_multiple}
                    terminal_growth_rate={this.props.terminal_growth_rate}
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
                handleTableChange={this.props.handleTableChange}
                handleTableBlur={this.props.handleTableBlur}
                timespan={this.props.timespan}
                rowArray={this.props.rowArray}
                />
              </Collapse>
        </Row>
        
        <Row>
            <Button as={Col} md={3} className="btn-submit" variant="outline-success">
                Refresh
            </Button>
        </Row>
    </>
    );
    }
}