import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';

class VolunteerEditDetails extends Component{
    componentWillMount() {
        const pathname = this.props.location.pathname;
        const Id = pathname.split('/')[pathname.split('/').length-2]
        this.props.fetchOneVolunteerChance(Id);
    }
    renderDetails(){
        const { details } = this.props;
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
                            <div className="title">Time & Date</div>
                            <div className="time" style={{color: colorSetting}}>
                            </div>
                        </div>
                        <div className="section">
                            <div className="title">Locations & Address</div>
                            <div className="time" style={{color: colorSetting}}>
                            </div>
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
    goSave() {
        const pathname = this.props.location.pathname;
        const Id = pathname.split('/')[pathname.split('/').length-2]
        hashHistory.goBack();
        // this.props.saveOneVolunteerChance(Id, 'data');
    }
    goDelete() {
        const pathname = this.props.location.pathname;
        const Id = pathname.split('/')[pathname.split('/').length-2]
        if(window.confirm(`Are you sure you want to delete this event? (It cannot be recovered)`)){
            this.props.deleteOneVolunteerChance(Id);
        }
    }
    render() {
        return(<span className="details-component edit-mode">
                <div className="header">
                    <span className="mode-tag">editting</span>
                    <span className="leftBtn" onClick={this.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i>Cancel</span>
                    <span className="rightBtn save-success" onClick={this.goSave.bind(this)}>Save</span>
                    <span className="rightBtn delete-danger" onClick={this.goDelete.bind(this)}>Delete</span>
                </div>
                <div className="content">
                    {this.renderDetails()}
                </div>
            </span>)
    }
}

export default connect(({volunteer})=>{
    return {details: volunteer.event}
}, actions)(VolunteerEditDetails);