import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import _ from 'lodash';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import Multiselect from 'react-widgets/lib/Multiselect';
import $ from 'jquery';
import renderHTML from 'react-render-html';

class AssistForm extends Component{
    constructor(props){
        super(props)
        this.state = {
            loadedMajor: false,
            loadedAgreement: false
        }
    }
    componentWillMount(){
        this.props.resetAssist();
    }
    componentWillMount() {
        this.props.resetAssist();
        this.props.getCollegesList();
        this.props.getUniversityList();
        this.props.fetchProfile();
    }
    
    renderCollegeOptions() {
        if(this.props.colleges){
            return (
                <div className="form-wrapper">
                <label>Transfer From</label>
                <div className="form-group">
                    <select
                        name="college"
                        className="yeah-input"
                        onChange={() => this.goToGetMajorList()}>
                        <option value=''>--- Choose an Institution ---</option>
                        {this.props.colleges.map(school=>{
                            if(school.code === this.props.profile.college.code){
                                return <option selected key={school.name} value={school.code}>{school.name}</option>    
                            }
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
                loadedMajor: true
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
                        <option value=''>--- Choose an Institution ---</option>
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
                loadedAgreement: true
            });
            this.props.getTransferRequirement(from, to, major);
        }
    }

    renderMajorOptions() {
        if(this.props.majors){
            return (
                <span>
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
                    {this.renderTransferRequirement()}
                </span>
            )
        } else if (this.state.loadedMajor && !this.props.major){
            return (
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                    <Loader style={{marginBottom: '40px'}}  size='30' />
                    <div>Sync data with assist.org</div>
                </div>
                )
        } else {
            return <span></span>
        }
    }

    renderTransferRequirement() {
        if(this.props.agreement){
            return (
                <div className="form-wrapper">
                <hr />
                    <label>Agreement</label>
                    <div className="form-group">
                    <div>
                        {renderHTML(`<pre style="font-size: 100%;">
                        ${this.props.agreement}
                        </pre>`)}
                    </div>
                    </div>
                </div>
            )
        } else if (this.state.loadedAgreement && !this.props.major){
            return (
                <div style={{textAlign: 'center', marginTop: '40px'}}>
                <hr />
                    <Loader style={{marginBottom: '30px'}} size='40' />
                    <div>Sync data with assist.org</div>
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
                <span>
                    {this.renderMajorOptions()}
                </span>
            </form>            
        )
        }else{
            return (
                <span style={{textAlign: 'center'}}>
                    <Loader style={{marginBottom: '40px'}} size='30' />
                    <div>Sync data with assist.org</div>
                </span>
            )
        }
    }
}

function mapStateToProps({profile, assist}){
    return { ...assist, profile }
}

AssistForm = reduxForm({form: 'assistForm'})(AssistForm);
AssistForm = connect(mapStateToProps, actions)(AssistForm);
export default AssistForm;