import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import * as actions from '../../actions';
import { Loader } from '../widgets';
import moment from 'moment';
import Dropzone from 'react-dropzone';
import DropdownList from 'react-widgets/lib/DropdownList';

class Setting extends Component {
  componentWillMount() {
    this.props.fetchProfile();
    this.props.getCollegesList();
  }
  renderProfile() {
    const {name, email} = this.props.profile;
    console.log(this.props.profile);
    if (name) {
      return (
        <div>
          <h2>Profile</h2>
          <p>name: {name.first}
            {name.last}</p>
          <p>email: {email.data}</p>
          {this.renderAvatar()}
        </div>
      )
    } else {
      return <Loader/>
    }
  }
  renderAvatar() {
    if (this.props.profile.avatar) {
      return (<img src={this.props.profile.avatar}/>)
    } else {
      return (
        <p>no image</p>
      )
    }
  }
  onDrop(files) {
    this.props.uploadProfileAvatar(files);
  }

  renderCollegeInput ({input, ...rest}) {
      let collegeList = _.map(this.props.colleges, 'name');
      return (
          <span style={{width: '100%'}}>
              <DropdownList
                  placeholder="Your Current Attented College"
                  className="yeah-input"
                  data={collegeList}
                  textField='name'
                  caseSensitive={false}
                  filter='contains'
              />
          </span>
      );
  }

  handleFormSubmit(data) {
    const userData = {
      name: {
        first: data.firstName,
        last: data.lastName
      }
    }
    this.props.updateUserProfile(userData)
  }
  render() {
    const {handleSubmit, submitting, reset, dirty} = this.props;
    return (
      <div className="display-componet">
        <div className="header">Settings</div>
        <div className="content">
          <div className="container">
            <div className="card">
              <form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                className="col-xs">
                <div className="form-section">
                <div className="form-title">Basic Information</div>
                <div className="form-group">
                  <Field
                    name="firstName"
                    type='text'
                    component="input"
                    className="yeah-input"
                    placeholder="First Name*"
                    required/>
                  <Field
                    name="lastName"
                    type='text'
                    component="input"
                    className="yeah-input"
                    placeholder="Last Name*"
                    required/>
                </div>
                <div className="form-group">
                  <Field
                    name="email"
                    type='email'
                    component="input"
                    className="yeah-input "
                    placeholder="Email Address*"
                    disabled
                    required/>
                </div>
                <hr />
                <div className="form-wrapper">
                  <label>College*</label>
                  <div className="form-group">
                      <Field 
                          name="college"
                          placeholder="Your College*"
                          component={this.renderCollegeInput.bind(this)}
                      />
                  </div>
                </div>
                </div>
                <div className="flex-container btn-container">
                  <button type="button" disabled={ submitting } className="flex-item btn btn-default" onClick={reset}>Cancel</button>
                  <button type="submit" disabled={ !dirty } className="flex-item btn btn-primary">Save</button>
                </div>
              </form>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({profile, assist}) {
  if (profile.name) {
    return {
      profile,
      initialValues: {
        firstName: profile.name.first,
        lastName: profile.name.last,
        email: profile.email.data
      },
      colleges: assist.colleges
    }
  } else {
    return {
      profile,
      colleges: assist.colleges
    }
  }
}

Setting = reduxForm({form: 'setting'})(Setting);

Setting = connect(mapStateToProps, actions)(Setting);
export default Setting;

// {this.renderProfile()} <div>   <Dropzone onDrop={this.onDrop.bind(this)}
// multiple={false}>     <div>Try dropping some files here, or click to select
// files to upload.</div>   </Dropzone> </div>