import axios from 'axios';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER } from './types';
import { browserHistory } from 'react-router';

function signUserIn({email, password}) {
    return function (dispatch) {
        // Submit email/password to server
        axios
            .post(`/api/user/signin`, {email, password})
            .then(res => {
                dispatch({type: AUTH_USER})
                localStorage.setItem('token', res.data.token);
                browserHistory.push('/dashboard')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Bad Login Info'})
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
                browserHistory.push('/dashboard')
                axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            })
            .catch(error => {
                console.log(error);
                dispatch({type: AUTH_ERROR, payload: 'Failed to Sign up, please try again.'})
            });
    }
}

function signUserOut() {
    return function (dispatch) {
        dispatch({type: UNAUTH_USER})
        localStorage.removeItem('token');
    }
}

export {signUserIn, signUserUp, signUserOut};