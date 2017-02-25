import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <div>
          <div style={{paddingTop: '57px'}}>
          {this.props.children}
          </div>
      </div>
    );
  }
}
