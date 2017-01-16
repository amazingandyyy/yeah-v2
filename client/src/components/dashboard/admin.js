import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { reduxForm, Field } from 'redux-form';

class Admin extends Component {
  handleFormSubmit(data) {
      this.props.createVolunteerResource(data);
  }

  render() {
    return (
      <div className="display-componet">
          <div className="header">Admin</div>
          <div className="content">
          <div className="container">
            <form
                onSubmit={this.props.handleSubmit(this.handleFormSubmit.bind(this))}
            >
            <div className="form-group">
              <label>Title:</label>
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
          </div>
          </div>
        </div>
    );
  }
};

function mapStateToProps({volunteer}){
  return {
    success: volunteer.success
  }

}
Admin = reduxForm({
    form: 'createVolunteerResource'
}, null, actions)(Admin);

export default connect(null, actions)(Admin);