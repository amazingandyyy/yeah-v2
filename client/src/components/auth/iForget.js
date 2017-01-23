import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { signUserInWithFacebook } from '../../actions/auth';
import { EMAIL_SENT } from '../../actions/types';

class IForget extends Component {
    constructor(props) {
        super(props);
    };
    handleFormSubmit({email}) {
        this.props.sendEmailToResetPassword(email);
    }
    renderAlert(){
        if(this.props.errorMsg) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMsg}
                    <br />
                    you might want to <Link to="/auth/signup" style={{textDecoration: 'underline'}}>sign up!</Link>
                </div>
            )
        }
    }
    componentWillMount(){
        this.props.authReset()
    }
    renderContent(){
        if(this.props.status === EMAIL_SENT){
            return (
                <span className="single_icon">
                    <img src="http://wfarm4.dataknet.com/static/resources/icons/set52/a47f4a05.png" />
                    <div className="title">Email Sent!</div>
                    <div className="discriptionTxt">
                        We have sent you an email with a link to reset your password.
                    </div>
                </span>
            )
        }
        const {handleSubmit} = this.props;
        return (
            <span>
            <div className="title">Reset Password is Simple</div>
            <div className="discriptionTxt">
                Please provide the email address you used when you signed up for your YEAH account.
                <br />
                We will send you an email with a link to reset your password.
            </div>
            <form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                className="col-xs">
                <div className="form-group">
                    <Field
                        type='email'
                        name="email"
                        component="input"
                        className="auth-input"
                        placeholder="Email Address*"
                        required
                        />
                </div>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Send Me Email</button>
            </form>
            <div>
            <hr />
            <div className="small-text">or try to sign in with one of these services</div>
            <div className="auth-fb-wrapper">
                <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/fb-login.svg" className="fb-icon" />
                <div className="content">Facebook</div>
                <FacebookLogin
                    appId="237873150002610"
                    autoLoad={false}
                    fields="name,email,picture"
                    cssClass="auth-fb-button"
                    callback={this.props.signUserUpWithFacebook} 
                />
            </div>
            </div>
            </span>
        )
    }
    render() {
        // console.log('this.props;: ', this.props);
        return (
            <div className="auth-card notab">
                <div className="formSection">
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error,
        status: auth.status
    }
}

IForget = reduxForm({
    form: 'iforget'
}, null, actions)(IForget);
IForget = connect(mapStateToProps, actions)(IForget);

export default IForget;