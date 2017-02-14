import React, {Component} from 'react';
import Header from '../header';
import Introduction from './introduction';
import Statistics from './statistics';
import Space from './space';
import LProgram from './longProgram';

export default class Home extends Component {
  render() {
    return (
      <div className="yeah-home">
        <Header />
        <div className="bg"></div>
        <Introduction />
        <Space height="80"/>
        <LProgram />
        <Space height="500"/>
      </div>
    );
  }
}