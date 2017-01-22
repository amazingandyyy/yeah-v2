import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

export default function(ComposedComponent) {
  class Authentication extends Component {

    componentWillMount() {
      if (!this.props.isAdmin) {
        hashHistory.push('/auth/signin');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAdmin) {
        hashHistory.push('/auth/signin');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps({auth}) {
    return { isAdmin: auth.isAdmin };
  }

  return connect(mapStateToProps)(Authentication);
}