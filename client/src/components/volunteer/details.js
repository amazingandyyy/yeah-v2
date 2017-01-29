import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';

class VolunteerDetails extends Component{
    componentWillMount() {
        const pathname = this.props.location.pathname;
        const Id = pathname.split('/').pop()
        this.props.fetchOneVolunteerChance(Id);
    }

    renderTags(){
        const { details } = this.props;
        let colorSetting = details.colorSetting || this.props.location.query.colorSetting;
        return details.tags.map(
            tag => {
                return (
                    <span className="tag" style={{background: colorSetting}}>
                        #{tag}
                    </span>
                );
        })}

    renderDetails(){
        const { details } = this.props;
        console.log('details: ', details);
        if(details){
            let colorSetting = details.colorSetting || this.props.location.query.colorSetting;
            let thumbnail = details.thumbnail || this.props.location.query.thumbnail;
            return(
                <span>
                <div className="context" style={{backgroundImage: `url(${thumbnail})`}}>
                    <div className="overlay" style={{background: colorSetting}}></div>
                    <div className="section-card">
                        <div className="title-xs" style={{color: colorSetting}}>Volunteer Program</div>
                        <div className="title-xl">{details.title}</div>
                        <div className="section">
                            {this.renderTags()}
                        </div>
                        <div className="section">
                            <div className="title" style={{color: colorSetting}}>Time & Date</div>
                            <div className="time">{details.date}</div>
                        </div>
                        <div className="section">
                            <div className="title" style={{color: colorSetting}}>Locations & Address</div>
                            <div className="location">{details.location}</div>
                        </div>
                        <div className="section">
                            <div className="title" style={{color: colorSetting}}>description</div>
                            <div className="description">
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                            </div>
                        </div>
                        <div className="section">
                            <div className="title" style={{color: colorSetting}}>features</div>
                            <div className="description">
                                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</p>
                            </div>
                        </div>
                        <div className="organizor-bio">
                            <img src={'http://bit.ly/2gKAQqy'} alt="LOGO" className="photo"/>
                            <h2>American Red Cross</h2>
                            <p>Organizor of: {details.title}</p>
                        </div>
                        <div className="full-section">
                        <div className="title">Participants Stories</div>
                        <div className="h-scrollable no-border">
                            <div className="card comment">
                                <div className="body"><div className="card-title">ahdslfjkhdslfhsdj</div></div>
                            </div>
                            <div className="card comment">
                                <div className="body"><div className="card-title">ahdslfjkhdslfhsdj</div></div>
                            </div>
                            <div className="card comment">
                                <div className="body"><div className="card-title">ahdslfjkhdslfhsdj</div></div>
                            </div>
                            <div className="card comment">
                                <div className="body"><div className="card-title">ahdslfjkhdslfhsdj</div></div>
                            </div>
                            <div className="card comment">
                                <div className="body"><div className="card-title">ahdslfjkhdslfhsdj</div></div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div style={{clear:'both'}}></div>
                </span>
            )
        }
        return <Loader />
    }
    goBack(){
        hashHistory.goBack()
    }
    goEdit() {
        const uri = this.props.location.pathname;
        const query = this.props.location.query;
        hashHistory.push({pathname: `${uri}/edit`, query})
    }
    renderRightBtn() {
        if(this.props.isAdmin){
            return (<span className="rightBtn" onClick={this.goEdit.bind(this)}>Edit</span>)
        }
        return(<span className="rightBtn">Like</span>)
    }
    render() {
        return(<span className="details-component">
                <div className="header">
                    <span className="leftBtn" onClick={this.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</span>
                    {this.renderRightBtn()}
                </div>
                <div className="content">
                    {this.renderDetails()}
                </div>
            </span>)
    }
}

export default connect(({volunteer, auth})=>{
    return {details: volunteer.event, isAdmin: auth.isAdmin}
}, actions)(VolunteerDetails);