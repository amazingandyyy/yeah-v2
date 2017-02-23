import React, {Component} from 'react';
import Header from '../header';
import Introduction from './introduction';
import Facts from './facts';
import Statistics from './statistics';
import Space from './space';
import LProgram from './longProgram';
import SProgram from './shortProgram';
import Stories from './stories';
import Footer from '../footer';

export default class Home extends Component {
  render() {
    return (
      <div className="yeah-home">
        <Header />
        <div className="bg"></div>
        <Introduction />
        <Space height="50"/>
        <hr />
        <Facts />
        <hr />
        <Statistics />
        <hr />
        <LProgram />
        <hr />
        <SProgram />
        <Stories />
        <Footer />
      </div>
    );
  }
}