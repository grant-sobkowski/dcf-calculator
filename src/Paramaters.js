import React from "react";
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
//Watches/filters values, then passes them to parent component on submit
export default class Paramaters extends React.Component {
    constructor(){
        //takes prop for form values/setter function
        super();
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            current_price: undefined,
            timespan: undefined
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
    submit(){
        //on tab-switch, send values to parent
    }
    render(){
        return(
            <Tab.Pane eventKey="first">
                <h2>Paramaters</h2>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Investment Timespan</Form.Label>
                    <Form.Control 
                    name="timespan"
                    type="number" 
                    placeholder="In years" 
                    value={this.state.timespan} 
                    onChange={this.handleChange} />
                <Form.Label>Current Price</Form.Label>
                    <Form.Control 
                    name="current_price"
                    type="number" 
                    placeholder="Dollars USD" 
                    value={this.state.current_price} 
                    onChange={this.handleChange} />
                </Form.Group>
            </Tab.Pane>
        );
    }
}