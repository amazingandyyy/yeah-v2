import React, { Component } from 'react';
import {Header} from './index';

export default class Auth extends Component {
  render() {
    return (
      <div className="auth-component">
        <Header />
        {this.props.children}
      </div>
    );
  }
}