import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { Link } from 'react-router';
import FacebookLogin from 'react-facebook-login';

class Signin extends Component {
    constructor(props) {
        super(props);
    };
    componentWillMount(){
        this.props.authReset()
    }
    renderAlert(){
        if(this.props.errorMsg) {
            return (
                <div className="alert alert-danger">
                    <strong>Oops! </strong>{this.props.errorMsg}
                </div>
            )
        }
    }
    handleFormSubmit(data) {
        this.props.resetError()
        this.props.signUserIn(data);
    }
    render() {
        // console.log('this.props;: ', this.props);
        const {handleSubmit} = this.props;
        return (
            <div className="auth-card">
                <div className="tab">
                    <Link className="panel left" to="/auth/signup">Sign up</Link>
                    <Link className="panel right active" to="/auth/signin">Sign in</Link>
                </div>
                <div className="formSection">
                    <div className="title">Sign Into YEAH Account</div>
                    <div className="discriptionTxt">Your YEAH account is your portal to all things YEAH: your resources, resume, career training courses, volunteer resources, and more!</div>
                    <form
                        onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                        className="col-xs">
                        <div className="form-group">
                            <Field
                                autoFocus
                                type= 'email'
                                name="email"
                                component="input"
                                className="yeah-input "
                                placeholder="Email Address"
                                required
                                />
                        </div>
                        <div className="form-group">
                            <Field
                                type= 'password'
                                name="password"
                                component="input"
                                className="yeah-input "
                                placeholder="Password"
                                required
                                />
                        </div>
                        {this.renderAlert()}
                        <button type="submit" className="btn btn-primary">Sign in</button>
                        <div className="iForGet">
                            <Link to="/auth/iforget">Forgot your password?</Link>
                        </div>
                    </form>
                <div>
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

Signin = reduxForm({
    form: 'signin'
})(Signin);
Signin = connect(mapStateToProps, actions)(Signin);

export default Signin;


//  <hr />
// <div className="small-text">or sign in with one of these services</div>
// <div className="auth-fb-wrapper">
//     <img src="https://s3-us-west-1.amazonaws.com/yeah-assets/icons/fb-login.svg" className="fb-icon" />
//     <div className="content">Facebook</div>
//     <FacebookLogin
//         appId="237873150002610"
//         autoLoad={false}
//         fields="name,email,picture"
//         cssClass="auth-fb-button"
//         callback={this.props.signUserInWithFacebook} 
//     />
// </div>