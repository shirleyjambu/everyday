import 'dotenv';
import axios from "axios";
const BASEURL = "http://api.openweathermap.org/data/2.5/weather?q=";
const APIKEY = "&units=imperial&appid=" + process.env.REACT_APP_WEATHER_API_KEY;

export default {
  weather: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  },
  getUser: function(query){
    console.log('In API getUser');
    return axios.get('/api/user');
  },
  schedule: function(query){
    console.log('In API Schedule');
    return axios.get('/api/schedule');
  },
  createUser:function(userObj){
    console.log('In Create User');
    return axios.post('/api/user',userObj);
  },
  update:function(userObj){
    console.log('In Update User');
    return axios.put('/api/user',userObj);
  },
  login:function(userObj){
    console.log('In Logging');
    return axios.post('/api/authenticate',userObj);
  }
};

