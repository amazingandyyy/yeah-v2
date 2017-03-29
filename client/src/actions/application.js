import request from './request';
import { 
    FETCH_ALL_APP,
    FETCH_ONE_APP,
    UPDATE_ONE_APP,
    FETCH_ALL_APP_OF_ONE
} from './types';

function fetchAllApplications() {
    return function (dispatch) {
        request
            .get(`/api/task/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_APP, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function fetchOneApplications(id) {
    return function (dispatch) {
        request
            .get(`/api/task/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_APP, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function updateOneApplications(id, data) {
    return function (dispatch) {
        request
            .post(`/api/task/updateOne/${id}`, data)
            .then(res => {
                dispatch({type: UPDATE_ONE_APP, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function fetchAllOfOneApplications() {
    return function (dispatch) {
        request
            .get(`/api/task/fetchAllOfOne`)
            .then(res => {
                dispatch({type: FETCH_ALL_APP_OF_ONE, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

export {
    fetchAllApplications,
    fetchOneApplications,
    updateOneApplications,
    fetchAllOfOneApplications
};