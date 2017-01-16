import React, { Component } from 'react';
import Drawer from './drawer';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-component">
        <Drawer />
        {this.props.children}
      </div>
    );
  }
}