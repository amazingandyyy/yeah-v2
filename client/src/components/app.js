import React, { Component } from 'react';
import Header from './header';
import Footer from './footer';
import $ from 'jquery';
import Drawer from './dashboard/drawer';

export default class App extends Component {
  render() {
    return (
      <div>
          <div style={{paddingTop: '57px', paddingBottom: '50px'}}>
          {this.props.children}
          </div>
      </div>
    );
  }
  componentDidMount() {
    let width = $(window).width();

    $('#drawer-handle').on('click', () => {
      $('body').toggleClass('drawer-closed')
    })

    function config(width) {
      if (width < 767) {
        closeDrawer();
        startListeningClick();
      } else {
        openDrawer();
        removeListeningClick();
      }
    }
    config(width)

    $(window).resize(() => {
      let width = $(window).width();
      config(width)
    })

    function openDrawer() {
      $('body').removeClass('drawer-closed');
    }
    function closeDrawer() {
      $('body').addClass('drawer-closed');
    }
    function startListeningClick() {
      $('body').find('.item').on('click', () => {
        closeDrawer();
      })
    }
    function removeListeningClick() {
      $('body').find('.item').off('click');
    }
  }
}
