import React, { Component } from "react";
import BigCalendar from "react-big-calendar-like-google";
import moment from "moment";
//import 'react-big-calendar-like-google/lib/css/react-big-calendar.css';
import "./calender.css";
import API from "./../utils/API";

const localizer = BigCalendar.momentLocalizer(moment);
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calender extends Component {
  state = {
    query: "",
    view: "day",
    date: new Date(2019, 3, 10),
    width: 640,
    events: []
  };

  convertDate = date => {
    return moment.utc(date).toDate();
  };

  componentDidMount() {
    API.schedule(this.props.user_id)
      .then(res => {
        let appointments = res.data;

        for (let i = 0; i < appointments.length; i++) {
          appointments[i].start = this.convertDate(appointments[i].start);
          appointments[i].end = this.convertDate(appointments[i].start);
        }

        this.setState({
          events: appointments
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const { events } = this.state;

    return (
      <div style={{ height: 700 }}>
        <BigCalendar
          style={{ height: 500, width: this.state.width }}
          localizer={localizer}
          events={events}
          step={60}
          views={allViews}
          onNavigate={date => this.setState({ date })}
        />
      </div>
    );
  }
}

/*
          view={this.state.view}
          onView={() => {}}
          date={this.state.date}
          
 */

export default Calender;
