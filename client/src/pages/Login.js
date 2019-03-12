import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Section, Box} from 'react-bulma-components';
import API from '../utils/API';
import Header from './../components/Header';

const divStyle={
  display: 'flex',
  justifyContent : 'center'
}

class Login extends Component{
  state ={
    email : '',
    password : '',
    message : '',
    isLoggedIn : false
  }

  handleChange = (event) =>{
    const {name, value} = event.target;

    this.setState({
      [name] : value
    })
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit =(event) =>{
    event.preventDefault();
    
    if(this.validateForm()){
      API.login(this.state)
      .then((res)=>{
        console.log(res.data.error);
        if(res.data.error){
          this.setState({message : res.data.error})
        }else{
          this.setState(
            {isLoggedIn : true }
          );
        }
        })
      .catch(err => console.log(err));
    }else{
      this.setState({
        message : 'Please enter valid Credentials.'
      })
    }
  }

  render(){
    if (this.state.isLoggedIn) {
      return <Redirect to={`/user/${this.state.email}`}/>
    }

    return(
    <React.Fragment>
      <div style={divStyle}>
      <Section style={{width:400}}>
        <Box>
          <Header/><br/>
          <form id="loginForm" onSubmit={this.handleSubmit}>
          <div className="field">
            <div className="control">
                <input type="email" name="email" value={this.state.email} placeholder="Enter Email" onChange={this.handleChange} className="input is-primary"/>
            </div>
          </div>

          <div className="field">
            <div className="control">
                <input type="password" name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handleChange} className="input is-primary"/>
            </div>
          </div>
  
          <div className="field">
            <div className="control" style={divStyle}>
                <Button color="primary" outlined onClick={this.handleSubmit}>
                <strong>Login</strong>
                </Button>&nbsp;
                <Button color="primary" outlined renderAs='a' href="/register">
                <strong>Register</strong>
                </Button> 
            </div>
          </div>

          <div className="field">
            <div className="control">
                <div>{this.state.message}</div>  
            </div>
          </div>
          </form>
        </Box>
      </Section>
      </div>
    </React.Fragment>)
  }
}

export default Login;