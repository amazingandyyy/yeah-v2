import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                Copyright © 2017 <a target="_blank" href="http://amazingandyyy.github.io/">Amazingandyyy</a> All rights reserved
            </div>
        )
    }
}

export default Footer;