import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';

class VolunteerDetails extends Component{
    componentWillMount() {
        const Id = this.props.location.pathname.split('/').pop();
        this.props.fetchOneVolunteerChance(Id);
        console.log(hashHistory)
    }
    renderDetails(){
        if(this.props.details){
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
        return(
            <div>
            <button onClick={this.goBack}>go back</button>
                {this.renderDetails()}
            </div>
        )
    }
}

export default connect(({volunteer})=>{
    return {details: volunteer.event}
}, actions)(VolunteerDetails);