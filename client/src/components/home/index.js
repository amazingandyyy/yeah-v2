import React, {Component} from 'react';
import Header from '../header';
import ReactPlayer from 'react-player'

export default class Home extends Component {
  render() {
    return (
      <div className="yeah-home">
        <Header />
        <div className="bg"></div>
      </div>
    );
  }
}