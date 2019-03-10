import React, { Component } from 'react';
import Everyday from './pages/Everyday';
import LoginPage from './pages/LoginPage';
import './App.scss';

class App extends Component {
  state = {
    loggedIn : true
  }

  handleSignIn =()=>{
    this.setState({
      loggedIn : true
    })
  }

  render() {
    return (
      <React.Fragment>
        {this.state.loggedIn?<Everyday/>:<LoginPage signin={this.handleSignIn}/>}
      </React.Fragment>
    );
  }
}

export default App;
