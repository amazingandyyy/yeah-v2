import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Loader} from '../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../widgets/googleMapDetails';
import {Link} from 'react-router';
import Header from '../header';

class Detail extends Component {
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

    renderMap() {
        const {details} = this.props;

        if (details) {
            console.log('detail.location', details.location);
            return <GoogleMapDetails geocoding={details.location.location}/>
        } else {
            return <Loader/>
        }
    }

    renderDetails() {
        const {details} = this.props;
        console.log('details: ', details);
        if (details) {
            const {course, instructor} = details;
            return (
                <div className="lead">
                    <div className="program">Career Training Program</div>
                    <h1 className="title">{course.title}</h1>
                    <p>From zero to hero in 4 weeks.</p>
                    <div className="video-wrapper">
                        <span className="outer"></span>
                        <video
                            src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/videos/intro_video.mp4"
                            type="video/mp4"
                            autoPlay
                            loop
                        ></video>
                    </div>
                    <div className="introduction">
                        {course.overview}
                    </div>

                </div>
            )
        }
        return <Loader/>
    }
    render() {
        return (
            <div>
                <Header className="inverse"/>
                <div className="details-component">
                    {this.renderDetails()}
                </div>
            </div>
        )
    }
}

export default connect(({course, auth}) => {
    return {details: course.event, isAdmin: auth.isAdmin}
}, actions)(Detail);