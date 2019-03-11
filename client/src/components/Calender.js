import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import API from './../utils/API';

const localizer = BigCalendar.momentLocalizer(moment) ;
const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);

class Calender extends Component {
  state = {
    query:'',
    view: "day",
    date: new Date(2019, 3, 10),
    width: 500,
    events :[]
  };

 componentDidMount() {
     
    API.schedule(this.state.query)
    .then(res => {
      this.setState({ 
        events : res.data
      })} 
      )
    .catch(err => console.log(err));
 }


render() {
    const {events} = this.state;
    
    return (
      <div style={{ height: 700 }}>
     
    <BigCalendar
      style={{ height: 500, width: this.state.width }}
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
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