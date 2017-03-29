import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Application extends Component {
  render() {
    return (
      <div className="display-component">
        <div className="header">Applications</div>
        <div className="content">
        <div className="container">
          Applications
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ application }){
    return { application }
}

export default connect(mapStateToProps, actions)(Application)