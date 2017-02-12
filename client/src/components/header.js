import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router';
import $ from 'jquery';

class Header extends Component {
    renderLinks(classNames){
        return (
            <div className={`${classNames}`}>
            <Link key='1' to="/">
                <div>Application</div>
            </Link>
            <Link key='2' to="/">
                <div>Annual Program</div>
            </Link>
            <Link key='3' to="/">
                <div>Blog/News</div>
            </Link>
            <Link key='5' to="/">
                <div>Cases</div>
            </Link>
            <Link key='4' to="/">
                <div>About</div>
            </Link>
            <Link key='6' to="/dashboard">
                <span className="enter-button">Dashboard</span>
            </Link>
            </div>
        )
    }
    render() {
        return (
            <div className="header-component">
            <nav>
                <div className="nav-container">
                <div className="left-nav">
                    <Link to="/">
                        <div className="logo">YEAH</div>
                    </Link>
                </div>
                {this.renderLinks("right-nav hidden-md-down")}
                <div className="right-nav hidden-lg-up">
                    <span className="enter-button collapse-button">
                        <i className="fa fa-bars"></i>
                        <i className="fa fa-times"></i>
                    </span>
                {this.renderLinks("fullscreen-nav")}
                </div>
                </div>
            </nav>
            </div>
        )
    }
      componentDidMount() {
            const $d = $(document);
            $d.scroll(function() {
                console.log($d.scrollTop())
                $('nav').toggleClass('white', $d.scrollTop() >= 100);
            });

            $('.collapse-button').on('click', ()=>{
                $('.collapse-button').toggleClass('collapsed');
                $('.right-nav.hidden-lg-up').toggleClass('collapsed')
            })
      }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default connect(mapStateToProps, actions)(Header)