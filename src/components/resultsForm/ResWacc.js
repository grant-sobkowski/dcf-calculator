import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup';

export default class ResultsWacc extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
      <InputGroup>
          <Form.Control
            disabled={this.props.open_0_0?true:false}
            required
            className='input-results'
            pattern='[\d+]'
            type="number" 
            placeholder="20"
            min="0"
            max="999"
            step=".0001"
            name="wacc"
            value={this.props.wacc}
            onChange={this.props.handleChange} />
          <Form.Control.Feedback type="invalid">
            Please enter a number within the range 0 - 999 Trillion
          </Form.Control.Feedback>
      </InputGroup>
      </Form.Group>
    );
    }
}