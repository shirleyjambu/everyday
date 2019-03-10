import React, {Component} from 'react';

import {Button} from 'react-bulma-components';

import API from '../../utils/API';


class Register extends Component{
  state = {
    firstName :'',
    lasName :'',
    email:'',
    password:'',
    schedule:[],
    buy:[],
    expenses:[]
  }

  handleInput =(event) =>{
    const {name, value} = event.target;
    
    this.setState({
      [name] : value
    })
  }
  
  handleSubmit = (event) =>{
    event.preventDefault();
    
    API.createUser(this.state)
      .then(this.props.login())
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
         <form onSubmit={this.handleSubmit}>
              <input className="input" type="text" placeholder="First Name" name="firstName" onChange={this.handleInput}/>
              <input className="input" type="text" placeholder="Last Name" name="lastName" onChange={this.handleInput}/>
              <input className="input" type="text" placeholder="Email" name="email" onChange={this.handleInput}/>
              <input className="input" type="password" placeholder="Password" name="password" onChange={this.handleInput}/>
              <Button onClick={this.handleSubmit}  color="warning"><strong>Register</strong></Button>
        </form>
      </div>
    )
  }
}

export default Register;