import React, { Component } from "react";
import Message from "./Message";
import Executer from "../../utils/Executer";
import { Heading, Tile } from "react-bulma-components";

class ActivityInput extends Component {
  state = {
    user_id: this.props.user_id,
    txtInput: ""
  };

  handleInput = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = input => {
    Executer.parse(input, this.props.user_id);
    this.props.refresh();
  };

  render() {
    return (
      <React.Fragment>
        <Tile renderAs="article" kind="child" notification color="warning">
          <Heading>Message Center</Heading>
          <Heading subtitle />
          <Message
            value={this.state.txtInput}
            handleInput={this.handleInput}
            handleSubmit={this.handleSubmit}
          />
        </Tile>
      </React.Fragment>
    );
  }
}

export default ActivityInput;
