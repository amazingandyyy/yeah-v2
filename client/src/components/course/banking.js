import React, {Component} from 'react';
import {Loader} from '../widgets';
import Header from '../header';
import {Link} from 'react-router';

class Detail extends Component {
    componentWillMount() {}

    renderDetails() {
        return (
            <div className="details-component">
                hihihi
            </div>
        )
    }
    render() {
        return (
            <div>
                <Header className="inverse"/>
                <div className="content">
                    {this.renderDetails()}
                </div>
            </div>
        )
    }
}

export default Detail;