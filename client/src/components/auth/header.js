import React, { Component } from 'react';
import { Link } from 'react-router';

class Header extends Component {
    render() {
        return (
            <div className="header">
               <a href="#"><div className="logo">欧耶教育</div></a>
            </div>
        );
    }
}

export default Header;