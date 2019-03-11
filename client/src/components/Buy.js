import React, {Component} from 'react';
import {Tile, Heading} from 'react-bulma-components';

class Buy extends Component {
  state = {
    value: '',
    copied: false,
  };

  render(){
    console.log(this.props.schedule);
    return(
      <Tile renderAs="article" kind="child" notification color="info">
      <Heading>Shopping List</Heading>
      <Heading subtitle></Heading>
      {this.props.buy.map(
          (item,i) => 
            <div key={i}>
            <span >{item}</span> <br/>
            </div>
        )}
    
    </Tile>
    )
  }
  
}
export default Buy;