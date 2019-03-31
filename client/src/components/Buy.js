import React, { Component } from "react";
import { Tile, Heading } from "react-bulma-components";
import API from "../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentEditable from "react-contenteditable";

class Buy extends Component {
  clear = () => {
    let empObj = { buy: [] };
    API.clear({ empObj, user_id: this.props.user_id })
      .then(dbData => {
        console.log("Cleared Buy Data");
        this.props.refresh();
      })
      .catch(err => console.log(err));
  };

  handleUpdate = (e, index) => {
    /*alert(this.props.buy[index]);
    alert(e.target.value);
    alert(index); */
  };

  render() {
    //console.log(this.props.schedule);
    return (
      <Tile
        renderAs="article"
        kind="child"
        notification
        color={`buy-${this.props.theme}`}
      >
        <Heading>Shopping List</Heading>
        <Heading subtitle />

        {this.props.buy.map((item, i) => (
          <ContentEditable
            key={i}
            html={item}
            onChange={e => this.handleUpdate(e, i)}
          />
        ))}
        <FontAwesomeIcon icon="backspace" onClick={this.clear} size="lg" />
      </Tile>
    );
  }
}

export default Buy;
