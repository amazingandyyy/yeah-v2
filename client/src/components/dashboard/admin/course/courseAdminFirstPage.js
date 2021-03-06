import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';

import '../../../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';
import GoogleMapSearch from '../../../widgets/googleMapSearch';

class CourseAdminFirstPage extends Component{
    constructor(props){
        super(props);

        this.state = { }
    } 

    handleFormSubmit(data) {
        // Getting data object
        console.log('data: ', data);
        //show the time
        // console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        // console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        // this.props.createCourseResource(data);
    }

    renderMultiselect ({input, data}) {
        return (
            <span style={{width: '100%'}}>
                <Multiselect 
                    className="yeah-input"
                    {...input}
                    onBlur={()=> input.onBlur()}
                    value={input.value || []}
                    data={data}
                />
            </span>
        );
    }

    renderDatePicker({input, ...rest}){
        return(
            <span className="flex-item">
                <DateTimePicker time={false} {...rest} onChange={input.onChange} placeholder='Select Starting Date'/>
            </span>    
        );
    }

    renderTimePicker({input, ...rest}){
        return(
            <span className="flex-item">
                <DateTimePicker calendar={false} {...rest} onChange={input.onChange} placeholder='Select Starting Time'/>
            </span>    
        );
    }

    render(){
        // Localize the time
        momentLocalizer(moment);

        const tagList =['Business','Computer Science','Enconomics','Chemistry','Physics','Phycology','English','Engineering', 'History','Music','Math'];
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (
            <form
                onSubmit={this.props.handleSubmit}
            >
            <div className="form-subtitle-bg">Instructor Information</div>
                <div className="form-wrapper">
                    <label>Instructor Email*</label>
                    <div className="form-group">
                    <Field 
                        type="email" 
                        name="email" 
                        component="input" 
                        className="yeah-input"
                        placeholder="Instructor's Email Address"
                        required
                    />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Instructor Full Name*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="firstName" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Instructor's First Name"
                            required
                        />
                        <Field 
                            type="type" 
                            name="lastName" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Instructor's Last Name"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Instructor Phone Number*</label>
                    <div className="form-group">
                        <Field
                            type="phone" 
                            name="phone" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Instructor's Phone Number"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Current Affiliation & Position*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="currentAffiliation" 
                            component="input" 
                            className="yeah-input"
                            placeholder="UC Berkeley / KPMG / Google"
                            required                            
                        />
                        <Field 
                            type="type" 
                            name="currentPosition" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Junior / Data Analyst / Software Engineer Internship"
                            required                            
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Previous Affiliation & Position*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="previousAffiliation" 
                            component="input" 
                            className="yeah-input"
                            placeholder="KPMG / Google"
                            required                            
                        />
                        <Field 
                            type="type" 
                            name="previousPosition" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Data Analyst / Software Engineer Internship"
                            required                            
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>LinkedIn*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="linkedinURL" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Instructor's LinkedIn URL"
                            required
                        />
                    </div>
                </div>
                
                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                    <button type="submit" disabled={ !dirty } className="flex-item btn btn-primary">Next</button>
                </div>
            </form>
            
        )
    }
}


CourseAdminFirstPage = reduxForm({
    form: 'createCourseResource',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(CourseAdminFirstPage);

export default connect(null, actions)(CourseAdminFirstPage);