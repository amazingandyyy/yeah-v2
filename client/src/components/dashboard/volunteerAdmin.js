import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import 'react-widgets/lib/less/react-widgets.less';
import Multiselect from 'react-widgets/lib/Multiselect';
import Moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import { reduxForm, Field } from 'redux-form';
import GoogleMapSearch from './googleMapSearch';

class VolunteerAdmin extends Component{
    handleFormSubmit(data) {
        // Getting data object
    console.log('data: ', data);
        //show the time 
    console.log('Specific Date: ', data.date.getMonth()+1,data.date.getDate(),data.date.getFullYear());
    console.log('Specific Time:', data.time.getHours(), data.time.getMinutes());
        // this.props.createVolunteerResource(data);
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
            <div>
                <DateTimePicker time={false} {...rest} onChange={input.onChange} placeholder='Select Starting Date'/>
            </div>    
        );
    }

    renderTimePicker({input, ...rest}){

        return(
            <div>
                <DateTimePicker calendar={false} {...rest} onChange={input.onChange} placeholder='Select Starting Time'/>
            </div>    
        );
    }

    renderLocation({input, ...rest}){
        return(
        <GoogleMapSearch {...input} onChange={input.onChange} {...rest}/>
        );
    }

    render(){
        // Localize the time
        momentLocalizer(Moment);

        const tagList =['Animals','Computers','Children','Environment','Education','Homeless','Sports','Arts', 'Culture','Community','International'];
        
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
                <fieldset className="form-group">
                <h3>Volunteer Event Details:</h3>
                <div>
                    <lable>Activity Name: </lable>
                    <Field 
                        type="text" 
                        name="title" 
                        component="input" 
                        className="form-control"
                        required 
                    />
                </div>
                <div>
                    <lable>Organization: </lable>
                    <Field 
                        type="text" 
                        name="oranization" 
                        component="input" 
                        className="form-control"
                        required
                    />
                </div>
                <div>
                    <lable>When: </lable>
                    <Field  
                        name="date" 
                        component={this.renderDatePicker.bind(this)}
                        className="form-control"
                        required
                    />
                    <Field  
                        name="time" 
                        component={this.renderTimePicker.bind(this)}
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <lable>Where: </lable>
                    <Field 
                        type="text" 
                        name="location" 
                        component={this.renderLocation.bind(this)} 
                        className="form-control"
                        required
                    />
                </div>

                <div>
                    <lable>Tags:</lable>
                    <Field 
                        name="tags"
                        component={this.renderMultiselect.bind(this)}
                        data={tagList}
                    />
                </div>

                <div>
                    <lable>Description: </lable>
                    <Field 
                        type="text" 
                        name="description" 
                        component="textarea" 
                        className="form-control"
                        required
                    />
                </div>
                </fieldset>
                <button type="submit" className="btn btn-primary">Create</button>
            
            </form>
            
        )
    }
}



VolunteerAdmin = reduxForm({
    form: 'createVolunteerResource',

}, null, actions)(VolunteerAdmin);

export default connect(null, actions)(VolunteerAdmin);