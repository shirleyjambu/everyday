import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import Register from './pages/Register';
import Login from './pages/Login';
import Everyday from './pages/Everyday';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faIgloo } from '@fortawesome/free-solid-svg-icons';

library.add(faIgloo)

class App extends Component {
  render() {
    return (
      <React.Fragment>
          <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Login}/>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/user/:email" component={Everyday} />
        
      </Switch>
        </div>
      </Router>
        
      </React.Fragment>
    );
  }
}
export default App;
