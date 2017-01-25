import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';

class Admin extends Component {
  componentWillMount() {
    hashHistory.push('/dashboard/admin/volunteer')
  }
  
  render() {
    return (
      <div className="display-componet admin-component">
          <div className="header">Admin</div>
          <div className="content">
          <div className="container">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="/dashboard/admin/volunteer">Volunteer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="/dashboard/admin/course">Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" activeClassName="active" to="/dashboard/admin/intership">Intership</Link>
              </li>
            </ul>
            <div className="card">
              { this.props.children }
            </div>
          </div>
          </div>
        </div>
    );
  }
};

export default Admin;