import React from "react"
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class UnitsDropdown extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
        <DropdownButton
        className='btn-dropdown'
        variant="outline-success"
        title={this.props.form_units} >
        <Dropdown.Item
        onClick={()=>this.props.handleDropdownChange(this.props.form_title, "Thousands USD")}>
            Thousands USD</Dropdown.Item>
        <Dropdown.Item
        onClick={()=>this.props.handleDropdownChange(this.props.form_title, "Millions USD")}>
            Millions USD</Dropdown.Item>
        <Dropdown.Item 
        onClick={()=>this.props.handleDropdownChange(this.props.form_title, "Billions USD")}>
            Billions USD</Dropdown.Item>
        <Dropdown.Item 
        onClick={()=>this.props.handleDropdownChange(this.props.form_title, "Trillions USD")}>
            Trillions USD</Dropdown.Item>
      </DropdownButton>
    );
    }
}