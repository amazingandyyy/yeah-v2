import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';

class VolunteerDetails extends Component{
    componentWillMount() {
        const Id = this.props.location.pathname.split('/').pop();
        this.props.fetchOneVolunteerChance(Id);
    }
    renderDetails(){
        if(this.props.details){
            let colorSetting = this.props.details.colorSetting || this.props.location.query.colorSetting;
            let thumbnail = this.props.details.thumbnail || this.props.location.query.thumbnail;
            return(
                <h1>
                    title: {this.props.details.title}
                </h1>
            )
        }
        return <Loader />
    }
    goBack(){
        hashHistory.goBack()
    }
    render() {
        return(<span>
                <div className="header"><span className="backBtn" onClick={this.goBack}><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</span></div>
                <div className="content">
                    {this.renderDetails()}
                </div>
            </span>)
    }
}

export default connect(({volunteer})=>{
    return {details: volunteer.event}
}, actions)(VolunteerDetails);