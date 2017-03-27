import React, {Component} from 'react';
import {Loader,Header,Footer} from '../widgets';
import Introduction from './introduction';
import Facts from './facts';
import Statistics from './statistics';
import Space from './space';
import LProgram from './longProgram';
import SProgram from './shortProgram';
import Stories from './stories';

export default class Home extends Component {
  render() {
    return (
      <div className="yeah-home">
        <Header />
        <div className="bg"></div>
        <Introduction />
        <Space h="50"/>
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