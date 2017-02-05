import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Header extends Component {
    renderSignButton(){
        return (
            <li className="nav-item pull-right">
                <Link className="nav-link" to="/dashboard"><button className="btn btn-primary">Dashboard</button></Link>
            </li>
        )
    }
    render() {
        return (
            <div className="header-component">
            <nav className="navbar  navbar-toggleable-xl navbar-light bg-faded">
            <Link className="navbar-brand" to="/">YEAH</Link>
            <div className="navbar-nav">
                {this.renderSignButton()}
            </div>
            </nav>
            </div>
        )
    }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default connect(mapStateToProps, actions)(Header)