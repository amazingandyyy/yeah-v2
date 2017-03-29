import React, {Component} from 'react';
import { CourseList } from '../index';
import { Header, Footer, Loader, Space, ComponentLeader } from '../../widgets';
import { Link } from 'react-router';
import moment from 'moment';
import {Introduction, teamMembers } from './data';
import Particles from 'react-particles-js';
import{ YeahModal,SalesModal } from '../../widgets/modals';

class Accelerator extends Component{
    constructor(props) {
        super(props);
        
        this.state = {
            showSalesModal: false
        }
    }
        
    openSalesModal(){
        this.setState({
            showSalesModal: true
        })
    }
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
                <div className="title">What is Yeah Accelerator?</div>
                <hr/>
                <div className="description">
                    {Introduction}
                </div>
            </div>
        )
    }

    renderEnrollNow(){
        return (
            <div className="take_actions">
            <div className="card">
                <div className="title">
                    Apply / Join Accelerator Program
                </div>
                <div className="action_button" onClick={this.openSalesModal.bind(this)}>
                    Apply Now
                </div>
                <div className="description">
                    professional team @<span>UC Berkeley</span>
                    <br/>
                    Annually limited to <span className="underline">50 college students</span>
                </div>
            </div>
            </div>
        )
    }
    render() {
        return(
            <div>
                <Header className="fixed"/>
                <ComponentLeader title="Accelerator" />
                <div className="about-component">
                    {this.renderIntroduction()}
                </div>
                {this.renderEnrollNow()}
                <Footer />
                {this.state.showSalesModal && <YeahModal><SalesModal /></YeahModal>}
            </div>
        )
    }
}

export default Accelerator;