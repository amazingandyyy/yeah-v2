import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import { reduxForm, Field } from 'redux-form';

class CourcesAdmin extends Component{
    handleFormSubmit(data) {
        console.log('date: ', data)
    //   this.props.createVolunteerResource(data);
    }
    render(){
        return (
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
            <div className="form-group">
              <label>Cources Title:</label>
              <Field 
                type="text" 
                name="title" 
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

CourcesAdmin = reduxForm({
    form: 'createVolunteerResource'
}, null, actions)(CourcesAdmin);

export default connect(null, actions)(CourcesAdmin);