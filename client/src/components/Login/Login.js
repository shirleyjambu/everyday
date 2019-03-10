import React, {Component} from 'react';
import {Button, Section, Box, Form,Tile} from 'react-bulma-components';
import API from '../../utils/API';

class Login extends Component{
  state ={
    email : '',
    password : '',
    message : ''
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
    
    API.login(this.state)
      .then((res)=>{
        console.log(res.data.error);
        if(res.data.error){
          this.setState({message : res.data.error})
        }else{
          this.props.signin();
        }
        })
      .catch(err => console.log(err));
  }

  render(){
    return(
    <React.Fragment>
      <Section>
        <Box>
          <Tile kind="ancestor" color="danger">hjhh</Tile>
          <form id="loginForm" onSubmit={this.handleSubmit}>
          <div class="field">
  <div class="control">
    <input class="input is-primary" type="text" placeholder="Primary input"/>
  </div>
</div>
            <Form.Field>
                <Form.Control>
                <input type="email" name="email" value={this.state.email} placeholder="Enter Email" onChange={this.handleChange} class="is-primary"/>
                </Form.Control>
            </Form.Field>
            <Form.Field>
                <input type="password" name="password" value={this.state.password} placeholder="Enter Password" onChange={this.handleChange}/>
            </Form.Field>
            <Form.Field>
                <Button onClick={this.handleSubmit}>Login</Button>
                <Button onClick={this.props.register}>Register</Button> 
            </Form.Field>
            <Form.Field>
                <div>{this.state.message}</div>  
            </Form.Field>
            
          </form>
        </Box>
      </Section>
    </React.Fragment>)
  }
}

export default Login;