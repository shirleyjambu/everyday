import React, { Component } from "react";
import Schedule from "../components/Schedule";
import Buy from "../components/Buy";
import Expenses from "../components/Expenses";
import ActivityInput from "../components/ActivityInput/ActivityInput";
import { Box, Tile, Hero, Heading } from "react-bulma-components";
import API from "../utils/API";
import Clock from "./../components/Day/Clock";
import Day from "./../components/Day/Day";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

class Everyday extends Component {
  state = {
    isLoggedIn: true,
    user_id: "",
    email: "",
    schedule: [],
    expenses: [],
    buy: [],
    theme: "dark",
    icon: "toggle-on"
  };

  getUser = email => {
    API.getUser(email)
      .then(res => {
        this.setState({
          user_id: res.data._id,
          email: res.data.email,
          schedule: res.data.schedule,
          expenses: res.data.expenses,
          buy: res.data.buy
        });
      })
      .catch(err => console.log(err));
  };

  refresh = () => {
    this.getUser(this.state.email);
  };

  componentDidMount = () => {
    this.setState({
      email: this.props.match.params.email
    });
    this.getUser(this.props.match.params.email);
  };

  toggleStyle = () => {
    this.setState({
      theme: this.state.theme === "dark" ? "light" : "dark",
      icon: this.state.icon === "toggle-on" ? "toggle-off" : "toggle-on"
    });
  };

  render() {
    const { icon, user_id, theme, buy, expenses, schedule } = this.state;
    return (
      <Box>
        <Hero color="primary" gradient>
          <Hero.Head renderAs="header">
            <br />
            <div className="level is-mobile">
              <div className="level-left">
                &nbsp;&nbsp;
                <FontAwesomeIcon
                  icon={icon}
                  onClick={this.toggleStyle}
                  size="2x"
                />
              </div>
              <div className="level-item">
                <Heading>
                  <Clock />
                </Heading>
              </div>
              <div className="level-right">
                <Link to="/login">
                  <FontAwesomeIcon icon={"power-off"} size="2x" />
                </Link>
                &nbsp;&nbsp;
              </div>
            </div>

            <br />
          </Hero.Head>
        </Hero>
        <br />
        <Tile kind="ancestor">
          <Tile size={8} vertical>
            <Tile kind="parent">
              <ActivityInput user_id={user_id} refresh={this.refresh} />
            </Tile>
            <Tile>
              <Tile kind="parent">
                <Buy
                  user_id={user_id}
                  buy={buy}
                  theme={theme}
                  refresh={this.refresh}
                />
              </Tile>
              <Tile kind="parent">
                <Expenses
                  user_id={user_id}
                  expenses={expenses}
                  theme={theme}
                  refresh={this.refresh}
                />
              </Tile>
            </Tile>
          </Tile>
          <Tile kind="parent" vertical>
            <Day theme={this.state.theme} />
            <Schedule
              user_id={user_id}
              schedule={schedule}
              theme={theme}
              refresh={this.refresh}
            />
          </Tile>
        </Tile>
      </Box>
    );
  }
}

export default Everyday;
