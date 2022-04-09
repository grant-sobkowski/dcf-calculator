import React from "react";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup'
import Accordion from 'react-bootstrap/Accordion'

export default class RenderReadout extends React.Component{
    render(){
    let data = this.props.dataObject;
    let returnArray = [];
    for(const property in data){
        console.log(data[property]);
        let parsedVal = String(data[property]).slice(0, -2);
        if(!data[property]){
            console.log(property +' is null!')
        }
        else if((parsedVal == 'undefined') || (parsedVal == 'NaN')){
            console.log(property +' is null!');
        }
        else{
        returnArray.push(this.getPair(property, data[property]))
        }
    }
    return(
    <>
    {returnArray}
    </>
    )
    }
    getPair (key, value){
        return(
        <div className='readout_pair'>
            <p className="readout_pair_key">{key}:</p>
            <p className="readout_pair_value">{value}</p>
        </div>
        )
    }
}