import React, {Component} from 'react';
import API from '../../utils/API';
import Clock from './Clock';

class Weather extends Component {
  state = {
    weatherData : {}
  };

  getWeather = (query) =>{
    API.weather(query)
    .then(res => {
        const weatherInfo = {
          temp: res.data.main.temp,
          city: res.data.name,
          desc: res.data.weather[0].main,
          icon: `http://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
        };
        this.setState({
          weatherData: weatherInfo
        })
      }
      )
    .catch(err => console.log(err));
  }

  componentDidMount= () =>{
    this.getWeather('Somerset,us');
  }

  render(){
    const {city, desc, temp, icon} = this.state.weatherData;
    return(
      <React.Fragment>
        <Clock/>
        
        {city}&nbsp;
        <img src={icon} title={desc} alt={desc} />
        {temp}{'\u00b0'}
      </React.Fragment>
    )
  
  }
  
}
export default Weather;