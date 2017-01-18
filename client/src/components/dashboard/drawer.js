import React, {Component} from 'react';
import { Link } from 'react-router';
import { Icon } from '../widgets';

class Drawer extends Component {
  renderAdmin() {
    if(true){
      return (
        <Link to="/dashboard/admin" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="setting"/></span>
            <span className="title">Admin</span>
          </div>
        </Link>
      )
    }else{
      return <span></span>
    }
  }
  render() {
    return (
      <div className="drawer-component">
      <span id="drawer-handle">=</span>
        <Link to="/dashboard">
          <div className="item" id="header">
            <span className="title">Dashboard</span>
          </div>
        </Link>
        <Link to="/dashboard/start" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="home"/></span>
            <span className="title">Home</span>
          </div>
        </Link>
        <Link to="/dashboard/explore" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="catalog"/></span>
            <span className="title">Explore</span>
          </div>
        </Link>
        

        <div className="bottom">
        {this.renderAdmin()}
          <Link to="/dashboard/setting" activeClassName="active">
            <div className="item">
              <span className="icon"><Icon name="setting"/></span>
              <span className="title">Settings</span>
            </div>
          </Link>

          <Link to="/signout" activeClassName="active">
            <div className="item">
              <span className="icon"><Icon name="logout"/></span>
              <span className="title">Logout</span>
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Drawer;