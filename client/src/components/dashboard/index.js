import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="container">
        <h1>Dashboard</h1>
        <Link to="/signout">Sign Out</Link>
        {this.props.children}
        </div>
      </div>
    );
  }
}