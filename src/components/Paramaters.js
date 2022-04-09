import React from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//Watches/filters values, then passes them to parent component on submit
export default class Paramaters extends React.Component {
    submit(){
        //on tab-switch, send values to parent
    }
    render(){
        return(
            <Row>
                <Row className="sub-row wacc-row divider">
                    <h3>Parameters</h3>
                    <hl is=""></hl>
                </Row>
                <Form.Group as={Col} md={6} sm={12}
                    className="mb-3" 
                    controlId="exampleForm.ControlInput1" >
                  <Form.Label>Investment Timespan (Years)</Form.Label>
                    <Form.Control
                    required
                    name="timespan"
                    type="number" 
                    placeholder="3" 
                    min="1"
                    max="10"
                    step="1"
                    value={this.props.timespan} 
                    onChange={this.props.handleChange}
                    onBlur={this.props.handleTimespanChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter an integer within the range 1 - 10
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md={6} sm={12}>
                    <Form.Label>Current Price ($)</Form.Label>
                    <Form.Control 
                    required
                    name="current_price"
                    type="number" 
                    placeholder="67.4" 
                    min=".0001"
                    step=".0001"
                    max="500000"
                    value={this.props.current_price} 
                    onChange={this.props.handleChange} />
                    <Form.Control.Feedback type="invalid">
                        Please enter number within the range .0001 - 500,000
                    </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Risk Free Rate (%)</Form.Label>
                <Form.Control
                  required
                  className="mb-3"
                  type="number"
                  placeholder="1.5"
                  min=".0001"
                  max="100"
                  step=".0001"
                  name="risk_free_rate"
                  value={this.props.risk_free_rate}
                  onChange={this.props.handleChange} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a number within the range .01 - 100
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Tax Rate (%)</Form.Label>
                <Form.Control
                  required
                  className="mb-3"
                  type="number"
                  placeholder="20"
                  min=".0001"
                  max="100"
                  step=".0001"
                  name="tax_rate"
                  value={this.props.tax_rate}
                  onChange={this.props.handleChange} />
                  <Form.Control.Feedback type="invalid">
                    Please enter a number within the range .01 - 100
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} sm={12} md={6}>
                <Form.Label>Historical Beta</Form.Label>
                <Form.Control
                  required
                  type="number" 
                  placeholder=".80"
                  min=".0001"
                  max="100"
                  step=".0001"
                  name="beta"
                  value={this.props.beta}
                  onChange={this.props.handleChange} />
                  <Form.Control.Feedback type="invalid">
                   Please enter a number within the range .0001 - 100
                  </Form.Control.Feedback>
                </Form.Group>
            </Row>
        );
    }
}