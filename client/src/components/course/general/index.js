import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import {Loader} from '../../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../../widgets/googleMapDetails';
import {Link} from 'react-router';
import Header from '../../header';
import moment from 'moment';
import Footer from '../../footer';
import CourseTemplate from '../template';

class Template extends Component {
    componentWillMount() {
        if (this.props.props) {
            this.props = this.props.props;
        }
        const pathname = this.props.location.pathname;
        const Id = pathname
            .split('/')
            .pop();
        this
            .props
            .resetOneCourseChance();
        this
            .props
            .fetchOneCourseChance(Id);
    }

    render() {
        return (
            <div>
                <Header className="inverse"/>
                <CourseTemplate data={this.props.details}/>
                <Footer />
            </div>
        )
    }
}

export default connect(({course, auth}) => {
    return {details: course.event, isAdmin: auth.isAdmin}
}, actions)(Template);