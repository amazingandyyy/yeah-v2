import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import $ from 'jquery';

class Header extends Component {
    render() {
        return (
            <div className="header-component">
            <nav>
                <div className="container">
                    <div className="left-nav">
                        <Link to="/">
                            <div className="logo">YEAH</div>
                        </Link>
                    </div>
                    <div className="right-nav">
                        <Link to="/dashboard">
                            <div>Seasonal Program</div>
                        </Link>
                        <Link to="/dashboard">
                            <div>Annual Program</div>
                        </Link>
                        <Link to="/dashboard">
                            <div>Courses</div>
                        </Link>
                        <Link to="/dashboard">
                            <div>Blog</div>
                        </Link>
                        <Link to="/dashboard">
                            <div className="enter-button">Dashboard</div>
                        </Link>
                    </div>
                </div>
            </nav>
            </div>
        )
    }
      componentDidMount() {
          const $d = $(document);
        $d.scroll(function() {
            // console.log($d.scrollTop())
            $('nav').toggleClass('white', $d.scrollTop() >= 300);
        });
      }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default connect(mapStateToProps, actions)(Header)