import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';


export default class NAME extends React.Component{
    //Goal: try to make a 3-deep accordion, bottom element being card
    constructor(){
        super();
        this.state ={
            open : false,
            open2 : false
        }
    }
    render(){
    return(
        <>
        <Button
          onClick={() => this.setState({open: !this.state.open})} aria-controls="example-collapse-text" aria-expanded={this.state.open}
        >
          click
        </Button>
        <Collapse in={this.state.open}>
          <div id="example-collapse-text">
              lorem ipsum dolor et
            <Button onClick={()=> this.setState({open2: !this.state.open2})}
            aria-controls="example-collapse-text" aria-expanded={this.state.open2}>
            </Button>
            <Collapse in={this.state.open2}>
                <div>
                    afdnlasdnflaksdjf
                </div>
            </Collapse>
          </div>
        </Collapse>
      </>
    );
    }
}