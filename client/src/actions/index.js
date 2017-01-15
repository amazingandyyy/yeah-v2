const axios = require('axios');
import {browserHistory} from 'react-router';
import {TRY_CONNECT, FETCH_HACKATHON} from './types';
const ROOT_URL = 'http://localhost:8000';

axios.defaults.baseURL = ROOT_URL;
if (localStorage.getItem('token')) {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
}
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function fetchInfo() {
    return function (dispatch) {
        axios
            .get(`/api`)
            .then(res => {
                dispatch({type: TRY_CONNECT, payload: res.data.status})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export function fetchHackathon(data) {
    const address = data.address.split(' ').join('+');
    const keyword = data.keyword.split(' ').join('+');

    return function (dispatch) {
        axios
            .get(`https://www.eventbriteapi.com/v3/events/search/?q=${keyword}&location.address=${address}&token=R5ZWGGH5QB65L3MAW62S`)
            .then(res => {
                dispatch({type: FETCH_HACKATHON, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export * from './auth';
