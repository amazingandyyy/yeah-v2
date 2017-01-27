import React, { Component } from 'react';
import PageTransition from 'react-router-page-transition';
import { RouteTransition } from 'react-router-transition';

export default class Explore extends Component {
  componentWillMount() {
    // console.log(<PageTransition></PageTransition>)
  }
  render() {
    return (
      <div className="display-componet explore">
          {this.props.children}
      </div>
    );
  }
}
// <RouteTransition
//   pathname={this.props.location.pathname}
//   atEnter={{ opacity: 0, transition: 0.01 }}
//   atLeave={{ opacity: 0, transition: 0.01 }}
//   atActive={{ opacity: 1, transition: 0.01 }}
// >