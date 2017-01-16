import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';

class Header extends Component {
    renderSignButton(){
        if (this.props.authenticated){
            return (
                <li className="nav-item">
                    <Link className="nav-link" to="/signout">Signout</Link>
                </li>
            )
        }else{
            return (
                [
                    <li className="nav-item active" key="1">
                        <Link to="/signin" className="nav-link">Signin</Link>
                    </li>,
                    <li className="nav-item" key="2">
                        <Link to="/signup" className="nav-link">SignUp</Link>
                    </li>
                ]
            )
        }
    }
    render() {
        return (
            <div className="header-component">
            <nav className="navbar  navbar-toggleable-xl navbar-light bg-faded">
            <Link className="navbar-brand" to="/">YEAH</Link>
            <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/signin">Sign in</Link>
                <Link className="nav-item nav-link" to="/signup">Sign up</Link>
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