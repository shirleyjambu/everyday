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

  update = () => {
    let empObj = { buy: this.props.buy };
    API.clear({ empObj, user_id: this.props.user_id })
      .then(dbData => {
        console.log("Updated Buy Data");
        this.props.refresh();
      })
      .catch(err => console.log(err));
  };

  handleUpdate = (e, index) => {
    this.props.buy[index] = e.target.value;
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
        <hr />
        {this.props.buy.map((item, i) => (
          <ContentEditable
            key={i}
            html={item}
            onChange={e => this.handleUpdate(e, i)}
          />
        ))}
        <hr />
        <div className="level">
          <div className="level-left">
            <div className="level-item">
              <FontAwesomeIcon
                icon="backspace"
                onClick={this.clear}
                size="lg"
                title="Clear"
                className="level-item"
              />
            </div>
          </div>
          <div className="level-right">
            <div className="level-item">
              <FontAwesomeIcon
                icon="save"
                onClick={this.update}
                size="lg"
                title="Update"
                className="level-item"
              />
            </div>
          </div>
        </div>
      </Tile>
    );
  }
}

export default Buy;
