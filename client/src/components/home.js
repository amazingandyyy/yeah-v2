import React, {Component} from 'react';
import {Loader} from './widgets';

export default class App extends Component {
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <h1>Home</h1>
            <Loader/>
          </div>
        </div>
      </div>
    );
  }
}
