import React from "react";
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

export default class Wacc extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            debt: undefined,
            interest: undefined,
            market_cap: undefined,
            risk_free_rate: undefined,
            beta: undefined,
            market_return: undefined
        }
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState((prevState)=> {
            return {
                ...prevState, [name]: value
            };
        })
    }
    submit(){
        //on tab-switch, send risk premium, %equity, %debt to parent
    }
    render(){
        return(
        <Tab.Pane eventKey="second">
            <h2>Cost of Debt</h2>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Total Debt</Form.Label>
              <Form.Control
                type="number" 
                placeholder="Millions USD"
                name="debt"
                value={this.state.debt}
                onChange={this.handleChange} />
              <Form.Label>Interest Rate</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="1.5%"
                name="interest"
                value={this.state.interest}
                onChange={this.handleChange} />
              <h2>Cost of Equity</h2>
              <Form.Label>Market Capitalization</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Millions USD"
                name="market_cap"
                value={this.state.market_cap}
                onChange={this.handleChange} />
              <Form.Label>Risk Free Rate</Form.Label>
              <Form.Control
                 type="number"
                 placeholder="1.5%"
                 name="risk_free_rate"
                 value={this.state.risk_free_rate}
                 onChange={this.handleChange} />
              <Form.Label>Historical Beta</Form.Label>
              <Form.Control
                 type="number" 
                 placeholder=".80"
                 name="beta"
                 value={this.state.beta}
                 onChange={this.handleChange} />
              <Form.Label>Expected Market Return</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="15%"
                name="market_return"
                value={this.state.market_return}
                onChange={this.handleChange} />
            </Form.Group>
          </Tab.Pane>
        );
    }
}