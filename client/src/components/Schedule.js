import React, {Component} from 'react';
import {Tile, Heading} from 'react-bulma-components';
import Day from './Day/Day';

class Schedule extends Component {
  
  render(){
    console.log(this.props.schedule);
    return(
      <Tile renderAs="article" kind="child" notification color="success">
      <Heading subtitle><Day/></Heading>
      {this.props.schedule.map(
          (schedule,i) => 
            <div key={i}>
            <span >{schedule.time}: {schedule.note}</span> <br/>
            </div>
        )}
      
    </Tile>
    )
  }
  
}
export default Schedule;