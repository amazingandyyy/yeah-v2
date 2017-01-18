import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { reduxForm, Field } from 'redux-form';

class VolunteerAdmin extends Component{
    handleFormSubmit(data) {
        console.log('data: ', data);
        this.props.createVolunteerResource(data);
    }
    render(){
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
            <div className="form-group">
              <label>Volunteer Event Details:</label>
              <Field 
                type="text" 
                name="title" 
                component="input" 
                className="form-control"
                required
              />
              <Field 
                type="text" 
                name="oranization" 
                component="input" 
                className="form-control"
                required
              />
              <Field 
                type="text" 
                name="time" 
                component="input" 
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
            </form>
        )
    }
}

VolunteerAdmin = reduxForm({
    form: 'createVolunteerResource'
}, null, actions)(VolunteerAdmin);

export default connect(null, actions)(VolunteerAdmin);