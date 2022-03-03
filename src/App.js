import './App.scss';
import React from 'react';
import Paramaters from './Paramaters.js';
import Wacc from './Wacc.js';
import CashFlow from './CashFlow';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { TabContainer } from 'react-bootstrap';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      isStart: true,
      curr_price: 0,
      market_cap: 0,
      timespan: 0,
      wacc: 0,
      perc_growth_rate: 0,
      init_fcf: 0,
      term_growth_rate: 0,
      wacc_state: "second",
      fcf_state: "third",
      results_state: "fourth"
    }
    this.handleChange = this.handleChange.bind(this);
    this.createForm = this.createForm.bind(this);
  }
  dcfCalculator(){
    //assumes all values are verified
    let dcfSum = 0;
    let dcfArray = [];
    for(let i=1; i<this.state.timespan+1; i++){
      let fcf = (this.state.init_fcf) * (this.state.perc_growth_rate**i);
      let discount = (1+this.state.wacc)**i;
      let dcf = fcf/discount;
      dcfArray.push(dcf);
      dcfSum+=dcf;
    }
    let terminalVal = (dcfArray[this.state.timespan]*(1+this.state.term_growth_rate))/(this.state.wacc - this.state.term_growth_rate);
    dcfSum += terminalVal;
    dcfArray.push(terminalVal);
    let numShares = this.state.market_cap/this.state.curr_price;
    let fairPrice = dcfSum/numShares;
    return([fairPrice, dcfArray]);
  }
  handleChange(event){
    this.setState({ name: event.target.value });
  }
  createForm(){
    console.log('create form called')
    this.setState({'isStart': false});
  }
  isDisabled(stateString){
    if(stateString==="disabled"){
      return true;
    }
    return false;
  }
  render() {
    console.log('render method called');
    if(this.state.isStart === true){
    return(
      <div className="start-container">
        <h1 className="start-title">DCF Calculator</h1>
        <Button variant="primary" className='start-button' onClick={this.createForm}>Start</Button>{' '}
      </div>
    );
    }
    else{
      return(
        <Container className='app'>
          <Row>
          <Tab.Container defaultActiveKey="first">
          <Col xs={2} lg={2} className="app-navbar">
            <Nav fill variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link 
                eventKey="first" 
                > Paramaters </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                eventKey={this.state.wacc_state} 
                disabled={this.isDisabled(this.state.wacc_state)} 
                >WACC</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                eventKey={this.state.fcf_state} 
                disabled={this.isDisabled(this.state.wacc_state)}
                >Projected FCF</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link 
                eventKey={this.state.results_state} 
                disabled={this.isDisabled(this.state.wacc_state)}
                >Results</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col xs={8} lg={8}>
            <Tab.Content>
              <Paramaters/>
              <Wacc/>
              <CashFlow/>
              <Tab.Pane eventKey="fourth">
                <h2>Results</h2>
                <p>Current asset price goes here</p>
                <div>Graph of cash flows goes here</div>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          </Tab.Container>
          </Row>
          <Row>
            <Col></Col>
          </Row>
        </Container>
      );
    }
  }

}

export default App;
