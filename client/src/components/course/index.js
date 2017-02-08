import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Loader } from '../widgets';
import { hashHistory } from 'react-router';

import Detial from './detail';

class CourseDetails extends Component{
    goBack(){
        this.props.deleteOneCourseGoback();
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
        return(<span>
                <div className="header">
                    <span className="leftBtn" onClick={this.goBack.bind(this)}><i className="fa fa-chevron-left" aria-hidden="true"></i>Back</span>
                    {this.renderRightBtn()}
                </div>
                <Detial props={this.props}/>
            </span>)
    }
}

export default connect(({ course, auth })=>{
    return { isAdmin: auth.isAdmin }
}, actions)(CourseDetails);