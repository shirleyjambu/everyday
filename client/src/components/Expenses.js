import React, {Component} from 'react';
import {Tile, Heading} from 'react-bulma-components';
import API from './../utils/API';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Expenses extends Component {
  clear =()=>{
    let  empObj = {expenses :[]}
    API.clear({empObj, user_id:this.props.user_id})
    .then((dbData) => {
      console.log('Cleared Buy Data')
      this.props.refresh();
    })
    .catch(err => console.log(err)); 
    }

  render(){
    console.log(this.props.schedule);
    return(
      <Tile renderAs="article" kind="child" notification color={`expenses-${this.props.theme}`}>
        <Heading>Expenses</Heading>
        <Heading subtitle></Heading>
        {this.props.expenses.map(
            (expense,i) => 
              <div key={i}>
              <span>{expense.category}: {expense.cost}</span> <br/>
              </div>
          )}
        
        <FontAwesomeIcon icon="backspace" onClick={this.clear} size="lg"/>
      </Tile>
    )
  }
  
}
export default Expenses;