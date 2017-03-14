import React, {Component} from 'react';

import GoogleMapDetails from '../../../widgets/googleMapDetails';

import data from './data';
import CourseTemplate from './template';

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