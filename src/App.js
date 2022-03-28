import './App.scss';
import React from 'react';
import Paramaters from './components/Paramaters.js';
import Wacc from './components/Wacc.js';
import CashFlow from './components/CashFlow.js';
import AccordionInput from './components/AccordionInput.js';
import ToggleButton from './components/ToggleButton';

import Accordion from 'react-bootstrap/Accordion'
import Dropdown from 'react-bootstrap/Dropdown';
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';
import Form from 'react-bootstrap/Form';
import { TabContainer } from 'react-bootstrap';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import AccordionHeader from 'react-bootstrap/esm/AccordionHeader';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      //App Variables
      scene: 0,
      isValid: false,

      //Form Variables
      timespan: 3,
      current_price: 1,
      debt: 100,
      interest: 3,
      market_cap: 200,
      risk_free_rate: 1,
      beta: 1,
      market_return: 12,
      growth_rate: 8,
      annual_fcf: 10,
      current_dividend: 2,
      dividend_growth_rate: 1,
      terminal_growth_rate: 1,
      current_ebit: '',
      ebit_growth_rate: '',
      exit_multiple: '',
      CoD: '',
      CoE: '',

      //Calculator Outputs
      wacc: undefined,
      fair_price: undefined,
      fcfArray: [],
      terminal_value: undefined,

      //Component Variables
      // 'CAPM' or 'DDM'
      equityMethod: "CAPM",
      // 'exit_multiple' or 'terminal_growth'
      valueMethod: "terminal_growth",
      // 'simple' or 'custom'
      cashFlowMethod: "simple",
      //Dropdown
      debt_units: "Millions USD",
      market_cap_units: "Millions USD",
      annual_fcf_units: "Millions USD",
      ebit_units: "Millions USD",
      table_units: "Millions USD",
      
      //Table Values
      rowArray: []
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.dcfCalculator = this.dcfCalculator.bind(this);
    this.waccCalculator = this.waccCalculator.bind(this);
    this.createForm = this.createForm.bind(this);
    this.simulateSampleData = this.simulateSampleData.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleTableBlur = this.handleTableBlur.bind(this);
    this.handleTimespanChange = this.handleTimespanChange.bind(this);
  }
  jsxElement(){
    return(
    <Accordion.Item>
      <Accordion.Header>
      Child elem 3
      </Accordion.Header>
    </Accordion.Item>
    );
  }
  simulateSampleData(){
    return this.dcfCalculator(3, 20000000, .08, .11, .03, 120000000, 30);
  }
  dcfCalculator(wacc, curr_price, market_cap, market_cap_units, annual_fcf, timespan, risk_free_rate, terminal_growth_rate, cashFlowMethod, valueMethod, table_units, ebit_units, annual_fcf_units, growth_rate, rowArray){
    //requires projected cash flows, wacc, and stuff to calculate terminal value
    console.log('inside of DCF Calculator!');
    let dcfSum = 0;
    let fcfArrayL = [];
    let fcfArrayGuide = [];
    let lastEbitda = 0;
    let lastFcf = 0;
    if(cashFlowMethod == 'simple'){
      lastEbitda = this.state.current_ebit * (this.state.ebit_growth_rate ** timespan);
      for(let i=1; i<timespan+1; i++){
        fcfArrayGuide.push(i);
        console.log('fcf iteration');
        let fcf = annual_fcf * ((1+growth_rate)**i);
        let discount = (1+wacc)**i;
        let dcf = fcf/discount;
        fcfArrayL.push(fcf);
        dcfSum+=dcf;
        console.log("dcf sum = " + dcfSum);
        lastFcf = fcf;
      }
    }
    if(cashFlowMethod == 'custom'){
      for(let i=1; i<timespan+1; i++){
        fcfArrayGuide.push(i);
        let fcf = rowArray[i-1].fcf;
        let ebitda = rowArray[i-1].ebitda;
        let discount = (1+wacc)**i;
        let dcf = fcf/discount;
        fcfArrayL.push(fcf);
        dcfSum+=dcf;
        lastFcf = fcf;
        lastEbitda = ebitda;
      }
    }
    let terminalVal = 0;
    if(valueMethod=='perpetual_growth'){
      terminalVal = (lastFcf*(1+terminal_growth_rate))/(wacc - terminal_growth_rate);
    }
    if(valueMethod=='exit_multiple'){
      terminalVal = this.state.exit_multiple * lastEbitda;
    }
    console.log("dcf array = " + fcfArrayL);
    console.log("terminalVal = " + terminalVal)
    dcfSum += terminalVal;
    fcfArrayL.push(terminalVal);
    let numShares = market_cap/curr_price;
    let fairPrice = dcfSum/numShares;
    console.log(fairPrice);
    return([fairPrice, [fcfArrayL, fcfArrayGuide], terminalVal]);
  }
  waccCalculator(market_cap, debt, interest, market_return, risk_free_rate, beta, equityMethod, dividend_growth_rate, current_dividend){
    //Using CAPM

    let totCapital = market_cap + debt;
    let pDebt = debt/totCapital;
    let pEquity = market_cap/totCapital;

    let CostDebt = interest;
    let CostEquity = null;

    if(equityMethod==="CAPM"){
    //calculates cost of equity using CAPM model
    let riskPremium = market_return - risk_free_rate;
    CostEquity = risk_free_rate + (beta * riskPremium);
    
    console.log(CostDebt, CostEquity, riskPremium);
    }
    if(equityMethod="DDM"){
    CostEquity = current_dividend + dividend_growth_rate;
    }

    let wacc = (pDebt*CostDebt)+(pEquity*CostEquity);

    console.log(wacc);
    return [wacc, CostDebt, CostEquity];
  }
  handleTableChange(event){
    console.log('handleTableChange called')
    const {name, value, id} = event.target
    let rowArray = [...this.state.rowArray];
    let row = {...rowArray[id]}
    row[name]=value;
    rowArray[id]=row;
    this.setState({rowArray});
  }
  handleTimespanChange(event){
    let emptyRow = function (id){
      return(
        {
          id: id,
          ebitda: '',
          depAndAmort: '',
          taxes: '',
          capex: '',
          nwc: '',
          fcf: 0
        }
      )
    }

    let diff = this.state.timespan - this.state.rowArray.length;
    if(diff > 0){
      let currLength = this.state.rowArray.length ? this.state.rowArray.length : 0; 
      for(let i=currLength; i<diff + currLength; i++){
      //   console.log([...this.state.rowArray, emptyRow(i)])
        this.setState((state)=>({
          rowArray: [...state.rowArray, emptyRow(i)]
        }));
      }
    }
    else{
      for(let i=0; i<(-1*diff); i++){
        let rowArray = [...this.state.rowArray];
        rowArray.pop();
        this.setState({rowArray});
      }
    }
  }
  handleTableBlur(event){
    const {id} = event.target;
    let rowArray = [...this.state.rowArray];
    let row = {...rowArray[id]};
    let {ebitda, taxes, depAndAmort, capex, nwc} = row;
    row.fcf = ebitda - depAndAmort - taxes - capex - nwc;
    rowArray[id] = row;
    this.setState({rowArray});
  }
  handleChange(event){
    const {name, value} = event.target;
    console.log(`${name} now is ${value}`)
    this.setState((prevState) => {
        return {
            ...prevState, [name]: value
        };
    });
  }
  handleDropdownChange(dropdown_id, unit){
    // console.log(`${dropdown_id} now is ${unit}`)
    this.setState({[dropdown_id]: [unit]});
  }
  createForm(){
    console.log('create form called');
    this.setState({'scene': 1});
  }
  isDisabled(stateString){
    if(stateString==="disabled"){
      return true;
    }
    return false;
  }
  async handleSubmit(event){
    console.log('handle submit called')
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('form not valid');
      event.preventDefault();
      event.stopPropagation();
    }
    else{
      this.setState((state)=>{
        const {market_cap, debt, interest, market_return, risk_free_rate, beta, equityMethod, dividend_growth_rate, current_dividend} = state;
        try{
          let localWacc = this.waccCalculator(market_cap, debt, interest, market_return, risk_free_rate, beta, equityMethod, dividend_growth_rate, current_dividend);
          console.log(`WACC results = ${localWacc}`);
          const {timespan, current_price, terminal_growth_rate, cashFlowMethod, valueMethod, table_units, market_cap_units, ebit_units, annual_fcf, annual_fcf_units, growth_rate, rowArray} = state;
          let dcf = this.dcfCalculator(localWacc[0], current_price, market_cap, market_cap_units, annual_fcf, timespan, risk_free_rate, 
            terminal_growth_rate, cashFlowMethod, valueMethod, table_units, ebit_units, annual_fcf_units, growth_rate, rowArray);
          console.log(`DCF results = ${dcf}`);
          return({wacc: localWacc[0], terminal_value: dcf[2], fair_price: dcf[0], fcfArray: dcf[1], CoD: localWacc[1], CoE: localWacc[2]});
        }catch(e){
          console.log('error in wacc calculation!')
          console.error(e);
        }
      })
    }

    let results = this.simulateSampleData();
    await this.setState({
      fair_price: results[0],
      fcfArray: results[1]
    })
    this.setState({scene: 2});
    console.log('dcf array = ' + this.state.fcfArray);
  }
  render() {
    switch(this.state.scene){
    case 0:
      return(
      <div className="start-container">
        <h1 className="start-title">DCF Calculator</h1>
        <Button variant="outline-success" className='start-button' onClick={this.createForm}>Start</Button>{' '}
      </div>
      );
    case 1:
      return(
        <Container className='app'>
          <Form
            noValidate
            validated={this.state.isValid}
            onSubmit={this.handleSubmit}>
            <Paramaters
              handleTimespanChange={this.handleTimespanChange}
              handleChange={this.handleChange}
              current_price={this.state.current_price}
              timespan={this.state.timespan}
              risk_free_rate={this.state.risk_free_rate}
            />
            <Wacc
              handleChange={this.handleChange}
              handleDropdownChange={this.handleDropdownChange}
              debt={this.state.debt}
              interest={this.state.interest}
              equityMethod={this.state.equityMethod}
              market_cap={this.state.market_cap}
              beta={this.state.beta}
              market_return={this.state.market_return}
              debt_units={this.state.debt_units}
              market_cap_units={this.state.market_cap_units}
              current_dividend={this.state.current_dividend}
              dividend_growth_rate={this.state.dividend_growth_rate}
            />
            <CashFlow
              handleChange={this.handleChange} 
              handleDropdownChange={this.handleDropdownChange}
              handleTableChange={this.handleTableChange}
              handleTableBlur={this.handleTableBlur}
              rowArray={this.state.rowArray}
              timespan={this.state.timespan}
              terminal_growth_rate={this.state.terminal_growth_rate}
              growth_rate={this.state.growth_rate}
              annual_fcf={this.state.annual_fcf}
              annual_fcf_units={this.state.annual_fcf_units}
              valueMethod={this.state.valueMethod}
              current_ebit={this.state.current_ebit}
              ebit_growth_rate={this.state.ebit_growth_rate}
              exit_multiple={this.state.exit_multiple}
              ebit_units={this.state.ebit_units}
              cashFlowMethod={this.state.cashFlowMethod}
              />
              <Button className="btn-submit" variant="outline-success" type="submit">Submit form</Button>
          </Form>
        </Container>
        );
      case 2:
        return(
          <Container className='app'>
          <Row className="sub-row wacc-row results divider">
            <h3>Results</h3>
            <hl is=""></hl>
          </Row>
          <Row>
          <p className='output-text'>Fair value : ${this.state.fair_price}</p>
          <p className='output-text'>Current value : ${this.state.current_price}</p>
          </Row>
          <Row className="sub-row wacc-row">
          <hl is=""></hl>
            <Col md={4}>
            <p className='output-text'>Debt : ${this.state.debt}</p>
            <p className='output-text'>Market Capitalization : ${this.state.market_cap}</p>
            <p className='output-text'>WACC : {this.state.wacc}%</p>
            </Col>
            <Col>
            <p className='output-text'>Cost of Debt : ${this.state.CoD}</p>
            <p className='output-text'>Cost of Equity : ${this.state.CoE}</p>
            </Col>
          </Row>
          <Row>
          <Col md={5}>
          <div>
          <Plot
            data={[
              {
                type: 'bar',
                x: this.state.fcfArray[1], 
                y: this.state.fcfArray[0],
                marker: {color: '#00c805'},
              },
            ]}
            layout={ {
              width: 400, 
              height: 280, 
              title: 'Free Cash Flow',
              plot_bgcolor:"#1e2124",
              paper_bgcolor:"#1e2124",
              font: {
                color: 'rgb(255, 255, 255, 0.80)'
              },
            } }
          />
          </div>
          <div>
          <Plot
            data={[
              {
                domain: { x: [0, 1], y: [0, 1] },
                value: 450,
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 100 },
                gauge: { axis: { range: [null, 1000] } }
              },
            ]}
            layout={ {
              width: 400, 
              height: 280, 
              title: 'Terminal Value',
              plot_bgcolor:"#1e2124",
              paper_bgcolor:"#1e2124",
              font: {
                color: 'rgb(255, 255, 255, 0.80)'
              },
            } }
          />
          </div>
          </Col>
          <Col className="accordionInput">
            <AccordionInput
              handleChange={this.handleChange}
              handleDropdownChange={this.handleDropdownChange}
              waccCalculator={this.waccCalculator}
              dcfCalculator={this.dcfCalculator}
              risk_free_rate={this.state.risk_free_rate}
              wacc={this.state.wacc}
              CoD={this.state.CoD}
              CoE={this.state.CoE}
              equityMethod={this.state.equityMethod}
              market_return={this.state.market_return}
              dividend_growth_rate={this.state.dividend_growth_rate}
              growth_rate={this.state.growth_rate}
              valueMethod={this.state.valueMethod}
              annual_fcf={this.state.annual_fcf}
              annual_fcf_units={this.state.annual_fcf_units}
              terminalVal={this.state.terminalVal}
              terminal_val_units={this.state.terminal_val_units}
              terminal_growth_rate={this.state.terminal_growth_rate}
              current_ebit={this.state.current_ebit}
              ebit_units={this.state.ebit_units}
              ebit_growth_rate={this.state.ebit_growth_rate}
              exit_multiple={this.state.exit_multiple}
              cashFlowMethod={this.state.cashFlowMethod}
              timespan={this.state.timespan}
              rowArray={this.state.rowArray}
              scene={this.state.scene}
            />
          </Col>
          </Row>
          </Container>
        );
      default: 
      return(<p>somethings wrong</p>);
    }
  }

}

export default App;
