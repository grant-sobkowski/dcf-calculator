import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import Collapse from 'react-bootstrap/Collapse'
import UnitsDropdown from '../UnitsDropdown'
import CollapseButton from '../CollapseButton';
import Button from 'react-bootstrap/Button';

export default class TerminalParams extends React.Component{
    constructor(){
        super();
    }
    getParams(){
        if(this.props.valueMethod == "terminal_growth"){
            return this.termVal();
        }
        return this.multiple();
    }
    termVal(){
    return(
    <>
        <Form.Group>
        <Form.Label>Terminal Growth Rate (%)</Form.Label>
        <Form.Control
            required
            className='input-results'
            type="number" 
            placeholder="1.5"
            min=".01"
            max="100"
            step=".01"
            name="terminal_growth_rate"
            value={this.props.terminal_growth_rate}
            onChange={this.props.handleChange} />
        <Form.Control.Feedback type="invalid">
        Please enter a number within the range .01 - 100.
        </Form.Control.Feedback>
        </Form.Group>
    </>
    );
    }
    multiple(){
    return(
      <>
      <Form.Group>
        <Form.Label>Annual EBIT ($)</Form.Label>
        <InputGroup>
            <Form.Control 
            required
            className='input-results'
            type="number"
            placeholder="5"
            min="0"
            max="999"
            step=".01"
            name="current_ebit"
            value={this.props.current_ebit}
            onChange={this.props.handleChange} />
            <UnitsDropdown
            form_title="ebit_units"
            form_units={this.props.ebit_units}
            handleDropdownChange={this.props.handleDropdownChange}
            />
            <Form.Control.Feedback type="invalid">
              Please enter a number within the range 0 - 999 Trillion.
            </Form.Control.Feedback>
        </InputGroup>
        </Form.Group>

        <Form.Group>
        <Form.Label>Projected EBIT Growth Rate (%)</Form.Label>
        <Form.Control
            required
            className='input-results'
            type="number" 
            placeholder="1.5"
            min=".01"
            max="100"
            step=".01"
            name="ebit_growth_rate"
            value={this.props.ebit_growth_rate}
            onChange={this.props.handleChange} />
        <Form.Control.Feedback type="invalid">
        Please enter a number within the range .01 - 100.
        </Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
        <Form.Label>Exit Multiple (P/E Ratio)</Form.Label>
        <Form.Control
            required
            className='input-results'
            type="number" 
            placeholder="1.5"
            min=".01"
            max="999"
            step=".01"
            name="exit_multiple"
            value={this.props.exit_multiple}
            onChange={this.props.handleChange} />
        <Form.Control.Feedback type="invalid">
        Please enter a number within the range .01 - 999.
        </Form.Control.Feedback>
        </Form.Group>
      </>
    );
    }

    render(){
    return(
    this.getParams()
    );
    }

}