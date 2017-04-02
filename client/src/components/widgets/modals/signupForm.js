import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../../actions';
import { Loader } from '../../widgets';
import DropdownList from 'react-widgets/lib/DropdownList';

class SignUpModal extends Component {
    constructor(props){
        super(props);
    }
    componentWillMount() {
        this.props.fetchProfile();
        this.props.getCollegesList();
    }
    renderCollegeInput ({input, ...rest}) {
      let collegeList = _.map(this.props.colleges, 'name');
      return (
          <span style={{width: '100%'}}>
              <DropdownList
                  {...input}
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
    let college = _.find(this.props.colleges, {name: data.college});
    const userData = {
      name: {
        first: data.firstName,
        last: data.lastName
      },
      college
    }
    
    console.log('sign up info', data)
    // this.props.updateUserProfile(userData)
  }
    render(){
        const {handleSubmit, submitting, reset, dirty} = this.props;
        return (
            <div className="signup">
                <div className="title-icon signup animated pulse"><i className="fa fa-check" aria-hidden="true"></i></div>
                <div className="action">
                    Please Complete signup form
                </div>
                <br/>
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
                    className="yeah-input"
                    placeholder="Email Address*"
                    disabled
                    required/>
                </div>
                <hr/>
                <div className="form-title">More Information</div>
                <div className="form-wrapper">
                  <label>Your College*</label>
                  <div className="form-group">
                      <Field 
                          name="college"
                          placeholder="Your College*"
                          component={this.renderCollegeInput.bind(this)}
                          required
                      />
                  </div>
                </div>
                <div className="form-wrapper">
                  <label>Your Major*</label>
                  <div className="form-group">
                      <Field 
                          name="major"
                          placeholder="Your Major*"
                          className="yeah-input"
                          component='input'
                          required
                      />
                  </div>
                </div>
                <div className="form-wrapper">
                  <label>What year you are?*</label>
                  <div className="form-group">
                      <Field 
                          name="major"
                          placeholder="Freshman, sophomore, junior...*"
                          className="yeah-input"
                          component='input'
                          required
                      />
                  </div>
                </div>
                <div className="form-wrapper">
                  <label>Why do you want to signup for this opportunity?*</label>
                  <div className="form-group">
                      <Field 
                          name="why"
                          placeholder="Why*"
                          className="yeah-input"
                          component='textarea'
                          required
                      />
                  </div>
                </div>
                <div className="form-wrapper">
                  <label>Do you have any special skillset?*</label>
                  <small>
                    <br/>
                    Skillsets like website development, poster design, public speech, translation...?
                  </small>
                  <div className="form-group">
                      <Field 
                          name="why"
                          placeholder="Skillsets"
                          className="yeah-input"
                          component='textarea'
                          required
                      />
                  </div>
                </div>
                </div>
                <div className="btn-container">
                  <button type="submit" disabled={ submitting } className="btn btn-primary">Sign Up Now</button>
                </div>
              </form>
            </div>
        )
    }
}


function mapStateToProps({profile, assist}) {
  if (profile.name) {
    return {
      profile,
      initialValues: {
        firstName: profile.name.first,
        lastName: profile.name.last,
        email: profile.email.data,
        college: profile.college.name,
        major: profile.major,
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

SignUpModal = reduxForm({form: 'signupInfoForm'})(SignUpModal);

SignUpModal = connect(mapStateToProps, actions)(SignUpModal);
export default SignUpModal;