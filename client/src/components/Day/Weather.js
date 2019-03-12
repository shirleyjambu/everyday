import React, {Component} from 'react';
import API from '../../utils/API';


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
          country: res.data.sys.country,
          desc: res.data.weather[0].main,
          icon: `https://openweathermap.org/img/w/${res.data.weather[0].icon}.png`
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
    const {city, desc, temp, icon,country} = this.state.weatherData;
    const imgStyl = {transform: 'scale(2)'};
    return(
      <React.Fragment>
        <div className='level'>
          <div className='level-left'>
          {city}&nbsp;,{country}
          </div>
          <div className="level-item">{temp}{'\u00b0'}F</div>
          <div className='level-left'>
            <img src={icon} title={desc} alt={desc} style={imgStyl} />
            
          </div>
        </div>

        
        
        
      </React.Fragment>
    )
  
  }
  
}
export default Weather;