import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';

export default class NAME extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
        <Button onClick={()=> this.props.stateChanger(this.props.stateId)}
        aria-controls="example-collapse-text" 
        aria-expanded={this.props.stateVar}
        variant="success"
        >
        </Button>
    );
    }
}