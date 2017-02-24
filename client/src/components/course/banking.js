import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';
import GoogleMapDetails from '../widgets/googleMapDetails';

class Banking extends Component{
    render() {
        return(
            <div className="content">
                Banking
            </div>
        )
    }
}

export default Banking;