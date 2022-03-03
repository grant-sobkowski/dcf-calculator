import React from "react";
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';

export default class CashFlow extends React.Component{
    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            annual_fcf: undefined,
            growth_rate: undefined,
            terminal_growth_rate: undefined
        }
    }
    handleChange(event){
        const {name, value} = event.target;
        this.setState((prevState) => {
            return {
                ...prevState, [name]: value
            };
        });
    }
    render(){
        return(
        <Tab.Pane eventKey="third">
            <h2>Projected FCF</h2>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Current Annual FCF</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Millions USD"
                name="annual_fcf"
                value={this.state.annual_fcf}
                onChange={this.handleChange} />
              <Form.Label>Estimated Annual Growth Rate</Form.Label>
              <Form.Control
                type="number" 
                placeholder="3%"
                name="growth_rate"
                value={this.state.growth_rate}
                onChange={this.handleChange}/>
              <Form.Label>Terminal Growth Rate</Form.Label>
              <Form.Control
                type="number" 
                placeholder="1.5%"
                name="terminal_growth_rate"
                value={this.state.terminal_growth_rate}
                onChange={this.handleChange} />
            </Form.Group>
        </Tab.Pane>
        );
    }
}