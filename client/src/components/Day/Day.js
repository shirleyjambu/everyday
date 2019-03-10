import React, {Component} from 'react';
import Weather from './Weather';

import {Heading, Tile} from 'react-bulma-components';

class Day extends Component{
  render() {
    return (
      <Tile renderAs="article" kind="child" notification color="info">
          <Heading subtitle><Weather/></Heading>
      </Tile>
    );
  }
}

export default Day;