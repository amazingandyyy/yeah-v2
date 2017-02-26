import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Loader} from '../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../widgets/googleMapDetails';
import {Link} from 'react-router';
import Header from '../header';
import moment from 'moment';
import Footer from '../footer';

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
                    <p>From zero to hero in {course.totalWeeks}&nbsp; weeks.</p>
                    <div className="video-wrapper">
                        <span className="outer"></span>
                        <video
                            src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/videos/intro_video.mp4"
                            type="video/mp4"
                            autoPlay="autoplay"
                            loop></video>
                    </div>
                    <div className="introduction">
                        <div className="section">
                            <div className="title">Valuable course content.</div>
                            {course.overview}
                        </div>
                        <div className="section wider">
                            <div className="container-fluid">
                               <div className="row">
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/courses.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            {course.totalWeeks}&nbsp;weeks
                                        </div>
                                        <div className="description">
                                            Take fruitful lectures in Berkeley Campus and materials Online
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/projects.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            Private Channel
                                        </div>
                                        <div className="description">
                                            Access to private channel for intership and career questions periodly
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/certificate.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            Certificates
                                        </div>
                                        <div className="description">
                                            Complete prgram to highlight your new skills on your resume and LinkedIn
                                        </div>
                                    </div>
                                </div>
                               </div> 
                            </div>
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
        // console.log('details: ', details);
        if (details) {
            const {course, instructor} = details;
            return (
                <div className="syllabus">
                        {this.renderSyllabusCards(course)}
                </div>
            )
        }
    }
    renderSyllabusCards({heighlights, startingDate, hoursPerWeek}) {
        let startingDateMoment = moment(startingDate);
        return heighlights.map((heighlight, index) => {
            const date = startingDateMoment.add(index, 'weeks').format('dddd, MMMM Do, YYYY');
            return (
                <div className="syllabus-card" key={index}>
                    <div className="index-tag">
                        Class {index+1}
                    </div>
                    <div className="title">
                        {heighlight.title}
                    </div>
                    <div className="date">
                        <i className="fa fa-calendar" aria-hidden="true"></i>{date}
                    </div>
                    <hr/>
                    <div className="description">
                        {heighlight.description}
                    </div>
                    <br/>
                    <div className="info">
                        <i className="fa fa-newspaper-o" aria-hidden="true"></i>Material Preview: {hoursPerWeek/2} hours
                    </div>
                    <div className="info">
                        <i className="fa fa-university" aria-hidden="true"></i>Berkeley Campus Lecture: {hoursPerWeek} hours
                    </div>
                    <div className="info">
                        <i className="fa fa-cubes" aria-hidden="true"></i>Homework/Project: {hoursPerWeek/2} hours
                    </div>
                </div>
            )
        })
    }
    renderTakeaways(){
        const {details} = this.props;
        if (details) {
            const {course} = details;
            return (
                <div className="takeaways">
                <h1 className="title">What you will get from this class.</h1>
                <ol className="check">
                   {this.renderTakeawayCardss(course.takeaways)}
                </ol>
                </div>
            )
        }
    }
    renderTakeawayCardss(takeaways) {
        return takeaways.map((takeaway, index) => {
            return (
                <li className="takeaway" key={index}>
                    {takeaway}
                </li>
            )
        })
    }
    render() {
        return (
            <div>
                <Header className="fixed inverse"/>
                <div className="details-component">
                    {this.renderLead()}
                    {this.renderSyllabus()}
                    {this.renderTakeaways()}
                </div>
                <Footer />
            </div>
        )
    }
}

export default connect(({course, auth}) => {
    return {details: course.event, isAdmin: auth.isAdmin}
}, actions)(Detail);