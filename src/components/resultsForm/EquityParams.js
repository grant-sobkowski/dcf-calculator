import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import Collapse from 'react-bootstrap/Collapse'
import UnitsDropdown from '../UnitsDropdown'
import CollapseButton from '../CollapseButton';
import ToggleButton from '../ToggleButton.js'

export default class EquityParams extends React.Component{
    constructor(){
        super();
    }
    getParams(){
        if(this.props.equityMethod == "CAPM"){
            return this.capm();
        }
        return this.ddm();
    }
    capm(){
    let grandChildrenRequired = (this.props.open_0_0 && this.props.open_0_1);
    return(
    <>
      <p className='input-subheading'>Expected Market Return (%)</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            required={grandChildrenRequired}
            className='input-results'
            type="number" placeholder="20" min="0" max="999"
            step=".0001"
            name="market_return"
            value={this.props.market_return}
            onChange={this.props.handleChange} />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0-999
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
    </>
    );
    }
    ddm(){
    let grandChildrenRequired = (this.props.open_0_0 && this.props.open_0_1);
    return(
      <>
      <p className='input-subheading'>Dividend Growth Rate (%):</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            required={grandChildrenRequired}
            className='input-results'
            type="number" placeholder="20" min="0" max="999"
            step=".0001"
            name="dividend_growth_rate"
            value={this.props.dividend_growth_rate}
            onChange={this.props.handleChange} />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0-999
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
      <p className='input-subheading'>Forward Dividend Yield (%):</p>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            required={grandChildrenRequired}
            className='input-results'
            type="number" placeholder="20" min="0" max="999"
            step=".0001"
            name="current_dividend"
            value={this.props.current_dividend}
            onChange={this.props.handleChange} />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0-999
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
      </>
    );
    }

    render(){
    return(
    <Row>
      <p className='input-subheading'>COE (%)</p>
      <Col xs={1} sm={1}>
        <CollapseButton 
        stateVar={this.props.open_0_1} stateId="open_0_1" handleCollapse={this.props.handleCollapse}/>
      </Col>
      <Col>
      <Form.Group xs={11} sm={11} className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            disabled={(!this.props.open_0_0 || this.props.open_0_1)?true:false}
            required={(this.props.open_0_0 && !this.props.open_0_1)?true:false}
            className='input-results'
            type="number" placeholder="20" min="0" max="999"
            step=".0001" 
            name="CoE"
            value={this.props.CoE}
            onChange={this.props.handleChange} />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0-999
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
      <Collapse in={this.props.open_0_1}>
      <Row className="sub-row wacc-row">
        <p className="input-subheading">Equity Evaluation Method:</p>
        <ToggleButton
        handleChange={this.props.handleChange}
        unitsId="equityMethod"
        optionOne="CAPM"
        optionOneId="CAPM"
        optionTwo="DDM"
        optionTwoId="DDM"
        currentMethodName="equityMethod"
        currentMethod={this.props.equityMethod}
        />
      {this.getParams()}
      </Row>
      </Collapse>
      </Col>
    </Row>
    );
    }

}