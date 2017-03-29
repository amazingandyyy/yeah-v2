import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';

class Application extends Component {

  renderAdminApp() {
    return (<div>Adminnn</div>)
  }

  render() {
    return (
      <div className="display-component application">
        <div className="header">Applications</div>
        <div className="content">
        <div className="container">
          <div className="title">
            Applications
          </div>
          {this.props.isAdmin && this.renderAdminApp()}
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({application, auth}){
    return {
      isAdmin: auth.isAdmin,
      apps: application.apps,
      app: application.app,
      error: application.error
    }
}

export default connect(mapStateToProps, actions)(Application)