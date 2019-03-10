import React, {Component} from 'react';
import Schedule from '../components/Schedule';
import Buy from '../components/Buy';
import Expenses from '../components/Expenses';
import ActivityInput from '../components/ActivityInput/ActivityInput';
import {Box, Tile} from 'react-bulma-components';
import API from '../utils/API';

class Everyday extends Component{

  state ={
    user_id : '5c8299d4a955c968c819cdfc',
    schedule : [],
    expenses : [],
    buy : []
  }

  getUser = (query) =>{
    API.getUser(query)
    .then(res => {
      this.setState({ 
        schedule : res.data.schedule,
        expenses: res.data.expenses,
        buy : res.data.buy
       })} 
      )
    .catch(err => console.log(err));
  }

  refresh = () =>{
    this.getUser();
  }

  componentDidMount= () =>{
    this.getUser(this.state.user_id);
  }

  render() {
    return (
       <Box>
        <Tile kind="ancestor">
        <Tile size={8} vertical>
            <Tile kind="parent">
              <ActivityInput user_id={this.state.user_id} refresh={this.refresh}/>
            </Tile>
            <Tile>
              <Tile kind="parent">
                <Buy buy={this.state.buy}/>
              </Tile>
              <Tile kind="parent">
                <Expenses expenses={this.state.expenses}/>
              </Tile>
            </Tile>              
        </Tile>
        <Tile kind="parent" vertical>
        <Schedule schedule={this.state.schedule}/>
        </Tile>
        </Tile>
      </Box>
    
    )
  }
}

export default Everyday;