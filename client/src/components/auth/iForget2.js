import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { signUserInWithFacebook } from '../../actions/auth';
import { EMAIL_SENT } from '../../actions/types';

class IForget2 extends Component {
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
        const { handleSubmit } = this.props;
        return (
            <span>
            <div className="title">Oops! <br/>We need your Email again.</div>
            <div className="discriptionTxt">
                Due to something wrong in the last email we sent you. <br/>
                We ask for your email address again.
                <br />
                We will send you an email with a link to reset your password again.
            </div>
            <form
                onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                className="col-xs">
                <div className="form-group">
                    <Field
                        autoFocus
                        type='email'
                        name="email"
                        component="input"
                        className="yeah-input "
                        placeholder="Email Address*"
                        required
                        />
                </div>
                {this.renderAlert()}
                <button type="submit" className="btn btn-primary">Send Me Recover Email Again</button>
            </form>
            <div>
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

IForget2 = reduxForm({
    form: 'iforget2'
}, null, actions)(IForget2);
IForget2 = connect(mapStateToProps, actions)(IForget2);

export default IForget2;