import React, {Component} from 'react';
import Header from '../header';
import Introduction from './introduction';
import Statistics from './statistics';
import Space from './space';

export default class Home extends Component {
  render() {
    return (
      <div className="yeah-home">
        <Header />
        <div className="bg"></div>
        <Introduction />
        <Space height="150"/>
        <Statistics />
        <Space height="500"/>
      </div>
    );
  }
}