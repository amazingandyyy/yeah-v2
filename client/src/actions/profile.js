import axios from 'axios';
import { FETCH_PROFILE } from './types';

function fetchProfile() {
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

export {fetchProfile}