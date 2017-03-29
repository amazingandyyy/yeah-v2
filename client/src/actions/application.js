import request from './request';
import { 
    FETCH_ALL_APP,
    FETCH_ONE_APP,
    UPDATE_ONE_APP,
    FETCH_ALL_APP_OF_ONE,
    CREATE_ONE_APP,
    FAIL_APP_ACTION
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
                dispatch({type: FAIL_APP_ACTION, payload: `fetchAll Failed: ${error}`})
            });
    }
}

function createOneApplication() {
    return function (dispatch) {
        request
            .post(`/api/task/createOne`)
            .then(res => {
                dispatch({type: CREATE_ONE_APP, payload: res.data})
            })
            .catch(error => {
                console.log(error);
                dispatch({type: FAIL_APP_ACTION, payload: `createOne Failed: ${error}`})
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
                dispatch({type: FAIL_APP_ACTION, payload: `fetchOne Failed: ${error}`})
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
                dispatch({type: FAIL_APP_ACTION, payload: `updateOne Failed: ${error}`})
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
                dispatch({type: FAIL_APP_ACTION, payload: `fetchAllOfOne Failed: ${error}`})
            });
    }
}

export {
    fetchAllApplications,
    createOneApplication,
    fetchOneApplications,
    updateOneApplications,
    fetchAllOfOneApplications
};