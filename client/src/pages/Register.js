import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Section, Box} from 'react-bulma-components';
import API from '../utils/API';
import Header from './../components/Header';

const divStyle={
  display: 'flex',
  justifyContent : 'center'
}

class Register extends Component{
  state = {
    firstName :'',
    lastName :'',
    email:'',
    password:''
  }

  handleInput =(event) =>{
    const {name, value} = event.target;
    
    this.setState({
      [name] : value
    })
  }
  
  handleSubmit = (event) =>{
    event.preventDefault();
    const {firstName, lastName, email, password} = this.state;
    let userData ={
      firstName ,
      lastName ,
      email,
      password
    };

    API.createUser(userData)
      .then((dbData) => this.setState(
        {registered : dbData}
      ))
      .catch(err => console.log(err));
  }

  render(){

    if (this.state.registered) {
      return <Redirect to="/login" />
    }

    return(
      <React.Fragment>
          <div style={divStyle}>
      <Section style={{width:400}}>
        <Box>
         <form onSubmit={this.handleSubmit}>
         <Header/>
         <br/>
         <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="First Name" name="firstName" onChange={this.handleInput}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
              <input className="input" type="text" placeholder="Last Name" name="lastName" onChange={this.handleInput}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
            <input className="input" type="text" placeholder="Email" name="email" onChange={this.handleInput}/>
            </div>
          </div>

          <div className="field">
            <div className="control">
            <input className="input" type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
            </div>
          </div>
        
          <div className="field">
            <div className="control" style={divStyle}>
               <Button onClick={this.handleSubmit} outlined color="primary"><strong>Register</strong></Button>
               &nbsp;
                <Button color="primary" outlined renderAs='a' href="/login"><strong>Login</strong></Button>
            </div>
          </div>
              
        </form>
        </Box>
        </Section>
        </div>
      </React.Fragment>
    )
  }
}

export default Register;