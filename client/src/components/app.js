import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import $ from 'jquery';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
          <div style={{paddingTop: '57px', paddingBottom: '50px'}}>
          {this.props.children}
          </div>
        <Footer />
      </div>
    );
  }
  componentDidMount() {
        $('.logo-text').on('click', () => {
            console.log('logo-text cliecked');
        })
    }
}
