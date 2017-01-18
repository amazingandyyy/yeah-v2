import React, { Component } from 'react';
import Drawer from './drawer';
import $ from 'jquery';

export default class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard-component drawer-opened">
        <Drawer />
        {this.props.children}
      </div>
    );
  }
  componentDidMount() {
    let width = $(window).width();
    
    function config(width){
      if($('.dashboard-component')){
        $('#drawer-handle').on('click', () => {
          $('.dashboard-component').toggleClass('drawer-closed')
        })

        if(width < 700){
          // on the small screen
          closeDrawer()
          $('.drawer-component').find('.item').on('click', () => {
            if($(window).width() < 700){closeDrawer()}
          })
        }else{
          openDrawer()
        }
      }
    }
    config(width)

    $(window).resize(() => {
      let width = $(window).width();
      config(width)
    })

    function openDrawer(){
      $('.dashboard-component').removeClass('drawer-closed');
    }
    function closeDrawer(){
      $('.dashboard-component').addClass('drawer-closed');
    }
  }
}