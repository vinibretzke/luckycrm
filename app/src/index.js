import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Dashboard1 from './Components/Dashboards/'


function App () {
  return(
    <Router>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/home/dashboard">
            <Dashboard1 />
          </Route>
        </Switch>
    </Router>    
  )
}
ReactDOM.render(
  <Router>
    <App/>
  </Router>,

  document.getElementById('root')
);