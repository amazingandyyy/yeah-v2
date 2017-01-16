import axios from 'axios';
import { CREATE_VOLUNTEER_CHANCE, FETCH_ALL_VOLUNTEER_CHANCES } from './types';
import { hashHistory } from 'react-router';

function createVolunteerResource(resource) {
    return function (dispatch) {
        axios
            .post(`/api/volunteer/createResource`, resource)
            .then(res => {
                dispatch({ type: CREATE_VOLUNTEER_CHANCE })
                dispatch({ type: 'SUCCESS' });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function fetchAllVolunteerResources() {
    return function (dispatch) {
        axios
            .get(`/api/volunteer/fetchAll`)
            .then(res => {
                dispatch({ type: FETCH_ALL_VOLUNTEER_CHANCES, payload: res.data })

            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export { createVolunteerResource }