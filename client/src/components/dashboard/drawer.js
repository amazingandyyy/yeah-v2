import React, {Component} from 'react';
import { Link } from 'react-router';
import { Icon } from '../widgets';
import { connect } from 'react-redux';

class Drawer extends Component {
  renderAdmin() {
    if(this.props.isAdmin){
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
      <span id="drawer-handle">
        <i className="fa fa-caret-right" aria-hidden="true"></i>
        <i className="fa fa-caret-left" aria-hidden="true"></i>
      </span>
        <Link to="/">
          <div className="item" id="header">
            <span className="title">YEAH
            {!this.props.isAdmin && <small> student</small>}
            {this.props.isAdmin && <small> admin</small>}
            </span>
          </div>
        </Link>
        <Link to="/dashboard/start" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="home"/></span>
            <span className="title">Profile</span>
          </div>
        </Link>
        <Link to="/dashboard/app" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="catalog"/></span>
            <span className="title">Application</span>
          </div>
        </Link>
        <Link to="/dashboard/courses" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="catalog"/></span>
            <span className="title">Courses</span>
          </div>
        </Link>
        <Link to="/dashboard/volunteers" activeClassName="active">
          <div className="item">
            <span className="icon"><Icon name="catalog"/></span>
            <span className="title">Volunteers</span>
          </div>
        </Link>
        
        <div className="bottom">
          <Link to="/dashboard/admin" activeClassName="active">
            <div className="item">
              <span className="icon"><Icon name="setting"/></span>
              <span className="title">Admin</span>
            </div>
          </Link>

          <Link to="/dashboard/setting" activeClassName="active">
            <div className="item">
              <span className="icon"><Icon name="setting"/></span>
              <span className="title">Settings</span>
            </div>
          </Link>

          <Link to="/auth/signout" activeClassName="active">
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
function mapStateToProps({auth}){
  return {
    isAdmin: auth.isAdmin
  }
}

export default connect(mapStateToProps)(Drawer);

// <Link to="/dashboard/ucinfo" onClick={()=>{location.reload()}} activeClassName="active">
//     <div className="item">
//       <span className="icon"><Icon name="catalog"/></span>
//       <span className="title">UC Stats</span>
//     </div>
//   </Link>

// <Link to="/dashboard/assist" activeClassName="active">
//   <div className="item">
//     <span className="icon"><Icon name="catalog"/></span>
//     <span className="title">Major Requirement</span>
//   </div>
// </Link>