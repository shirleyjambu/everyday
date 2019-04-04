import React, { Component } from "react";
import { geolocated, geoPropTypes } from "react-geolocated";
import Weather from "./Weather";

const propTypes = {
  positionOptions: {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: Infinity
  },
  watchPosition: false,
  userDecisionTimeout: null,
  suppressLocationOnMount: false,
  geolocationProvider: navigator.geolocation
};

class GeoLocator extends Component {
  render() {
    return !this.props.isGeolocationAvailable ? (
      <div>Your browser does not support Geolocation</div>
    ) : !this.props.isGeolocationEnabled ? (
      <div>Geolocation is not enabled</div>
    ) : this.props.coords ? (
      <Weather
        latitude={this.props.coords.latitude}
        longitude={this.props.coords.longitude}
      />
    ) : (
      <div>Getting the location data&hellip; </div>
    );
  }
}

GeoLocator.propTypes = { ...propTypes, ...geoPropTypes };

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(GeoLocator);
