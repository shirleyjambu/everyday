import "dotenv";
import axios from "axios";
//const BASEURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const BASEURL = "https://api.openweathermap.org/data/2.5/weather?";
const APIKEY = "&units=imperial&appid=" + process.env.REACT_APP_WEATHER_API_KEY;

export default {
  weather: function(query) {
    return axios.get(BASEURL + query + APIKEY);
  },
  getUser: function(email) {
    console.log("In API getUser" + email);
    return axios.get(`/api/user/${email}`);
  },
  schedule: function(user_id) {
    console.log("In API Schedule");
    return axios.get(`/api/schedule/${user_id}`);
  },
  createUser: function(userObj) {
    console.log("In Create User");
    return axios.post("/api/user", userObj);
  },
  update: function(userObj) {
    console.log("In Update User");
    return axios.put("/api/user", userObj);
  },
  login: function(userObj) {
    console.log("In Logging");
    return axios.post("/api/authenticate", userObj);
  },
  clear: function(empObj) {
    console.log("In Clear User");
    return axios.put("/api/clear", empObj);
  }
};
