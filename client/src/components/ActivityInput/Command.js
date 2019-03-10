import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SpeechRecognition from 'react-speech-recognition';
import { Button, Content } from "react-bulma-components";

const propTypes = {
  // Props injected by SpeechRecognition
  transcript: PropTypes.string,
  resetTranscript: PropTypes.func,
  startListening: PropTypes.func,
  stopListening: PropTypes.func,
  browserSupportsSpeechRecognition: PropTypes.bool
}

const options = {
  autoStart: false
}

class Command extends Component{
  state = {
    listening : false,
    btnText : 'Start Recording',
    txtInput :''
  }

  toggleListen =(event) =>{
    event.preventDefault();
    if(this.state.listening){
      this.setState({
        listening : false,
        btnText : 'Start Recording'
      }, () => this.props.stopListening())
      
    }else{
      this.setState({
        listening : true,
        btnText : 'Stop Recording'
      }, () => this.props.startListening()) 
    }
   }

  clearInput = (event) =>{
    event.preventDefault();
    this.props.resetTranscript();
  } 

  handleInput =(event) =>{
    const {name, value} = event.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    this.props.handleSubmit(this.props.finalTranscript || this.state.txtInput);
  }

  render(){

    const {  transcript, browserSupportsSpeechRecognition } = this.props

    return( 
    <React.Fragment>
        <Content>
          <form onSubmit={this.props.handleSubmit}>
          <div className="form-group">
            <label htmlFor="txtInput">Voice/Text Input</label>
            <input
              onChange={this.handleInput}
              name="txtInput"
              type="text"
              className="form-control"
              placeholder="Enter Command"
              value={transcript || this.state.txtInput}
            />
            <br />
            
            {browserSupportsSpeechRecognition?
                <div>
                  <Button onClick={this.handleSubmit} color="danger" >Execute</Button>&nbsp;
                  <Button onClick={this.toggleListen} color="danger">{this.state.btnText}</Button>&nbsp;
                  <Button onClick={this.clearInput} color="danger">Reset</Button>
                </div>:
                <div>
                  <Button onClick={this.handleSubmit} color="danger" >Execute</Button>
               </div>
            }
          </div>
          </form>
        </Content>
    </React.Fragment>)
  }
}

Command.propTypes = propTypes;

export default SpeechRecognition(options)(Command);