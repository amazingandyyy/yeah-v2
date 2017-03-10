import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader, Space, ComponentLeader } from '../../widgets';
import { Link } from 'react-router';
import moment from 'moment';
import {Introduction, teamMembers } from './data';
import Particles from 'react-particles-js';

class About extends Component{
    renderTeam(){
        return (
            <div className="section team">
                <div className="title">Who are we?</div>
                <hr/>
                {this.renderMembers()}
            </div>
        )
    }
    renderMembers() {
        if(teamMembers){
            return teamMembers.map((member, index) => {
                return (<div className="member" key={index}>
                        <div className="avatar">
                            <img src={member.imageURL}/>
                        </div>
                        <div className="name">
                            <a className="underline" href={member.linkedinURL} target="_blank">
                                {member.name}
                            </a>
                        </div>
                        <div className="position">{member.position}</div>
                    </div>)
            })
        }
    }
    renderIntroduction(){
        return (
            <div className="section introduction">
                <div className="title">What is Yeah?</div>
                <hr/>
                <div className="description">
                    {Introduction}
                </div>
            </div>
        )
    }

    renderContactUs(){
        return (
            <div className="take_actions">
            <div className="card">
                <div className="title">
                    Contact / Join Our team
                </div>
                <a href="mailto:yeaheducation@gmail.com?Subject=Join%20the%20Yeah%20Rocket" target="_top">
                    <div className="action_button">
                        Contact via Email
                    </div>
                </a>
                <div className="description">
                    amazing team @<span>UC Berkeley</span>
                    <br/>
                    We are <span className="underline">hiring *web developer, *designer and *market expert&internship</span>
                </div>
            </div>
            </div>
        )
    }
    render() {
        return(
            <div>
                <Header className="fixed"/>
                <ComponentLeader title="About" />
                <div className="about-component">
                    {this.renderIntroduction()}
                    {this.renderTeam()}
                </div>
                {this.renderContactUs()}
                <Footer />
            </div>
        )
    }
}

export default About;