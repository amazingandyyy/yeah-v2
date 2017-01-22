import axios from 'axios';
import { AUTH_ERROR, AUTH_USER, UNAUTH_USER,AUTH_ADMIN  } from './types';
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

export {
    signUserIn,
    signUserUp,
    signUserOut,
    signUserInWithFacebook,
    signUserUpWithFacebook
};