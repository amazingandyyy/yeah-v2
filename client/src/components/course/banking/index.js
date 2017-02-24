import React, {Component} from 'react';
import {Loader} from '../../widgets';
import Header from '../../header';
import {Link} from 'react-router';
import parse from 'csv-parse';

class Detail extends Component {
    componentWillMount() {
        // const csv = require('./data.csv');
        // let data = parse(csv).options[0];
        // console.log(data)
    }

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