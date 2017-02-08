import React, {Component} from 'react';
import Drawer from './drawer';
import $ from 'jquery';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-component">
        <Drawer/> {this.props.children}
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