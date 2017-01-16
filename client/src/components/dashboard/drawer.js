import React from 'react';
import { Link } from 'react-router';
import { Icon } from '../widgets';

const Drawer = () => {
    return (
        <div className="drawer">
          <Link to="/home">
          <div className="item" id="header">
            <span className="icon"><Icon name="home" /></span>
            <span className="title">Dashboard</span>
          </div>
          </Link>
          <Link to="/home">
          <div className="item">
            <span className="icon"><Icon name="home" /></span>
            <span className="title">Home</span>
          </div>
          </Link>
          <Link to="/explore">
          <div className="item">
            <span className="icon"><Icon name="catalog" /></span>
            <span className="title">Explore</span>
          </div>
          </Link>
          <Link to="/resume">
          <div className="item">
            <span className="icon"><Icon name="catalog" /></span>
            <span className="title">Resume</span>
          </div>
          </Link>

          <div className="bottom">
          <Link to="/setting">
            <div className="item">
              <span className="icon"><Icon name="setting" /></span>
              <span className="title">Settings</span>
            </div>
            </Link>

            <Link to="/signout">
            <div className="item">
              <span className="icon"><Icon name="logout" /></span>
              <span className="title">Logout</span>
            </div>
            </Link>
          </div>
          
        </div>
    )
}

export default Drawer;