import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
// import 'react-widgets/lib/scss/react-widgets.scss';
import '../../styles/react-widget/scss/react-widgets.scss';
import Multiselect from 'react-widgets/lib/Multiselect';
import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';

class VolunteerAdmin extends Component{
    handleFormSubmit(data) {
        // Getting data object
        console.log('data: ', data);
        //show the time 
        console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
        console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        this.props.createVolunteerResource(data);
    }

    renderMultiselect ({input, ...rest}) {
        return (
            <Multiselect {...input}
                onBlur={()=> input.onBlur()}
                value={input.value || []}
                {...rest}
            />
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

        const tagList =['Animals','Computers','Children','Environment','Education','Homeless','Sports','Arts', 'Culture','Community','International'];
        
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <fieldset className="form-group">
                <h3>Volunteer Event Details:</h3>
                <div className="form-wrapper">
                    <label>Event Title</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="title" 
                            component="input" 
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                <div className="form-wrapper">
                    <label>Organization</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="organization" 
                            component="input" 
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Event Date</label>
                    <div className="form-group">
                        <Field 
                            type="date" 
                            name="date" 
                            component="input" 
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Location</label>
                    <div className="form-group">
                        <Field 
                            type="type" 
                            name="location" 
                            component="input" 
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Tags</label>
                    <div className="form-group">
                        <Field 
                            name="tags"
                            component={this.renderMultiselect.bind(this)}
                            data={tagList}
                        />
                    </div>
                </div>

                <div className="form-wrapper">
                    <label>Description</label>
                    <div className="form-group">
                        <Field 
                            type="text"
                            cols="40" rows="5"
                            name="location" 
                            component="textarea" 
                            className="yeah-input"
                            required
                        />
                    </div>
                </div>
                </fieldset>
                <button type="submit" className="btn btn-primary">Create</button>
            
            </form>
            
        )
    }
}


VolunteerAdmin = reduxForm({
    form: 'createVolunteerResource',
    initialValues: {
        date: moment().add(1, 'day').format('YYYY-MM-DD')
    }

}, null, actions)(VolunteerAdmin);

export default connect(null, actions)(VolunteerAdmin);

// <lable>When: </lable>
// <Field
//     name="date" 
//     component={this.renderDatePicker.bind(this)}
//     className="yeah-input"
//     required
// />
// <Field  
//     name="time" 
//     component={this.renderTimePicker.bind(this)}
//     className="yeah-input"
//     required
// />