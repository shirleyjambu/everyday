import React, {Component} from 'react';
import {Tile, Heading} from 'react-bulma-components';

class Expenses extends Component {
  
  render(){
    console.log(this.props.schedule);
    return(
      <Tile renderAs="article" kind="child" notification color="danger">
        <Heading>Expenses</Heading>
        <Heading subtitle></Heading>
        {this.props.expenses.map(
            (expense,i) => 
              <div key={i}>
              <span>{expense.category}: {expense.cost}</span> <br/>
              </div>
          )}
        
      </Tile>
    )
  }
  
}
export default Expenses;