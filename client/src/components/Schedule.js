import React, { Component } from "react";
import { Tile, Heading } from "react-bulma-components";
import Moment from "react-moment";
import OpenModal from "./OpenModal";
import API from "./../utils/API";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Schedule extends Component {
  clear = () => {
    let empObj = { schedule: [] };
    API.clear({ empObj, user_id: this.props.user_id })
      .then(dbData => {
        console.log("Cleared Buy Data");
        this.props.refresh();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Tile
        renderAs="article"
        kind="child"
        notification
        color={`schedule-${this.props.theme}`}
      >
        <Heading>Schedule</Heading>
        <hr />
        {this.props.schedule.map((schedule, i) => (
          <div key={i}>
            <span>
              <strong>
                <Moment format="hh:mm a">{schedule.time}</Moment>
              </strong>{" "}
              : {schedule.note}
            </span>{" "}
            <br />
          </div>
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
              />
            </div>
          </div>

          <div className="level-right">
            <div className="level-item">
              <OpenModal user_id={this.props.user_id} />
            </div>
          </div>
        </div>
      </Tile>
    );
  }
}
export default Schedule;
