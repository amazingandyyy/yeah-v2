import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { signUserInWithFacebook } from '../../actions/auth';

class IForget extends Component {
    constructor(props) {
        super(props);
    };
    handleFormSubmit(data) {
        this.props.signUserIn(data)
    }
    render() {
        // console.log('this.props;: ', this.props);
        const {handleSubmit} = this.props;
        return (
            <div className="auth-card">
                <div className="formSection">
                    <div className="title">Reset Your Password</div>
                    <div className="discriptionTxt">
                        Please provide the email address you used when you signed up for your Udacity account.
                        <br />
                        We will send you an email with a link to reset your password.
                    </div>
                    <form
                        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                        className="col-xs">
                        <div className="form-group">
                            <Field
                                type= 'email'
                                name="email"
                                component="input"
                                className="auth-input"
                                placeholder="email@email.com"
                                required
                                />
                        </div>
                        <button type="submit" className="btn btn-primary">Sign in</button>
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
                </div>
            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        errorMsg: auth.error
    }
}

IForget = reduxForm({
    form: 'iforget'
}, null, actions)(IForget);
IForget = connect(mapStateToProps, actions)(IForget);

export default IForget;