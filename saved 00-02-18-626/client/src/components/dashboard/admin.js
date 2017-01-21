import React, { Component } from 'react';
import { Link } from 'react-router';

class Admin extends Component {
  
  render() {
    return (
      <div className="display-componet">
          <div className="header">Admin</div>
          <div className="content">
          <div className="container">
            <ul className="nav justify-content-end">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/admin/volunteer">Volunteer</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard/admin/cources">Cources</Link>
              </li>
            </ul>
            { this.props.children }
          </div>
          </div>
        </div>
    );
  }
};

export default Admin;