import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';

import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList';
import GoogleMapSearch from '../../widgets/googleMapSearch';
import $ from 'jquery';


class VolunteerAdmin extends Component{
    constructor(props){
        super(props)
        this.state = {
            tags: [ {id: 1, text: "Apples"} ],
            suggestions: ["Banana", "Mango", "Pear", "Apricot"]
        }
    }
    componentWillMount(){
        this.props.getCollegesList();
    }
    handleFormSubmit(data) {
        // Getting data object
        // const location = $('.geosuggest__input.yeah-input').val()
        const result = {
            ...data,
            // location
        }
        console.log('result: ', result);

        //show the time 
        // console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        // console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());

        this.props.createVolunteerResource(data);
    }

    cancelForm(){
        $('.geosuggest__input.yeah-input').val('')
    }

    renderMultiselect ({input, data}) {
        return (
            <span style={{width: '100%'}}>
                <Multiselect 
                    className="yeah-input"
                    {...input}
                    onBlur={()=> input.onBlur()}
                    value={input.value || []}
                    data = {data}
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

    renderCollegeInput ({input, ...rest}) {
        let collegeList = _.map(this.props.colleges, 'name');
        return (
            <span style={{width: '100%'}}>
                <DropdownList
                    placeholder="Your College"
                    className="yeah-input"
                    data={collegeList}
                    textField='name'
                    caseSensitive={false}
                    filter='contains'
                    {...input}
                />
            </span>
        );
    }
    
    render(){
        // Localize the time
        momentLocalizer(moment);

        const tagList =['Animals','Computers','Children','Environment','Education','Homeless','Sports','Arts', 'Culture','Community','International'];
        const { handleSubmit, dirty, submitting, reset } = this.props;
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <div className="form-title-bg">Create A Volunteer Program</div>
                <div className="form-wrapper">
                    <label>Title*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="title" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Event title"
                            required={false}
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Organization*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="organization" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Event organization"
                            required={false}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Date*</label>
                    <div className="form-group">
                        <Field 
                            type="date" 
                            name="date" 
                            component="input" 
                            className="yeah-input"
                            placeholder="Event date"
                            required={false}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Location*</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="location" 
                            component={GoogleMapSearch}
                            placeholder="Event location"
                            required={false}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Tags*</label>
                    <div className="form-group">
                        <Field 
                            name="tags"
                            component={this.renderMultiselect.bind(this)}
                            data={tagList}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>College*</label>
                    <div className="form-group">
                        <Field 
                            name="college"
                            component={this.renderCollegeInput.bind(this)}
                            data={tagList}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Description*</label>
                    <div className="form-group">
                        <Field 
                            type="text"
                            cols="40" 
                            rows="8"
                            name="description" 
                            component="textarea" 
                            className="yeah-input"
                            required={false}
                            placeholder="Event Details and discription..."
                        />
                    </div>
                </div>
                <div className="flex-container btn-container">
                    <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset && this.cancelForm.bind(this)}>Cancel</button>
                    <button type="submit" className="flex-item btn btn-primary">Create</button>
                </div>
            </form>   
        )
    }
}


VolunteerAdmin = reduxForm({
    form: 'createVolunteerResource',
    initialValues: {
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    }
})(VolunteerAdmin);

function mapStateToProps({assist}){
    return {colleges: assist.colleges}
}

export default connect(mapStateToProps, actions)(VolunteerAdmin);

// <lable>When: </lable>
// <Field
//     name="date" 
//     component={this.renderDatePicker.bind(this)}
//     className="yeah-input"
//     required={false}
// />
// <Field  
//     name="time" 
//     component={this.renderTimePicker.bind(this)}
//     className="yeah-input"
//     required={false}
// />