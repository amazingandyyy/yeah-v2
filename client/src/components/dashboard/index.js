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
      $('.dashboard-component').toggleClass('drawer-closed')
    })
    function config(width) {
      if (width < 767) {
        closeDrawer()
      } else {
        openDrawer()
      }
    }
    config(width)

    $(window).resize(() => {
      let width = $(window).width();
      config(width)
    })

    function openDrawer() {
      $('.dashboard-component').removeClass('drawer-closed');
    }
    function closeDrawer() {
      $('.dashboard-component').addClass('drawer-closed');
    }
  }
}