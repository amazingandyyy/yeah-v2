import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';
import { signUserInWithFacebook } from '../../actions/auth';
import { EMAIL_SENT } from '../../actions/types';
import { hashHistory } from 'react-router';
import { SUCCESS_TO_VERIFY_TOKEN, FAIL_TO_VERIFY_TOKEN, SUCCEED_TO_RESET_PASSWORD } from '../../actions/types';
import { Loader } from '../widgets';

class ResetPassword extends Component {
    constructor(props) {
        super(props);
    };
    handleFormSubmit(data) {
        if (data.password == data.password2) {
            const pathname = this.props.location.pathname;
            const token = pathname.split('/').pop();
            this.props.resetPassword({
                token,
                password: data.password
            });
        }else{
            console.log('password does not matched');
        }
    }
    componentWillMount(){
        this.props.authReset();
        const pathname = this.props.location.pathname;
        const token = pathname.split('/').pop();
        // verify token
        this.props.verifyToken(token);
        // gegenrate the form
        // let user resetPassword
    }
    renderContent(){
        if(this.props.status === SUCCEED_TO_RESET_PASSWORD) {
             return (
                <span className="single_icon">
                    <img src="http://wfarm4.dataknet.com/static/resources/icons/set52/a47f4a05.png" />
                    <div className="title">Password resetted</div>
                    <div className="discriptionTxt">
                        Your password has been resetted successfully.
                    </div>
                    <br/>
                     <Link to="/auth/signin">
                        <button className="btn btn-primary">Login Now</button>
                     </Link>
                </span>
            )

        }
        if(this.props.status === SUCCESS_TO_VERIFY_TOKEN){
            const {handleSubmit} = this.props;
            return (<span>
                <div className="title">Set Up Your New Password</div>
                <div className="discriptionTxt">Your YEAH account is your portal to all things YEAH: your resources, resume, career training courses, volunteer resources, and more!</div>
                <form
                    onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    className="col-xs">
                    <div className="form-group">
                        <Field
                            type='password'
                            name="password"
                            component="input"
                            className="auth-input"
                            placeholder="Passwrod*"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <Field
                            type='password'
                            name="password2"
                            component="input"
                            className="auth-input"
                            placeholder="Confirmed Password*"
                            required/>
                    </div>
                    <button type="submit" className="btn btn-primary">Reset My Password</button>
                </form>
                </span>
        );
        }
        return (
            <Loader style={{ margin: 'auto', width: '30px', marginTop: '50px'}} />
        )
    }
    render() {
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

ResetPassword = reduxForm({
    form: 'resetPassword'
}, null, actions)(ResetPassword);
ResetPassword = connect(mapStateToProps, actions)(ResetPassword);

export default ResetPassword;