import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import $ from 'jquery';

class AssistForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            loadingMajor: false
        }
    }
    componentWillReceiveProps(nextProps){
        console.log(nextProps)
    }
    componentWillMount() {
        this.props.getCollegesList();
        this.props.getUniversityList();
    }
    
    renderCollegeOptions() {
        if(this.props.colleges){
            return (
                <div className="form-wrapper">
                <label>From</label>
                <div className="form-group">
                    <select
                        name="college"
                        className="yeah-input"
                        onChange={() => this.goToGetMajorList()}>
                        <option value='' selected='selected'>--- Choose an Institution ---</option>
                        {this.props.colleges.map(school=>{
                            return <option key={school.name} value={school.code}>{school.name}</option>
                        })}
                    </select>
                </div>
                </div>
            );
        }else{
            return <Loader style={{marginTop: '40px'}} />
        }
    }

    goToGetMajorList(){
        const from = $('select[name="college"]').val();
        const to = $('select[name="university"]').val();
        if(from && to){
            this.setState({
                loadingMajor: true
            })
            this.props.getMajorList(from, to);
        }
    }

    renderUniversityOptions() {
        if(this.props.universities){
            return (
                <div className="form-wrapper">
                <label>To</label>
                <div className="form-group">
                    <select
                        className="yeah-input"
                        name="university"
                        onChange={() => this.goToGetMajorList()}>
                        <option value='' selected='selected'>--- Choose an Institution ---</option>
                        {this.props.universities.map(school=>{
                            return <option key={school.name} value={school.code}>{school.name}</option>
                        })}
                    </select>
                </div>
                </div>
            );
        }else{
            return <Loader style={{marginTop: '40px'}} />
        }
    }

    goToGetTransferRequirement(){
        const from = $('select[name="college"]').val();
        const to = $('select[name="university"]').val();
        const major = $('select[name="major"]').val();
        if(from && to && major){
            this.setState({
                loadingMajor: true
            })
            this.props.getMajorList(from, to);
        }
    }

    renderMajorOptions() {
        if(this.props.majors){
            return (
                <div className="form-wrapper">
                    <label>Major in</label>
                    <div className="form-group">
                    <select
                        defaultValue={null}
                        name="major"
                        className="yeah-input"
                        required
                        onChange={() => this.goToGetTransferRequirement()}>
                        <option value={null}>--- Choose a Major ---</option>
                        {this.props.majors.map(major=>{
                            return <option key={major.name} value={major.code}>{major.name}</option>
                        })}
                    </select>
                    </div>
                </div>
            )
        } else if (this.state.loadingMajor && !this.props.major){
            return (
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <div>Sync data with assist.org</div>
                    <Loader style={{marginTop: '40px', size:'50'}} />
                </div>
                )
        } else {
            return <span></span>
        }
    }
        
    render() {
        if(this.props.colleges && this.props.universities){
            return(
            <form>
                <div className="flex-container">
                    <span className="flex-item">
                        {this.renderCollegeOptions()}
                    </span>
                    <span className="flex-item">
                        {this.renderUniversityOptions()}
                    </span>
                </div>
                {this.renderMajorOptions()}
            </form>            
        )
        }else{
            return (
                <span style={{textAlign: 'center'}}>
                    <div>Sync data with assist.org</div>
                    <Loader style={{marginTop: '40px', size:'50'}} />
                </span>
            )
        }
    }
}

function mapStateToProps({assist}){
    return {
        colleges: assist.colleges,
        universities: assist.universities,
        majors: assist.majors
    }
}

AssistForm = reduxForm({form: 'assistForm'})(AssistForm);
AssistForm = connect(mapStateToProps, actions)(AssistForm);
export default AssistForm;