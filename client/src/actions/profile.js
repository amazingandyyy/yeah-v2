import request from './request';
import { FETCH_PROFILE, UPDATE_PROFILE } from './types';
import superagent from 'superagent';

const fetchProfile = () => {
    return function (dispatch) {
        request
            .get(`/api/user/profile`)
            .then(res => {
                dispatch({type: FETCH_PROFILE, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

const uploadProfileAvatar = (files) => {
    return function (dispatch) {
        superagent.post('/api/user/profile/avatar')
            .set('Authorization', localStorage.getItem('yeah_token'))
            .attach('asset', files[0])
            .end((err, res) => {
                if (err) return console.log(err);
                dispatch({type: UPDATE_PROFILE, payload: res.body})
            })
    }
}

const updateUserProfile = (userData) => {
    return function (dispatch) {
        request
            .post(`/api/user/profile/info`, userData)
            .then(res => {
                dispatch({ type: UPDATE_PROFILE, payload: res.data })
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export {
    fetchProfile,
    uploadProfileAvatar,
    updateUserProfile
}
