import './App.scss';
import React from 'react';
import Paramaters from './components/Paramaters.js';
import Wacc from './components/Wacc.js';
import CashFlow from './components/CashFlow.js';
import AccordionInput from './components/AccordionInput.js';

import Accordion from 'react-bootstrap/Accordion'
import Plot from 'react-plotly.js';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import spinner from './assets/spinner.svg';
import RenderReadout from './components/RenderReadout.js';
import NaviBar from './components/NaviBar.js';
import StartContent from './components/StartContent.js';

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      //App Variables
      scene: 0,
      isValidated: false,

      //Form Variables
      timespan: '',
      current_price: 216.30,
      debt: 52,
      interest: 1.47,
      market_cap: 738,
      risk_free_rate: 2.7,
      beta: 0.77,
      market_return: 10,
      growth_rate: 4,
      annual_fcf: 48,
      current_dividend: 2,
      dividend_growth_rate: 1,
      terminal_growth_rate: 3,
      current_ebit: '',
      ebit_growth_rate: '',
      exit_multiple: '',
      gauge_value: 0,
      CoD: '',
      CoE: '',
      terminal_value_input: '',

      //Calculator Outputs
      wacc: undefined,
      fair_price: undefined,
      fcfArray: [],
      dcf_array: [],
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
      terminal_value_units: "Millions USD",
      table_units: "Millions USD",
      tax_rate: '',

      //Accordion Input Collapse States
      open_0_0 : false,
      open_0_1 : false,
      open_1_0: false,
      
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
    this.handleCollapse = this.handleCollapse.bind(this);
    this.loadResultsScene = this.loadResultsScene.bind(this);
    this.setTerminalValObject = this.setTerminalValObject.bind(this);
    this.setWaccObject = this.setWaccObject.bind(this);
    this.loadHomeScreen = this.loadHomeScreen.bind(this);

    this.assumptions = {};
    this.wacc = {};
    this.terminal_valuation = {};
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
  async handleSubmit(event){
    console.log('handle submit called')
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      console.log('form not valid');
      event.preventDefault();
      event.stopPropagation();
      this.setState({isValidated: true})
    }
    else{
      event.preventDefault();
      this.setState((state)=>{
        try{
          const {market_cap, market_cap_units, debt, debt_units, interest, market_return, risk_free_rate, beta, 
            equityMethod, dividend_growth_rate, current_dividend, current_ebit, ebit_units, annual_fcf, annual_fcf_units, table_units, scene, terminal_value_input,
            terminal_value_units
          } = state;

          let market_cap_adj = market_cap*this.unitsToFactor(String(market_cap_units));
          let debt_adj = debt*this.unitsToFactor(String(debt_units));
          let ebitda_adj = current_ebit*this.unitsToFactor(String(ebit_units));
          let annual_fcf_adj = annual_fcf*this.unitsToFactor(String(annual_fcf_units));
          let table_factor = this.unitsToFactor(String(table_units));
          let terminal_value_adj = terminal_value_input * this.unitsToFactor(String(terminal_value_units));

          console.log(`terminal val units = ${terminal_value_units}`);
          console.log('type of tval units = ' + typeof(terminal_value_units));
          console.log(`terminal val units factor = ${this.unitsToFactor(terminal_value_units)}`)
          console.log(`terminal val adjusted: ${terminal_value_adj}`);

          let localWacc= this.waccCalculator(market_cap_adj, debt_adj, interest, market_return, risk_free_rate, beta, equityMethod, dividend_growth_rate, current_dividend, scene);

          const {timespan, current_price, terminal_growth_rate, cashFlowMethod, valueMethod, growth_rate, rowArray, ebit_growth_rate, exit_multiple,
                tax_rate} = state;

          let dcf = this.dcfCalculator(localWacc[0], current_price, market_cap_adj, annual_fcf_adj, timespan, risk_free_rate, 
            terminal_growth_rate, cashFlowMethod, valueMethod, table_units, ebitda_adj, growth_rate, rowArray, table_factor, scene, terminal_value_adj);
          let tValPercentile = (dcf[4]);
          console.log(`DCF results = ${dcf}`);
          let tval_input = this.getTerminalInput(dcf[2]);
          console.log('TVAL INPUT: ' + tval_input);
    
          this.assumptions = {
            'Timespan': timespan + ' Years',
            'Risk Free Rate': risk_free_rate + '%',
            'Debt': String(debt) + ' ' + String(debt_units).slice(0, 1),
            'Market Capitalization': String(market_cap) + ' ' + String(market_cap_units).slice(0,1),
            'Current Price': '$' + current_price,
            'Tax Rate': tax_rate + '%'
          }
          this.setTerminalValObject(valueMethod, cashFlowMethod, terminal_growth_rate, current_ebit, ebit_units, ebit_growth_rate, exit_multiple, tval_input);

          function parseNum(number){
            let numLength = Math.ceil(Math.log10(number))+5;
            return parseFloat(String(number).slice(0, numLength));
          }

          return({
            wacc: parseNum(localWacc[0]),
            terminal_value: parseNum(dcf[2]), 
            terminal_value_input: parseNum(tval_input[0]),
            terminal_value_units: tval_input[1],
            fair_price: parseNum(dcf[0]),
            fcfArray: dcf[1], 
            CoD: parseNum(localWacc[1]), 
            CoE: parseNum(localWacc[2]), 
            gauge_value: tValPercentile,
            dcf_array: dcf[5] 
          });
        }catch(e){
          console.log('error in wacc calculation!')
          console.error(e);
        }
      })
      this.setState({isValidated: false})
      this.setState({scene: 3});
      setTimeout(this.loadResultsScene, 2000)

    }
    console.log('dcf array = ' + this.state.fcfArray);
  }
  setTerminalValObject(method_v, method_cf, t_growth, ebitda, ebit_units, ebitda_growth, multiple, tval){
    let term;
    if(ebit_units == 'Thousands USD'){
      term = String(tval[0]*1000).slice(0,9) + '$'
    }
    else{
      term = String(tval[0]).slice(0, 9) + ' ' + tval[1].slice(0, 1);
    }
    if(!this.state.open_1_0 && this.state.scene == 2){
      this.terminal_valuation = {
        'Terminal Value': term
      }
      return 0;
    }
    else{
      if(method_v == 'terminal_growth'){
        this.terminal_valuation = {
          'Terminal Value': term,
          'Method': 'Perp. Growth',
          'Terminal Growth Rate': t_growth + '%',
        }
      }
      else if(method_cf == 'simple'){
        this.terminal_valuation = {
          'Terminal Value': term,
          'Method': 'Exit Multiple',
          'Initial EBITDA': ebitda + ebit_units.slice(0, 1),
          'Estimated Growth Rate': ebitda_growth + '%',
          'Exit Multiple': multiple
        }
      }
      else{
        this.terminal_valuation = {
          'Terminal Value': (String(tval[0]).slice(0, 9) + ' ' + tval[1].slice(0, 1)),
          'Method': 'Exit Multiple',
          'Exit Multiple': multiple
        }
      }
      return 1; 
    }
  }
  setWaccObject(wacc, pDebt=undefined, pEquity=undefined, CoD=undefined, CoE=undefined, method=undefined, 
    beta=undefined, exp_return=undefined, div_yield=undefined, div_growth=undefined, equityClosed
    ){
    pDebt=Math.trunc(pDebt*10000)/100;
    pEquity=Math.trunc(pEquity*10000)/100;
    if(!this.state.open_0_0 && this.state.scene === 2){
      this.wacc ={
        'WACC': String(wacc).slice(0, 9) + '%',
        'Method': 'Direct Input'
      }
    }
    else if(this.state.open_0_0 && equityClosed && this.state.scene === 2){
      this.wacc ={
        'WACC': String(wacc).slice(0, 9) + '%',
        'Capital as Debt': pDebt + '%',
        'Capital as Equity': pEquity + '%',
        'Cost of Debt': CoD + '%',
        'Cost of Equity': CoE + '%'
      }
    }
    else{
      this.wacc = {
        'WACC': String(wacc).slice(0, 9) + '%',
        'Capital as Debt': pDebt + '%',
        'Capital as Equity': pEquity + '%',
        'Cost of Debt': CoD + '%',
        'Cost of Equity': CoE + '%'
      }
      if(method == 'DDM'){
        this.wacc['Method'] = 'DGM';
        this.wacc['Initial Dividend Yield'] = div_yield + '%';
        this.wacc['Dividend Growth Rate'] = div_growth + '%';
      }
      else{
        this.wacc['Method'] = 'CAPM';
        this.wacc['Historical Beta']=beta;
        this.wacc['Expected Market Return']=exp_return + '%';
      }
    }
  }
  getTerminalInput(tVal){
    let returnVal = undefined;
    let returnUnits = undefined;
    for(let i=0; i<4; i++){
      let reducedVal = (tVal/(1000**(i+1)));
      if(reducedVal<999){
        returnVal = reducedVal;
        switch(i){
          case 0: 
          returnUnits = 'Thousands USD';
          break;
          case 1:
          returnUnits = 'Millions USD';
          break;
          case 2:
          returnUnits = 'Billions USD';
          break;
          case 3: 
          returnUnits = 'Trillions USD';
          break;
          default: 
          returnUnits = undefined;
        }
        return[returnVal, returnUnits];
      }
    }
    return[returnVal, returnUnits];
  }
  getTerminalValuePercentile(valueMethod, terminal_growth_rate, wacc, terminal_value, risk_free_rate, lastFcf){
    //return terminal value as percentage of DCF flows
    // let g;
    // if(valueMethod == 'terminal_growth'){
    //   g=terminal_growth_rate;
    //   console.log('TVAL percentile mode = terminal Growth')
    // }
    // else{
    //   let x = terminal_value/lastFcf;
    //   g = ((((wacc/100)+1)*x) - 1)/(x + 1);
    //   console.log(`TVAL percentile multiple: g= ${g} x = ${lastFcf}`);
    //   console.log(`wacc = ${wacc}`)
    // }
    // let percentile = (Math.atan((g-3)/1.3)/Math.PI) + .5;
    // return percentile;
  }
  dcfCalculator(wacc, curr_price, market_cap, annual_fcf, timespan, risk_free_rate, terminal_growth_rate, cashFlowMethod,
    valueMethod, table_units, ebitda_adj, growth_rate, rowArray, table_factor, scene, terminal_value){
    //requires projected cash flows, wacc, and stuff to calculate terminal value
    console.log('inside of DCF Calculator! timespan= ' + timespan );

    let dcfSum = 0;
    let fcfArrayL = [];
    let fcfArrayGuide = [];
    let dcfArrayL = [];
    let lastEbitda = 0;
    let lastFcf = 0;
    let lastDiscount = 1;
    if(cashFlowMethod == 'simple'){
      for(let i=0; i<timespan; i++){
        fcfArrayGuide.push(i+1);
        let fcf = annual_fcf * ((1+(growth_rate/100))**(i+1));
        let discount = (1+(wacc/100))**(i+1);
        console.log(`in dcfCalculator discount rate year (i+1) = ${discount}`)
        let dcf = fcf/discount;
        fcfArrayL.push(fcf);
        lastDiscount = discount;
        dcfArrayL.push(dcf);
        dcfSum+=dcf;
        lastFcf = fcf;
      }
    }
    if(cashFlowMethod == 'custom'){
      for(let i=0; i<timespan; i++){
        fcfArrayGuide.push(i+1);
        let fcf = rowArray[i].fcf * table_factor;
        let ebitda = rowArray[i].ebitda * table_factor;
        let discount = (1+(wacc/100))**(i+1);
        let dcf = fcf/discount;
        fcfArrayL.push(fcf);
        dcfSum+=dcf;
        lastDiscount = discount;
        dcfArrayL.push(dcf);
        lastFcf = fcf;
        lastEbitda = ebitda;
      }
    }
    let terminalVal = 0;
 
    if((scene === 2)&&(!this.state.open_1_0)){
      console.log('Using terminal val input')
      terminalVal = terminal_value;
    }
    else{
      if(valueMethod=='terminal_growth'){
        console.log('terminal growth terminalVal')
        console.log(`wacc = ${wacc} TGR = ${terminal_growth_rate}`)
        console.log('terminal value denominator = ' + ((wacc/100) - (terminal_growth_rate/100)))
        terminalVal = (lastFcf*(1+(terminal_growth_rate/100)))/((wacc/100) - (terminal_growth_rate/100));
      }
      if(valueMethod=='exit_multiple'){
        if(cashFlowMethod == 'custom'){
        console.log(`exit multiple terminalVal exit_multiple = ${this.state.exit_multiple} lastEbitda=${lastEbitda}`)
        terminalVal = this.state.exit_multiple * lastEbitda;
        }
        else{
          lastEbitda = (ebitda_adj*((1+(this.state.ebit_growth_rate/100))**timespan));
          console.log('LAST EBITDA = ' + lastEbitda);
          console.log('exit multiple = ' + this.state.exit_multiple);
          console.log('last discount = ' + lastDiscount);
          terminalVal = this.state.exit_multiple * lastEbitda;
        }
      }
      terminalVal=terminalVal/lastDiscount;
    }

    console.log(`DCF ARRAY ${dcfArrayL}`)
    console.log("fcf array = " + fcfArrayL);
    console.log("terminalVal = " + terminalVal)
    dcfSum += (terminalVal);
    fcfArrayL.push(terminalVal*lastDiscount);
    let numShares = market_cap/curr_price;
    let fairPrice = dcfSum/numShares;
    let percTerm = terminalVal/dcfSum;
    console.log(`perc Term: terminalVal = ${terminalVal} ${lastDiscount} ${dcfSum}`)
    console.log(fairPrice);
    return([fairPrice, [fcfArrayL, fcfArrayGuide], terminalVal, lastFcf, percTerm, dcfArrayL]);
  }
  waccCalculator(market_cap, debt, interest, market_return, risk_free_rate, beta, equityMethod, dividend_growth_rate, current_dividend, scene){
    let totCapital = market_cap + debt;
    let pDebt = debt/totCapital;
    let pEquity = market_cap/totCapital;

    console.log('pdebt = ' + pDebt + 'pEquity' + pEquity);

    let CostDebt = interest * (1-(this.state.tax_rate/100));
    let CostEquity = null;
    let equityClosed = false;

    if(scene===2){
      if(this.state.open_0_0){
        //WACC Dropdown open
        if(this.state.open_0_1){
          //COE Dropdown open
          normalWacc();
        }
        else{
          //WACC open, COE closed
          equityClosed = true;
          CostEquity = this.state.CoE;
        }
      }
      else{
        //WACC Dropdown Closed
        console.log('Direct WACC input');
        this.setWaccObject(this.state.wacc);
        return [this.state.wacc, this.state.CoD, this.state.CoE];
      }
    }
    else{
      //Scene 1
      normalWacc();
    }

    function normalWacc(){
      console.log('In Normal WACC');
      if(equityMethod==="CAPM"){
      //calculates cost of equity using CAPM model
      let riskPremium = parseFloat(market_return) - parseFloat(risk_free_rate);
      // console.log(`market return = ${market_return} risk_free_rate = ${risk_free_rate} beta = ${beta} riskPremium = ${riskPremium}`);
      CostEquity = parseFloat(risk_free_rate) + (beta * riskPremium);
      
      console.log(CostDebt, CostEquity, riskPremium);
      }
      if(equityMethod==="DDM"){
      CostEquity = (parseFloat(current_dividend) + parseFloat(dividend_growth_rate));
      console.log(`in mode DDM! dividend_GR = ${dividend_growth_rate}`)
      }
    }

    let wacc = (pDebt*CostDebt)+(pEquity*CostEquity);
    this.setWaccObject(wacc, pDebt, pEquity, CostDebt, CostEquity, equityMethod, beta, market_return, current_dividend, dividend_growth_rate, equityClosed);

    return [wacc, CostDebt, CostEquity];
  }
  loadHomeScreen(){
    console.log('loaded home screen')
    this.setState({scene: 0});
  }
  loadResultsScene(){
    this.setState({scene: 2, open_0_0: true, open_0_1: true, open_1_0: true});
  }
  unitsToFactor(str){
    switch(str){
      case 'Thousands USD':
        return 1000
        break;
      case 'Millions USD':
        return 1000000
        break;
      case 'Billions USD':
        return 1000000000
        break;
      case 'Trillions USD':
        return 1000000000000
      default: 
        return null;
    }
  }
  handleCollapse(stateId){
    let newVal = !this.state[stateId]
    console.log(`${stateId} now equals ${newVal}`)
    this.setState({[stateId] : newVal});
  }
  handleTableChange(event){
    const {name, value, title} = event.target
    console.log('handleTableChange called, id = ' + title);
    let rowArray = [...this.state.rowArray];
    let row = {...rowArray[title]}
    row[name]=value;
    rowArray[title]=row;
    this.setState({rowArray});
  }
  handleTimespanChange(event){
    let emptyRow = function (id){
      console.log('new row created, id = ' + id);
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
      let currLength = this.state.rowArray.length; 
      for(let i=currLength; i<(diff); i++){
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
    const {title} = event.target;
    let rowArray = [...this.state.rowArray];
    let row = {...rowArray[title]};
    let {ebitda, taxes, depAndAmort, capex, nwc} = row;
    row.fcf = ebitda - depAndAmort - taxes - capex - nwc;
    rowArray[title] = row;
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
    console.log(`${dropdown_id} now is ${unit}`)
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

  render() {
    switch(this.state.scene){
    case 0:
      return(
      <>
      <NaviBar loadHomeScreen={this.loadHomeScreen}/>
      <div className="start-container">
        <h1 className="start-title">DCF Calculator</h1>
        <Button variant="outline-success" className='start-button' onClick={this.createForm}>Get Started</Button>{' '}
        <StartContent/>
      </div>
      </>
      );
    case 1:
      return(
        <>
        <NaviBar loadHomeScreen={this.loadHomeScreen}/>
        <Container className='app'>
          <Form
            noValidate
            validated={this.state.isValidated}
            onSubmit={this.handleSubmit}>
            <Paramaters
              handleTimespanChange={this.handleTimespanChange}
              handleChange={this.handleChange}
              current_price={this.state.current_price}
              timespan={this.state.timespan}
              risk_free_rate={this.state.risk_free_rate}
              tax_rate={this.state.tax_rate}
              beta={this.state.beta}
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
              table_units={this.state.table_units}
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
        </>
        );
      case 2:
        let smallFcfArray = [];
        let dcfArray = this.state.dcf_array;
        console.log(`SCENE 2 plot, state.dcfArray = ${this.state.dcf_array}`)
        for(let i=0; i<this.state.dcf_array.length; i++){
          console.log(`in smallFcf maker, dcfarg val = ${this.state.dcf_array[i]} fcfArg = ${this.state.fcfArray[0][i]}`)
          smallFcfArray.push(this.state.fcfArray[0][i]-this.state.dcf_array[i]);
        }
        console.log(`dcf_array = ${this.state.dcf_array}`)
        return(
          <>
          <NaviBar loadHomeScreen={this.loadHomeScreen}/>
          <Container className='app'>

          <Row>
          <Col sm={12} xl={4} className="results-graph">
          <Plot
            data={[
              {
                name: 'DCF',
                type: 'bar',
                x: this.state.fcfArray[1],
                y: dcfArray,
                marker: {color: '#7FE382'}
              },
              {
                name: 'FCF',
                type: 'bar',
                x: this.state.fcfArray[1], 
                y: this.state.fcfArray[0],
                marker: {color: '#00c805'},
              }
            ]}
            layout={ {
              width: 400, 
              height: 280, 
              title: 'Free Cash Flow',
              plot_bgcolor:"#1e2124",
              paper_bgcolor:"#1e2124",
              barmode: 'group',
              font: {
                color: 'rgb(255, 255, 255, 0.80)'
              },
            } }
            config={ {
              responsive: true
            } }
          />
          </Col>
          <Col sm={12} xl={4} className="results-graph">
          <Plot
            data={[
              {
                domain: { x: [0, 1], y: [0, 1] },
                value: (this.state.gauge_value*100),
                type: "indicator",
                mode: "gauge+number",
                delta: { reference: 100 },
                gauge: { axis: { range: [null, 100] } }
              },
            ]}
            layout={ {
              width: 400, 
              height: 280, 
              title: 'TV as Percentage of Present Value',
              plot_bgcolor:"#1e2124",
              paper_bgcolor:"#1e2124",
              font: {
                color: 'rgb(255, 255, 255, 0.80)'
              },
            } }
            config={ {
              responsive: true
            } }
          />
          </Col>
          <Col sm={12} xl={4} className="results-graph">
          <Plot  
            data={[
              {
                x: ['Market Price', 'Upside', 'Fair Value'],
                y: [0, this.state.current_price, 0],
                type: 'bar',
                name: '',
                marker: {
                  color: 'rgba(1,1,1,0.0)'
                },
                hovertemplate: '<extra></extra>'
              },
              {
                x: ['Market Price', 'Upside', 'Fair Value'],
                y: [this.state.current_price, 0, 0],
                type: 'bar',
                name: '',
                marker: {
                  color: '#7FE382'
                },
                hovertemplate:'value: $' + this.state.current_price
              },
              {
                x: ['Market Price', 'Upside', 'Fair Value'],
                y: [0, (this.state.fair_price - this.state.current_price), 0],
                type: 'bar',
                name: '',
                marker: {
                  color: 'rgb(255, 255, 255, 0.80)'
                },
                hovertemplate:'value: $' + Math.trunc(this.state.fair_price - this.state.current_price)
              },
              {
                x: ['Market Price', 'Upside', 'Fair Value'],
                y: [0, 0, this.state.fair_price],
                type: 'bar',
                name: '',
                marker: {
                  color: '#00c805'
                },
                hovertemplate:'value: $' + (this.state.fair_price)
              }
            ]}
            layout={ {
              width: 400, 
              height: 280, 
              title: 'Market Value v Intrinsic Value',
              plot_bgcolor:"#1e2124",
              paper_bgcolor:"#1e2124",
              font: {
                color: 'rgb(255, 255, 255, 0.80)'
              },
              showlegend: false,
              barmode: 'stack'
            } }
            config={ {
              responsive: true
            } }
          />
          </Col>
          <Col sm={12} lg={8} className="accordionInput">
            <AccordionInput
              handleSubmit={this.handleSubmit}
              handleTableBlur={this.handleTableBlur}
              handleTableChange={this.handleTableChange}
              isValidated={this.state.isValidated}
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
              current_dividend={this.state.current_dividend}
              dividend_growth_rate={this.state.dividend_growth_rate}
              growth_rate={this.state.growth_rate}
              valueMethod={this.state.valueMethod}
              annual_fcf={this.state.annual_fcf}
              annual_fcf_units={this.state.annual_fcf_units}
              terminal_value={this.state.terminal_value}
              terminal_value_input={this.state.terminal_value_input}
              terminal_value_units={this.state.terminal_value_units}
              terminal_growth_rate={this.state.terminal_growth_rate}
              current_ebit={this.state.current_ebit}
              ebit_units={this.state.ebit_units}
              ebit_growth_rate={this.state.ebit_growth_rate}
              exit_multiple={this.state.exit_multiple}
              cashFlowMethod={this.state.cashFlowMethod}
              timespan={this.state.timespan}
              rowArray={this.state.rowArray}
              scene={this.state.scene}
              handleCollapse={this.handleCollapse}
              table_units={this.state.table_units}
              open_0_0={this.state.open_0_0}
              open_0_1={this.state.open_0_1}
              open_1_0={this.state.open_1_0}
            />
          </Col>
          <Row>
          <Col sm={12} md={6}>
            <div className="readout">
              <header className="readout_header">Assumptions</header>
              <div className="readout_body">
                <RenderReadout dataObject={this.assumptions}/>
              </div>
            </div>
            <div className="readout">
              <header className="readout_header">Terminal Valuation</header>
              <div className="readout_body">
                <RenderReadout dataObject={this.terminal_valuation}/>
              </div>
            </div>
          </Col>
          <Col sm={12} md={6}>
            <div className="readout">
              <header className="readout_header">WACC Calculation</header>
              <div className="readout_body">
                <RenderReadout dataObject={this.wacc}/>
              </div>
            </div>
          </Col>
          </Row>
          </Row>
          </Container>
          </>
        );
      case 3: 
        return(
          <Container className="spinner-container">
            <img src={spinner} alt="">
            </img>
          </Container>
        )
      default: 
      return(<p>somethings wrong</p>);
    }
  }

}

export default App;
