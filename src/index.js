import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import TestingAcc from './components/testingAccordion.js'
import ToggleButton from './components/ToggleButton.js'
import reportWebVitals from './reportWebVitals';
import FlowTable from './InputTable/FlowTable.js';

ReactDOM.render(
    <App/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
