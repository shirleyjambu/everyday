import React, {Component} from 'react';
import Command from './Command';
import Executer from '../../utils/Executer';
import {Heading, Tile} from 'react-bulma-components';


class ActivityInput extends Component{
  state = {
    user_id:this.props.user_id,
    txtInput :''
  }

  handleInput =(event) =>{
    
    const {name, value} = event.target;
    
    this.setState({
      [name] : value
    })
  }

  handleSubmit = (input) =>{
    
    alert('Here :' + input);
    let section = Executer.parse(input, this.state.user_id);
    console.log('Updated Section :' + section);
    this.props.refresh();
  }

  render(){
    return(
      <React.Fragment>
        <Tile renderAs="article" kind="child" notification color="warning">
        <Heading>Command Center</Heading>
        <Heading subtitle></Heading>
          <Command value={this.state.txtInput}
              handleInput={this.handleInput}
              handleSubmit={this.handleSubmit}/>
          </Tile>
      </React.Fragment>
    )
  }
}

export default ActivityInput;