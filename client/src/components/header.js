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
            <div className="header">
                <div className="container">
                    <div className="logo-text">YEAH</div>
                    <div className="icon-genius"></div>
                </div>
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