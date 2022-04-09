import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'
import Table from 'react-bootstrap/Table'
import InputCell from "./InputCell.js";
import { NavItem } from "react-bootstrap";
import UnitsDropdown from "../components/UnitsDropdown.js";

export default class FlowTable extends React.Component{
    constructor(){
        super();
        // this.state={
        //     taxes:'',
        //     FCF:'',
        //     EBITDA:'',
        //     timespan: 0,
        //     rowArray: []
        // }
        // this.onBlur = this.onBlur.bind(this);
        // this.handleChange = this.handleChange.bind(this);
        // this.handleTimespanChange = this.handleTimespanChange.bind(this);
        // this.renderTable = this.renderTable.bind(this);
        // this.handleTableChange = this.handleTableChange.bind(this);
        // this.renderTableHeader = this.renderTableHeader.bind(this);
    }
    // onBlur(event){
    //     const {id} = event.target;
    //     let rowArray = [...this.state.rowArray];
    //     let row = {...rowArray[id]};
    //     let {ebitda, taxes, depAndAmort, capex, nwc} = row;
    //     row.fcf = ebitda - depAndAmort - taxes - capex - nwc;
    //     rowArray[id] = row;
    //     this.setState({rowArray});
    //     // this.setState((prevState) => {
    //     //     let row = Object.assign({}, prevState.rowArray[id]);
    //     //     let {ebitda, taxes, depAndAmort, capex} = row;
    //     //     row.fcf = ebitda - depAndAmort - taxes - capex;
    //     //     return row;
    //     // }
    //     // )
    // }
    // handleChange(event){
    //   const {name, value} = event.target;
    //   this.setState((prevState) => {
    //       return {
    //           ...prevState, [name]: value
    //       };
    //   });
    // }
    // handleTableChange(event){
    //     console.log('handleTableChange called')
    //     const {name, value, id} = event.target
    //     let rowArray = [...this.state.rowArray];
    //     let row = {...rowArray[id]}
    //     row[name]=value;
    //     rowArray[id]=row;
    //     this.setState({rowArray});
    // }
    // handleTimespanChange(){
    //   let emptyRow = function (id){
    //     return(
    //       {
    //         id: id,
    //         ebitda: '',
    //         depAndAmort: '',
    //         taxes: '',
    //         capex: '',
    //         nwc: '',
    //         fcf: 0
    //       }
    //     )
    //   }

    //   let diff = this.state.timespan - this.state.rowArray.length;
    //   if(diff > 0){
    //     for(let i=0; i<diff; i++){
    //     //   console.log([...this.state.rowArray, emptyRow(i)])
    //       this.setState((state)=>({
    //         rowArray: [...state.rowArray, emptyRow(i)]
    //       }));
    //     }
    //   }
    // }
    renderTableBody(){
        return(
            this.props.rowArray.map((row, key)=>{
                let {id, fcf} = row;
                let inst = this.props.rowArray[id];
                return(
                    <tr key={id} className="table-row">
                        <th className="table-side-header">Year: {id+1}</th>
                        <td><InputCell as={Form.Control}
                        isrequired={true}
                        value={inst.ebitda} 
                        onChange={this.props.handleTableChange} 
                        onBlur={this.props.handleTableBlur} 
                        name="ebitda"
                        title={id}
                        /></td>
                        <td><InputCell
                        isrequired={false}
                        value={inst.depAndAmort} 
                        onChange={this.props.handleTableChange} 
                        onBlur={this.props.handleTableBlur} 
                        name="depAndAmort"
                        title={id}
                        /></td>
                        <td><InputCell
                        isrequired={false}
                        value={inst.taxes}
                        onChange={this.props.handleTableChange} 
                        onBlur={this.props.handleTableBlur} 
                        name="taxes"
                        title={id}
                        /></td>
                        <td><InputCell
                        isrequired={false}
                        value={inst.capex} 
                        onChange={this.props.handleTableChange} 
                        onBlur={this.props.handleTableBlur} 
                        name="capex"
                        title={id}
                        /></td>
                        <td><InputCell
                        isrequired={false}
                        value={inst.nwc} 
                        onChange={this.props.handleTableChange} 
                        onBlur={this.props.handleTableBlur} 
                        name="nwc"
                        title={id}
                        />
                        </td>
                        <td className="cell-read-only">{fcf}</td>
                    </tr>
                )
            })
        )}
    
    renderTableHeader(){
        if(this.props.timespan > 0){
            return(
            <thead className="table-header">
                <tr>
                    <th></th>
                    <th>EBITDA</th>
                    <th>D&A</th>
                    <th>Taxes</th>
                    <th>Capex</th>
                    <th>NWC</th>
                    <th>FCF</th>
                </tr>
            </thead>
            );
        }
        else{
            return <thead/>
        }
    }
    renderTable(){
        if(this.props.timespan > 0){
            return(
            <>
            <Row className="wacc-row table-units-container"> 
            <p className="form-label">Table Units: </p>
            <UnitsDropdown
              form_title="table_units"
              form_units={this.props.table_units}
              handleDropdownChange={this.props.handleDropdownChange}
            />
            </Row>
            <div className="flow-table-container">
            <table className="flow-table">
            {this.renderTableHeader()}
            <tbody>
            {this.renderTableBody()}
            </tbody>
            </table>
            </div>
            </>
            );
        }
        return(
            <div className="table-alert">
                Please enter a valid number for timespan.
            </div>
        )
    }
    render(){
    return(
        <>
        {this.renderTable()}
        </>
    );
    }
}