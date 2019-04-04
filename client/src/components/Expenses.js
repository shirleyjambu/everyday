import React, { Component } from "react";
import { Tile, Heading } from "react-bulma-components";
import API from "./../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContentEditable from "react-contenteditable";

class Expenses extends Component {
  clear = () => {
    let empObj = { expenses: [] };
    API.clear({ empObj, user_id: this.props.user_id })
      .then(dbData => {
        console.log("Cleared Expenses Data");
        this.props.refresh();
      })
      .catch(err => console.log(err));
  };

  update = () => {
    let empObj = { expenses: this.props.expenses };
    API.clear({ empObj, user_id: this.props.user_id })
      .then(dbData => {
        console.log("Updated Expenses Data");
        this.props.refresh();
      })
      .catch(err => console.log(err));
  };

  handleUpdate = (e, index) => {
    let uV = e.target.value;
    if (uV !== "") {
      let v = uV.split(":");
      let uO = { category: v[0], cost: v[1] };
      this.props.expenses[index] = uO;
    } else {
      this.props.expenses[index] = e.target.value;
    }
  };

  render() {
    return (
      <Tile
        renderAs="article"
        kind="child"
        notification
        color={`expenses-${this.props.theme}`}
        style={{ height: "100%" }}
      >
        <Heading>Expenses</Heading>
        <hr />

        {this.props.expenses.map((expense, i) => (
          <ContentEditable
            key={i}
            html={`${expense.category}: ${expense.cost}`}
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
export default Expenses;
