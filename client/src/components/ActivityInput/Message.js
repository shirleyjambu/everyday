import React, { Component } from "react";
import PropTypes from "prop-types";
import SpeechRecognition from "react-speech-recognition";
//import SpeechRecognition from "./SpeechRecognition";
import { Button, Content } from "react-bulma-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  onResult: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
};

const options = {
  autoStart: false,
  continuous: false
};

class Message extends Component {
  state = {
    listening: false,
    btnText: "microphone-slash",
    tooltip: "Start Recording",
    processBtnTxt: "Execute",
    txtInput: "",
    message: ""
  };

  toggleListen = event => {
    event.preventDefault();
    if (this.state.listening) {
      this.setState(
        {
          listening: false,
          btnText: "microphone-slash",
          tooltip: "Start Recording"
        },
        () => this.props.stopListening()
      );
    } else {
      this.setState(
        {
          listening: true,
          btnText: "microphone",
          tooltip: "Stop Recording"
        },
        () => this.props.startListening()
      );
    }
  };

  clearInput = event => {
    event.preventDefault();
    this.props.resetTranscript();
    this.setState({
      txtInput: ""
    });
  };

  clear = () => {
    alert("clear");
    this.setState({
      txtInput: "",
      processBtnTxt: "Execute"
    });
  };

  handleInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const txtInput = this.state.txtInput;

    this.setState(
      {
        processBtnTxt: "Executing"
      },
      () => this.props.handleSubmit(this.props.finalTranscript || txtInput)
    );

    //this.clear();
  };

  render() {
    const { transcript, browserSupportsSpeechRecognition } = this.props;

    return (
      <React.Fragment>
        <Content>
          <form onSubmit={this.props.handleSubmit}>
            <div className="control">
              <div className="field">
                <label htmlFor="txtInput">Voice/Text Input</label>
                <div style={styles.rowC} className="input">
                  <input
                    onChange={this.handleInput}
                    name="txtInput"
                    type="text"
                    style={styles.input}
                    placeholder="Enter Command"
                    value={transcript || this.state.txtInput}
                  />
                  {browserSupportsSpeechRecognition ? (
                    <FontAwesomeIcon
                      icon={["fas", this.state.btnText]}
                      size="1x"
                      onClick={this.toggleListen}
                      title={this.state.tooltip}
                    />
                  ) : (
                    ""
                  )}
                  &nbsp;
                </div>
              </div>

              <div className="field">
                <Button onClick={this.handleSubmit} color="danger">
                  {this.state.processBtnTxt}
                </Button>
                &nbsp;
                <Button onClick={this.clearInput} color="danger">
                  Reset
                </Button>
                &nbsp;&nbsp;<span>{this.state.message}</span>
              </div>
            </div>
          </form>
        </Content>
      </React.Fragment>
    );
  }
}

const styles = {
  rowC: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "40rem",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 5
  },
  input: {
    backgroundColor: "#FFF",
    border: "none",
    outline: "none",
    borderColor: "transparent",
    width: "100%",
    padding: 5,
    margin: 10
  }
};

Message.propTypes = propTypes;

export default SpeechRecognition(options)(Message);
