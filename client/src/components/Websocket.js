import React, { Component } from 'react';
import io from 'socket.io-client';

export default class Websocket extends Component {
  state = {
    text: ''
  }

  componentDidMount(){
    const socket = io();
    socket.on('ticker', (data)=>{
      console.log(data)
    })
  }

  render() {
    
    return (
      <div className="websocket">
        <div className="container">
          <div className="row">
            <div className="col s12">
            <blockquote><h4>Message from Websocket: <br/>{this.state.text}</h4></blockquote>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
