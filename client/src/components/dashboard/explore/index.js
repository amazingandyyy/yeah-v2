import React, { Component } from 'react';
import Volunteer from './volunteer';

export default class Explore extends Component {
  render() {
    return (
      <div className="display-componet explore">
          <div className="header">Explore</div>
          <div className="content">
            <Volunteer />
            <Volunteer />
            <Volunteer />
          </div>
      </div>
    );
  }
}