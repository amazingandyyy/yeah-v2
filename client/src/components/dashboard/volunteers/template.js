import React, {Component} from 'react';

import {Link} from 'react-router';
import moment from 'moment';
import Particles from 'react-particles-js';

import {Loader,Header,Footer} from '../../widgets';
import GoogleMapDetails from '../../widgets/googleMapDetails';
import{ YeahModal,SalesModal } from '../../widgets/modals';
import SignUpModal from '../../widgets/modals/signupForm';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            details: props.data,
            showVolunteerModal: false
        }
    }
        
    openSalesModal(){
        this.setState({
            showVolunteerModal: true
        })
    }

    renderMap() {
        const {details} = this.state;
        if (details) {
            return <GoogleMapDetails geocoding={details.location.coord}/>
        } else {
            return <Loader/>
        }
    }

    renderLead() {
        const {details} = this.state;
        if (details) {
            return (
                <div className="lead">
                    <div className="program">Featured Volunteer Program</div>
                    <h1 className="title">{details.title || details.position}</h1>
                    <p>Do volunteer to earn certifications and experiences</p>
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
                            <div className="subtitle">Position of {details.position}</div>
                            Your duties are {details.duties}
                        </div>
                        <div className="section wider">
                            <div className="container-fluid">
                               <div className="row">
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/courses.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            Volunteer Time
                                        </div>
                                        <div className="description">
                                            {details.time}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/projects.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            Location
                                        </div>
                                        <div className="description">
                                            {details.location && details.location.address}
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
                                            Complete prgram to earn a volunteer certification.
                                        </div>
                                    </div>
                                </div>
                               </div> 
                            </div>
                        </div>
                        <div className="section instructor">
                            <div className="subtitle">
                                Host by experienced Organization
                            </div>
                            {this.renderOrganization(details.organization)}
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

    renderOrganization(organization){
        if(organization){
                return (
                    <div className="profile">
                        <div className="name">
                            <a className="underline" href={organization.url} target="_blank">
                                {organization.name}
                            </a>
                        </div>
                        <div className="bio">
                            {organization.introduction}
                        </div>
                    </div>
                )
        }

    }

    renderPreq() {
        const {details} = this.state;
        if (details) {
            return (
                <div className="syllabus">
                    <div className="syllabus-card">
                        <div className="index-tag">
                            notes
                        </div>
                        <div className="title">
                            Complete Prerequisite
                        </div>
                        <hr/>
                        <div className="description">
                            {details.prerequisite}
                        </div>
                    </div>
                </div>
            )
        }
    }
    renderTakeaways(){
        const { details } = this.state;
        if (details) {
            return (
                <div className="takeaways">
                <div className="subtitle">What you will get from this chance</div>
                <ol className="check">
                   {this.renderTakeawayCards(details.takeaways)}
                </ol>
                </div>
            )
        }
    }
    renderTakeawayCards(takeaways) {
        return takeaways.map((takeaway, index) => {
            if(takeaway && takeaway.length > 1){
                return (
                    <li className="takeaway" key={index}>
                        {takeaway}
                    </li>
                )
            }
        })
    }
    attemptRegister(){
        if(window.confirm("Click OK if you complete all the prerequisites.")){
            this.openSalesModal()
        }
    }
    renderRegisterNow(){
        const { details } = this.state;
        if (details) {
            return (
                <div className="take_actions">
                <Particles/>
                <div className="card">
                    <div className="title">
                        {details.title || details.position}
                    </div>
                    <div className="points">
                        <div><i className="fa fa-users"></i>Limited positions</div>
                        <div><i className="fa fa-calendar-check-o"></i>Volunteer time is {details.time}</div>
                        <div><i className="fa fa-location-arrow"></i>{details.location.address}</div>
                        <div><i className="fa fa-certificate"></i>Certification guarantee</div>
                    </div>
                    <div className="action_button" onClick={this.attemptRegister.bind(this)}>
                        Sign Up Now
                    </div>
                    <div className="description">
                        {details.applyMethod}
                        <br/>
                        Get certification after completing this volunter.
                    </div>
                </div>
                </div>
            )
        }
    }
    render() {
        return (<div className="details-component">
                {this.renderLead()}
                {this.renderPreq()}
                {this.renderTakeaways()}
                {this.renderRegisterNow()}
                {this.state.showVolunteerModal && <YeahModal><SignUpModal /></YeahModal>}
            </div>)
    }
}

export default Detail;