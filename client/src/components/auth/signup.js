import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';

class Signup extends Component {
    renderAlert() {
        if (this.props.errorMsg) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops!
                    </strong> {this.props.errorMsg}
                </div>
            )
        }
    }
    componentWillMount(){
        this.props.authReset()
    }
    handleFormSubmit(data) {
        if (data.password == data.password2) {
            const signUpData = {
                name: {first: data.firstName, last: data.lastName},
                email: {data: data.email}, 
                password: data.password,
                facebook: data.FBData
            }
            this.props.signUserUp(signUpData);
        }else{
            console.log('password does not matched');
        }
    }
    render() {
        const { handleSubmit } = this.props;
        return (
            <div className="auth-card">
            <div className="tab">
                <Link className="panel left active" to="/auth/signup">Sign up</Link>
                <Link className="panel right" to="/auth/signin">Sign in</Link>
            </div>
            <div className="formSection">
                <div className="title">Create Your YEAH Account</div>
                <div className="discriptionTxt">Your YEAH account is your portal to all things YEAH: your resources, resume, career training courses, volunteer resources, and more!</div>
                <form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    className="col-xs">
                    <div className="form-group">
                        <Field
                            autoFocus
                            name="firstName"
                            type='text'
                            component="input"
                            className="yeah-input "
                            placeholder="First Name*"
                            required/>
                        <Field
                            name="lastName"
                            type='text'
                            component="input"
                            className="yeah-input "
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
                            required/>
                    </div>
                    <div className="form-group">
                        <Field
                            type='password'
                            name="password"
                            component="input"
                            className="yeah-input "
                            placeholder="Passwrod*"
                            required
                        />
                        <Field
                            type='password'
                            name="password2"
                            component="input"
                            className="yeah-input "
                            placeholder="Confirmed Password*"
                            required/>
                    </div>
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                </form>
                <div>
                <hr />
                <div className="small-text">or sign in with one of these services</div>
                <div className="auth-fb-wrapper">
                    <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/fb-login.svg" className="fb-icon" />
                    <div className="content">Facebook</div>
                    <FacebookLogin
                        appId="237873150002610"
                        autoLoad={false}
                        fields="name,email,picture"
                        cssClass="auth-fb-button"
                        callback={this.props.signUserInWithFacebook} 
                    />
                </div>
                </div>
                </div>
            </div>
        );
    }
}

function validate(formProps) {
    const errors = {}
    // console.log(formProps)
    if(formProps.password !== formProps.password2){
        errors.password = 'Password must match';
    }
    return errors;
}

function mapStateToProps({auth}) {
    if(auth.userData) {
        const { userData } = auth;
        return {
            errorMsg: auth.error,
            initialValues: {
                firstName: userData.name.first,
                lastName: userData.name.last,
                email: userData.email.data,
                FBData: userData.facebook
            }
            
        }
    }else{
        return {
            errorMsg: auth.error
        }
    }
}

Signup = reduxForm({
    form: 'signup',
    validate
})(Signup);
Signup = connect(mapStateToProps, actions)(Signup);

export default Signup;