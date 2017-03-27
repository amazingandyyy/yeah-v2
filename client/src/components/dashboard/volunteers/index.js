import React, { Component } from 'react';


class Explore extends Component {
  
  render() {
    return (
      <div className="display-component explore volunteer">
          {this.props.children}
      </div>
    );
  }
}
export default Explore;