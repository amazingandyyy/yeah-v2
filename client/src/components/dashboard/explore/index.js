import React, { Component } from 'react';
import PageTransition from 'react-router-page-transition';
import { RouteTransition } from 'react-router-transition';

export default class Explore extends Component {
  render() {
    return (
      <div className="display-component explore">
          {this.props.children}
      </div>
    );
  }
}