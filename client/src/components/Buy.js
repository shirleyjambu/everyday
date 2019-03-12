import React, {Component} from 'react';
import {Tile, Heading} from 'react-bulma-components';
import API from '../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Buy extends Component {

  clear =()=>{
    let  empObj = {buy :[]}
    API.clear({empObj, user_id:this.props.user_id})
    .then((dbData) => {
      console.log('Cleared Buy Data')
      this.props.refresh();
    })
    .catch(err => console.log(err)); 
  }

  render(){
    //console.log(this.props.schedule);
    return(
      <Tile renderAs="article" kind="child" notification color={`buy-${this.props.theme}`}>
      <Heading>Shopping List</Heading>
      <Heading subtitle></Heading>
      {this.props.buy.map(
          (item,i) => 
            <div key={i}>
            <span >{item}</span> <br/>
            </div>
        )}
      <FontAwesomeIcon icon="backspace" onClick={this.clear} size="lg"/>
    </Tile>
    )
  }
  
}
export default Buy;