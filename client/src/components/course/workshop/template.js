import React, {Component} from 'react';

import {Loader,Header,Footer} from '../../widgets';
import {hashHistory} from 'react-router';
import GoogleMapDetails from '../../widgets/googleMapDetails';
import{ YeahModal,SalesModal } from '../../widgets/modals';

import {Link} from 'react-router';
import moment from 'moment';

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
                    <p>Learn from industry leaders.</p>
                    <div className="video-wrapper">
                        <span className="outer"></span>
                        <video
                            src="https://s3-us-west-1.amazonaws.com/yeah-assets/medias/videos/intro_video.mp4"
                            type="video/mp4"
                            autoPlay="autoplay"
                            loop></video>
                    </div>
                    <div className="introduction">
                        <div className="section" style={{'textAlign': 'left'}}>
                            <div className="subtitle">Enjoy a Fruitful Workshop</div>
                            <div>马上就是转学季到来了，大家都会开始陆续收到offer。欧耶贤贤相信，交完申请等待offer的心情就如同高考完般放松。或许几周之后你们会有人狂喜，也会有人忧愁。但不管怎么样，那都是一个全新的开始。因为你马上就要面临全新的挑战——步入职场。</div>
                            <br/>
                            <div>很多转学生告诉我，都说转学后非常难找工作。因为一份好的毕业Offer通常来自你大三实习的Return offer，而大部分公司的实习秋招将在今年的八九月份（大三第一学期开学）结束。也就意味着大二结束的这个暑假就需要开始好好准备你的实习申请！  而转学生通常比大一大二的学生少一些资源，他们从大一就开始Networking ，参加各种info session。</div>
                            <br/>
                            <div>然而</div>
                            <div>你是否有想过你想找一份什么样的工作？</div>
                            <div>你是否了解每个行业所需要什么样的技能？</div>
                            <div>你是否开始准备你的简历？</div>
                            <br/>
                            <div>如果还没有，敬请来到我们特别为回馈转学客户免费开办的，“转学衔接” 年度职场讲座，为你转学之后的路途提供一点点帮助。</div> 
                        </div>
                        <div className="section instructor wider">
                            <div className="subtitle">
                                Amazing speakers
                            </div>
                            <div className="row">
                                {this.renderSpeackers()}
                            </div>
                        </div>
                        <div className="section wider">
                            <div className="container-fluid">
                               <div className="row">
                                <div className="col-sm-4 point">
                                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/courses.svg"/>
                                    <div className="intro">
                                        <div className="intro-title">
                                            2&nbsp;hrs
                                        </div>
                                        <div className="description">
                                            Enjoy 2 hours brilliant workshop and valuable discussion session
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
                                            Resume
                                        </div>
                                        <div className="description">
                                            Learn how take part in programs to power your resume and LinkedIn
                                        </div>
                                    </div>
                                </div>
                               </div> 
                            </div>
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
    renderSpeackers(){
        if(this.state.details.speackers){
            return this.state.details.speackers.map((speaker) => {
                return (
                    <div className="col-md-12" style={{'paddingBottom': '60px'}}>
                        <div className="avatar">
                            <img src={speaker.imageURL}/>
                        </div>
                        <div className="name">
                            <a className="underline" href={speaker.linkedinURL} target="_blank">
                                {speaker.firstName}
                                {speaker.lastName}
                            </a>
                        </div>
                        <div>{speaker.heighlightPosition.position}, {speaker.heighlightPosition.affiliation}</div>
                        <div>{speaker.industry} Expert</div>
                    </div>
                )
            })
        }else{
            <div style={{padding: '100px'}}>
            </div>
        }
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
        const {details} = this.state;
        if (details) {
            const {course} = details;
            return (
                <div className="takeaways">
                <div className="subtitle">What you will get from this workshop</div>
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
    renderEnrollNow(){
        const { details } = this.state;
        if (details) {
            const { course } = details;
            return (
                <div className="take_actions">
                <div className="card">
                    <div className="title">
                        {course.title}
                    </div>
                    <a href="https://www.eventbrite.com/e/32317127398" target="_blank">
                    <div className="action_button">
                        Sign Up Now
                    </div>
                    </a>
                    <div className="description">
                        2 hours workshop @<span>Haas, UC Berkeley</span>
                        <br/>
                        Learn how to get intership and succeed in the undustry
                    </div>
                </div>
                {this.state.showSalesModal && <YeahModal><SalesModal /></YeahModal>}
                </div>
            )
        }
    }
    render() {
        return (
            <div className="details-component">
                {this.renderLead()}
                {this.renderTakeaways()}
                {this.renderEnrollNow()}
            </div>
        )
    }
}

export default Detail;