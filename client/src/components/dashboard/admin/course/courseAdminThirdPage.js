import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import DropdownList from 'react-widgets/lib/DropdownList';
import SelectList from 'react-widgets/lib/SelectList';
import { reduxForm, Field } from 'redux-form';
import GoogleMapSearch from '../../../widgets/googleMapSearch';


class CourseAdminThirdPage extends Component{
    constructor(props){
        super(props);

        this.state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    } 


    componentOnMount(){
        window.scrollTo(0,0);
    }

    handleFormSubmit(data) {
        // Getting data object
        console.log('data: ', data);
        //show the time
        // console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        // console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        this.props.createCourseResource(data);
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

    renderWeekList({ input, data, ...rest }){
        let hourList = _.map(data, 'hour');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder="Select A Number"
                    className="yeah-input"
                    data={hourList}
                    textField='hour'
                    {...input}
                />
            </span>
        );
    }

    renderSelectList({ input, data, ...rest }){
        let optionList = _.map(data, 'option');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder="Options"
                    className="yeah-input"
                    data={optionList}
                    textField='option'
                    {...input}
                />
            </span>
        );
    }

    render(){
        // Localize the time
        momentLocalizer(moment);

        const tagList =['Business','Computer Science','Enconomics','Chemistry','Physics','Phycology','English','Engineering', 'History','Music','Math'];
        const hourList = [ {hour:'1'}, {hour:'2'}, {hour:'3'}, {hour:'4'}, {hour:'5'}, {hour:'6'} ]
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (

            <form onSubmit = {this.props.handleSubmit(this.handleFormSubmit.bind(this))}>
                <div className="form-title-bg">Create A Training Program</div>
                <br />
                <div className="form-subtitle-bg">Highlights and Benefits for students</div>
                <p>Please kindly make sure the following information is accurate and professional, as they will be used on our website and social media platforms. </p>
                <br />

                <h5>We will build this kind of graph on the website</h5>
                <img src={require('../../../../styles/img/takeaway.png')} style={{width: '100%', margin: '20px 0'}} />
                
                <div className="form-wrapper">
                    <label>1st takeaway student will get after the class*</label>
                    <h6><em>1-2 sentences; Example: Visualize and prepare data to improve efficacy of predictive models in finance related problems.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="takeaway1" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="1st takeaway"
                            required
                        />
                    </div>
                </div>
                
                <div className="form-wrapper">
                    <label>2nd takeaway student will get after the class*</label>
                    <h6><em>1-2 sentences; Example: Be able to understand the nature, characteristics, historical trend and real world application of corporate bonds, ETF, securities, municipal bonds, mutual funds, hedge funds and other types of investment.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="takeaway2" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="2nd takeaway"
                            required
                        />
                    </div>
                </div>  

                <div className="form-wrapper">
                    <label>3rd takeaway student will get after the class*</label>
                    <h6><em>1-2 sentences; Example: Be able to construct financial models to price and value swap, future, options and other financial derivatives. Understand the derivation of Black-Scholes Formula, Binomial Option Pricing Formula and their related applications.</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="takeaway3" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="3rd takeaway"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>4th takeaway student will get after the class*</label>
                    <h6><em>One sentence</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="takeaway4" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="4th takeaway"
                            required
                        />
                    </div>
                </div>

                 <div className="form-wrapper">
                    <label>5th takeaway student will get after the class*</label>
                    <h6><em>One sentence</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="takeaway5" 
                            component="textarea" 
                            cols="40" 
                            rows="3"
                            className="yeah-input"
                            placeholder="5th takeaway"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Who should take this course? List any pre-requisites if applicable.*</label>
                    <h6><em>100 words recommended</em></h6>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="preRequisites" 
                            component="textarea" 
                            cols="40" 
                            rows="5"
                            className="yeah-input"
                            placeholder="List any pre-requisites if applicable"
                            required
                        />
                    </div>
                </div>

                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                    <button type="submit" disabled={ !dirty } className="flex-item btn btn-primary">Create</button>
                </div>                
            </form>

        );
    }
}


CourseAdminThirdPage = reduxForm({
    form: 'createCourseResource',
    destroyOnUnmount: false,
    forceUnregisterOnUnmount: true,
})(CourseAdminThirdPage);

export default connect(null, actions)(CourseAdminThirdPage);