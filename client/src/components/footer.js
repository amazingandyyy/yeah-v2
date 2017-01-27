import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Footer extends Component {
    render() {
        return(
            <div className="footer">
                Copyright © 2017 Yeah Education Group All rights reserved.
            </div>
        )
    }
}

export default Footer;