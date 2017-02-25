import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';

class Catalog extends Component{
    render() {
        return(
            <div className="content">
                Catalog
            </div>
        )
    }
}

export default Catalog;