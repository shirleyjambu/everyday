import React, {Component}  from 'react';
import Clock from 'react-live-clock';
 
class MyClock extends Component {
    render() {
      return(
        <div><Clock format={"MMM Do, hh:mm:ss a"} ticking={true} timezone={'US/Eastern'} /></div>
      )
        
    }
}

export default MyClock;