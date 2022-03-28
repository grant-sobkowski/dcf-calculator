import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'

export default class FlowTable extends React.Component{
    constructor(){
        super();
        this.state={
            taxes:'',
            FCF:'',
            EBITDA:'',
            timespan: 0,
            columnArray: []
        }
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
      const {name, value} = event.target;
      this.setState((prevState) => {
          return {
              ...prevState, [name]: value
          };
      });
    }
    handleBlur(){
      let emptyColumn = function (id){
        return(
          {
            id: id,
            ebitda: '',
            depAndAmort: '',
            taxes: '',
            capex: '',
            fcf: 0
          }
        )
      }

      let diff = this.state.timespan - this.state.columnArray.length;
      if(diff > 0){
        for(let i=0; i<diff; i++){
          console.log([...this.state.columnArray, emptyColumn(i)])
          this.setState((state)=>({
            columnArray: [...state.columnArray, emptyColumn(i)]
          }));
        }
      }
    }
    RenderColumn(){
      let val = [];
      this.state.columnArray.map((col)=>{
        val.push(<p>{Object.keys(col)}</p>);
      })
      return val;
    }
    render(){
    return(
    <div>
      <input type="number" name="timespan" value={this.state.timespan} onChange={this.handleChange} onBlur={this.handleBlur}></input>
      {this.RenderColumn()}
    </div>
    // <div className='start-container'>
    // <table>
    // <tbody>
    //     <tr>
    //       <th>EBITDA</th>
    //       <td>adf</td>
    //       <td>100</td>
    //     </tr>
    //     <tr>
    //       <th>Taxes</th>
    //       <td>adfaf</td>
    //       <td>20</td>
    //     </tr>
    //     <tr>
    //       <th>FCF</th>
    //       <td>adfaf</td>
    //       <td>80</td>
    //     </tr>
    // </tbody>
    // </table> 
    // </div>
    );
    }
}