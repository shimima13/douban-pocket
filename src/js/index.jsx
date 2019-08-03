import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App';
console.log('process.env: '+ JSON.stringify(process.env))
ReactDOM.render(
  <Router basename={'/douban-pocket/'}><App /></Router>,
  document.getElementById('root')
)
