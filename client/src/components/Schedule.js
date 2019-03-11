import React, {Component} from 'react';
import {Tile, Heading, Button, Modal} from 'react-bulma-components';
import Day from './Day/Day';
import Moment from 'react-moment';
import OpenModal from './OpenModal';

class Schedule extends Component {

  render(){
    return(
      <Tile renderAs="article" kind="child" notification color={`schedule-${this.props.theme}`}>
      <Heading subtitle><Day/></Heading>
      {this.props.schedule.map(
          (schedule,i) => 
            <div key={i}>
            <span>
              <strong>
                <Moment format="hh:mm a">{schedule.time}</Moment>
              </strong> : {schedule.note}
            </span> <br/>
            </div>
        )}
      <OpenModal/>  
      </Tile>
    )
  }
  
}
export default Schedule;