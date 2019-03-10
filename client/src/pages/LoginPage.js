import React, {Component} from 'react';
import Login  from './../components/Login/Login';
import Register from './../components/Login/Register';

class LoginPage extends Component{
  state ={
    isLogin : true
  }

  handleChange = (event) =>{
    const {name, value} = event.target;

    this.setState({
      [name] : value
    })
  }

  handleRegister =(event) =>{
    event.preventDefault();
    this.setState({
      isLogin : false
    });
  }

  handleLogin =() =>{
    this.setState({
      isLogin : true
    });  
  }

  render(){
    return(
    <React.Fragment>
      {this.state.isLogin?<Login signin={this.props.signin} register={this.handleRegister}/>:<Register login={this.handleLogin}/>}
    </React.Fragment>)
  }
}

export default LoginPage;