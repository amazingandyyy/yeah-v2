import axios from 'axios';
import { 
    AUTH_ERROR,
    AUTH_USER,
    UNAUTH_USER,AUTH_ADMIN,
    EMAIL_NOT_FOUND,
    EMAIL_SENT,
    RESET,
    FAIL_TO_VERIFY_TOKEN,
    SUCCESS_TO_VERIFY_TOKEN,
    SUCCEED_TO_RESET_PASSWORD
} from './types';
import { browserHistory, hashHistory } from 'react-router';

function signUserIn({email, password}) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/user/signin/email`, {email, password})
            .then(res => {
                if(res.data.isAdmin){
                    dispatch({type: AUTH_ADMIN})
                }else{
                    dispatch({type: AUTH_USER})
                }
                hashHistory.push('/dashboard');
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                localStorage.setItem('isAdmin', res.data.isAdmin);
                localStorage.setItem('token', res.data.token);
                location.reload();
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Bad Login Info'})
            });
    }
}

function signUserInWithFacebook(FbTreasure){
    return function (dispatch) {
        // Submit FbTreasure to server
        axios
            .post(`/api/user/signin/fb`, FbTreasure)
            .then(res => {
                console.log('res: ', res.data)
                if(res.data.isAdmin){
                    dispatch({type: AUTH_ADMIN})
                }else{
                    dispatch({type: AUTH_USER})
                }
                hashHistory.push('/dashboard');
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                localStorage.setItem('isAdmin', res.data.isAdmin);
                localStorage.setItem('token', res.data.token);
                location.reload();
            })
    }
}

function sendEmailToResetPassword(email){
    return function(dispatch) {
        axios
            .post(`/api/user/helper/sendEmailToResetPassword/${email}`)
            .then(res => {
                console.log(res.data);
                dispatch({type: EMAIL_SENT})
            })
            .catch(error => {
                dispatch({type: EMAIL_NOT_FOUND, payload: 'No user is using this email.'})
            });
    }
}

function signUserUp(userObj) {
    return function (dispatch) {
        // Submit name/email/password to server
        axios
            .post(`/api/user/signup`, userObj)
            .then(res => {
                dispatch({type: AUTH_USER})
                console.log('res/data: ', res.data)
                localStorage.setItem('token', res.data.token);
                hashHistory.push('/dashboard')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Failed to Sign up, please try again.'})
            });
    }
}

function signUserUpWithFacebook(FbTreasure){
    return function (dispatch) {
        // Submit FbTreasure to server
        axios
            .post(`/api/user/signin/fb`, FbTreasure)
            .then(res => {
                if(res.data.isAdmin){
                    dispatch({type: AUTH_ADMIN})
                }else{
                    dispatch({type: AUTH_USER})
                }
                hashHistory.push('/dashboard');
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
                localStorage.setItem('isAdmin', res.data.isAdmin);
                localStorage.setItem('token', res.data.token);
                location.reload();
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Bad Login Info'})
            });
    }
}

function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('token');
    }
}

function authReset(){
    return function(dispatch) {
        dispatch({type: RESET})
    }
}
function verifyToken(token) {
    return function(dispatch){
        axios.post(`/api/user/helper/verifyToken/${token}`)
        .then(res => {
            dispatch({type: SUCCESS_TO_VERIFY_TOKEN})
        })
        .catch(error => {
                console.log(error);
                hashHistory.push('/auth/iforget2')
            });
    }
}

function resetPassword(data) {
    return function(dispatch){
        axios.post(`/api/user/helper/resetPassword/`, data)
        .then(res => {
            dispatch({ type: SUCCEED_TO_RESET_PASSWORD })
        })
        .catch(error => {
                console.log(error);
                hashHistory.push('/auth/iforget2')
            });
    }
}

export {
    signUserIn,
    signUserUp,
    signUserOut,
    signUserInWithFacebook,
    signUserUpWithFacebook,
    sendEmailToResetPassword,
    authReset,
    verifyToken,
    resetPassword
};