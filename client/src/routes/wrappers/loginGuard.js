import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, hashHistory } from 'react-router';

const loginGuard = (module, cb) => {
  if(localStorage.getItem('yeah_token')){
    return cb(null, module)
  }
  return hashHistory.push('/auth/signin');;
}

export default loginGuard;