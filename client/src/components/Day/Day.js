import React, { Component } from "react";
import { Heading, Tile } from "react-bulma-components";
import GeoLocator from "./GeoLocator";

class Day extends Component {
  render() {
    return (
      <Tile
        renderAs="article"
        kind="child"
        notification
        color={`weather-${this.props.theme}`}
      >
        <Heading>Weather</Heading>
        <hr />
        <Heading subtitle>
          <GeoLocator />
        </Heading>
      </Tile>
    );
  }
}

export default Day;
