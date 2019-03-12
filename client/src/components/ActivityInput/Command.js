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
    txtInput :'',
    message : ''
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
    this.setState({
      txtInput :''
    })
  }
  
  clear = () =>{
    this.setState({
      txtInput :''
    })
  }

  handleInput =(event) =>{
    const {name, value} = event.target;
    this.setState({
      [name] : value
    })
  }

  handleSubmit=(event)=>{
    event.preventDefault();
    const txtInput = this.state.txtInput
      
    this.props.handleSubmit(this.props.finalTranscript || txtInput);
    this.clear();
  }

  render(){

    const {  transcript, browserSupportsSpeechRecognition } = this.props

    return( 
    <React.Fragment>
        <Content>
          <form onSubmit={this.props.handleSubmit}>
          <div className="control">
            <div className="field">
            <label htmlFor="txtInput">Voice/Text Input</label>
            <br/>
            <input
              onChange={this.handleInput}
              name="txtInput"
              type="text"
              className="input"
              placeholder="Enter Command"
              value={transcript || this.state.txtInput}
            />
            </div>
                       
            {browserSupportsSpeechRecognition?
                <div className="field">
                  <Button onClick={this.handleSubmit} color="danger" >Execute</Button>&nbsp;
                  <Button onClick={this.toggleListen} color="danger">{this.state.btnText}</Button>&nbsp;
                  <Button onClick={this.clearInput} color="danger">Reset</Button>
                  &nbsp;&nbsp;<span>{this.state.message}</span>
                </div>:
                <div>
                  <Button onClick={this.handleSubmit} color="danger" >Execute</Button>
                  &nbsp;&nbsp;<span>{this.state.message}</span>
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