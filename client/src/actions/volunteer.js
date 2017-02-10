import request from './request';
import { 
    FETCH_ALL_VOLUNTEER_CHANCES,
    FETCH_ONE_VOLUNTEER_CHANCE,
    DELETE_ONE_VOLUNTEER_CHANCE,
    DELETE_ONE_VOLUNTEER_GOBACK
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllVolunteerChances() {
    return function (dispatch) {
        request
            .get(`/api/resource/volunteer/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_VOLUNTEER_CHANCES, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function fetchOneVolunteerChance(id) {
    return function (dispatch) {
        request
            .get(`/api/resource/volunteer/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_VOLUNTEER_CHANCE, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function deleteOneVolunteerChance(id) {
    return function (dispatch) {
        request
            .delete(`/api/resource/volunteer/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_VOLUNTEER_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function deleteOneVolunteerGoback(){

    return function (dispatch) {
        console.log('clearing the data');
        dispatch( { type: DELETE_ONE_VOLUNTEER_GOBACK } );
    }
}

export {
    fetchAllVolunteerChances,
    fetchOneVolunteerChance,
    deleteOneVolunteerChance,
    deleteOneVolunteerGoback
}