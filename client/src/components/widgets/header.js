import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import $ from 'jquery';

class Header extends Component {
    constructor(props){
        super(props);
    }
    renderLinks(classNames){
        return (
            <div className={`${classNames}`}>
            <Link key='1' to="/">
                <div>Incubator</div>
            </Link>
            <Link key='2' to="/">
                <div>Accelerator</div>
            </Link>
            <Link key='3' to="/course/catalog">
                <div>Courses</div>
            </Link>
            <Link key='4' to="/news">
                <div>News</div>
            </Link>
            <Link key='5' to="/about">
                <div>About</div>
            </Link>
            <Link key='6' to="/dashboard">
                {this.props.authenticated && <span className="enter-button">Dashboard</span>}
                {!this.props.authenticated && <span className="enter-button">Join Members</span>}
            </Link>
            </div>
        )
    }
    render() {
        return (
            <div className="header-component">
            <nav className={this.props.className}>
                <div className="yeah-container">
                <div className="left-nav">
                    <a href="/">
                        <div className="logo">欧耶教育</div>
                    </a>
                </div>
                {this.renderLinks("right-nav hidden-md-down")}
                <div className="right-nav hidden-lg-up">
                    <span className="enter-button collapse-button">
                        <i className="fa fa-bars"></i>
                        <i className="fa fa-times"></i>
                        &nbsp;&nbsp;Menu
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
                $('nav').toggleClass('white', $d.scrollTop() >= 30);
                $('nav.fixed').removeClass('white', $d.scrollTop() >= 30);
            });

            $('.collapse-button').on('click', ()=>{
                $('.collapse-button').toggleClass('collapsed');
                $('.right-nav.hidden-lg-up').toggleClass('collapsed');
            })

            $('.fullscreen-nav').on('click', ()=>{
                $('.collapse-button').removeClass('collapsed');
                $('.right-nav.hidden-lg-up').removeClass('collapsed');
            })
      }
}

function mapStateToProps({auth}){
    return {
        authenticated: auth.authenticated
    }
}

export default connect(mapStateToProps, actions)(Header);