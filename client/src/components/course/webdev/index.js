import React, {Component} from 'react';

import {Loader} from '../../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../../widgets/googleMapDetails';

import {Link} from 'react-router';
import Header from '../../header';
import moment from 'moment';
import Footer from '../../footer';
import data from './data';
import CourseTemplate from '../template';

class Detail extends Component {
    render() {
        return (
            <div>
                <Header className="inverse"/>
                    <CourseTemplate data={data} />
                <Footer />
            </div>
        )
    }
}

export default Detail;