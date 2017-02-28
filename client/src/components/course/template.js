import React, {Component} from 'react';

import {Loader} from '../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../widgets/googleMapDetails';
import{ YeahModal,SalesModal } from '../widgets/modals';

import {Link} from 'react-router';
import Header from '../header';
import moment from 'moment';
import Footer from '../footer';

class Detail extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            details: props.data,
            showSalesModal: false
        }
    }
        
    openSalesModal(){
        this.setState({
            showSalesModal: true
        })
    }

    renderMap() {
        const {details} = this.state;

        if (details) {
            // console.log('detail.location', details.location);
            return <GoogleMapDetails geocoding={details.location.location}/>
        } else {
            return <Loader/>
        }
    }

    renderLead() {
        const {details} = this.state;
        if (details) {
            const {course, instructor} = details;
            return (
                <div className="lead">
                    <div className="program">Career Training Program</div>
                    <h1 className="title">{course.title}</h1>
                    <p>From zero to hero in {course.totalWeeks}&nbsp;weeks.</p>
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
                            <div className="subtitle">Valuable course content.</div>
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
                            <div className="subtitle">
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
        return (
            <div style={{padding: '100px'}}>
                <Loader/>
            </div>
        )
    }

    renderSyllabus() {
        const {details} = this.state;
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
        return heighlights.map((heighlight, index) => {
            const startingDateMoment = moment(startingDate);
            let date = startingDateMoment.add(index, 'weeks').format('dddd, MMMM Do, YYYY');
            // console.log(date)
            return (
                <div className="syllabus-card" key={heighlight.title}>
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
        const { details } = this.state;
        if (details) {
            const { course } = details;
            return (
                <div className="takeaways">
                <div className="subtitle">What you will get from this class</div>
                <ol className="check">
                   {this.renderTakeawayCards(course.takeaways)}
                </ol>
                </div>
            )
        }
    }
    renderTakeawayCards(takeaways) {
        return takeaways.map((takeaway, index) => {
            return (
                <li className="takeaway" key={index}>
                    {takeaway}
                </li>
            )
        })
    }
    renderTakeActions(){
        const { details } = this.state;
        if (details) {
            const { course } = details;
            return (
                <div className="take_actions">
                <div className="card">
                    <div className="title">
                        {course.title}
                    </div>
                    <div className="action_button" onClick={this.openSalesModal.bind(this)}>
                        Take this course Now
                    </div>
                    <div className="description">
                        {course.hoursPerWeek} hours X {course.totalWeeks} weeks @<span>UC Berkeley</span>
                        <br/>
                        Get certification and internship after completing course.
                    </div>

                </div>
                </div>
            )
        }
    }
    render() {
        return (
            <div className="details-component">
                {this.renderLead()}
                {this.renderSyllabus()}
                {this.renderTakeaways()}
                {this.renderTakeActions()}
                {this.state.showSalesModal && <YeahModal><SalesModal /></YeahModal>}
            </div>
        )
    }
}

export default Detail;