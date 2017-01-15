import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import $ from 'jquery';

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
          {this.props.children}
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
