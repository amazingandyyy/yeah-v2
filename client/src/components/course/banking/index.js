import React, {Component} from 'react';

import {Loader,Header,Footer} from '../../widgets';
import {hashHistory} from 'react-router';

import {Link} from 'react-router';
import moment from 'moment';
import data from './data';
import CourseTemplate from '../template';

class Detail extends Component {
    render() {
        return (
            <div>
                <CourseTemplate data={data} />
            </div>
        )
    }
}

export default Detail;