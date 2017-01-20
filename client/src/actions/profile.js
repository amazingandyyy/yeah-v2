import axios from 'axios';
import { FETCH_PROFILE, UPDATE_PROFILE } from './types';
import superagent from 'superagent';

const fetchProfile = () => {
    return function (dispatch) {
        axios
            .get(`/api/user/profile`)
            .then(res => {
                dispatch({type: FETCH_PROFILE, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

const uploadProfileAvatar = (files) => {
    return function (dispatch) {
        superagent.post('/api/user/profile/avatar')
            .set('Authorization', localStorage.getItem('token'))
            .attach('asset', files[0])
            .end((err, res) => {
                if (err) return console.log(err);
                dispatch({type: UPDATE_PROFILE, payload: res.body})
            })
    }
   
}

export {fetchProfile, uploadProfileAvatar}
