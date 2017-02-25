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

    renderLead() {
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
                            loop></video>
                    </div>
                    <div className="introduction">
                        <div className="section">
                            <div className="title">Valuable course content.</div>
                            {course.overview}
                        </div>
                        <div className="section instructor">
                            <div className="title">
                                Lead by Professional instructor
                            </div>
                            <div className="avatar">
                                <img src={instructor.imageURL}/>
                            </div>
                            <div className="name">
                                {instructor.firstName}
                                {instructor.lastName}
                            </div>
                            <div>{instructor.currentPosition.position}, {instructor.currentPosition.affiliation}</div>
                            <div>{instructor.previousPosition.position}, {instructor.previousPosition.affiliation}</div>
                        </div>
                    </div>
                </div>
            )
        }
        return <Loader/>
    }

    renderSyllabus() {
        const {details} = this.props;
        console.log('details: ', details);
        if (details) {
            const {course, instructor} = details;
            return (
                <div className="syllabus" style={{'background': 'rgb(244, 244, 239)'}}>
                    <div className="title">Weekly Syllabus</div>
                    <div className="h-scrollable no-border" style={{'background': 'rgb(244, 244, 239)'}}>
                        {this.renderSyllabusCards(course.heighlights)}
                    </div>
                </div>
            )
        }
    }
    renderSyllabusCards(heighlights) {
        return heighlights.map(heighlight => {
            return (
                <div className="card comment" key={heighlight.title}>
                    <div className="title">
                        {heighlight.title}
                    </div>
                    <hr/>
                    <div className="body">
                        {heighlight.description}
                    </div>
                </div>
            )
        })
    }
    render() {
        return (
            <div>
                <Header className="inverse"/>
                <div className="details-component">
                    {this.renderLead()}
                    {this.renderSyllabus()}
                </div>
            </div>
        )
    }
}

export default connect(({course, auth}) => {
    return {details: course.event, isAdmin: auth.isAdmin}
}, actions)(Detail);