import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'


export default function App () {
  return(
    <Router>
      <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <Home />
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