import axios from 'axios';
import { 
    FETCH_ALL_VOLUNTEER_CHANCES,
    FETCH_ONE_VOLUNTEER_CHANCE,
    DELETE_ONE_VOLUNTEER_CHANCE
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllVolunteerChances() {
    return function (dispatch) {
        axios
            .get(`/api/volunteer/fetchAll`)
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
        axios
            .get(`/api/volunteer/fetchOne/${id}`)
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
        axios
            .delete(`/api/volunteer/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_VOLUNTEER_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export {
    fetchAllVolunteerChances,
    fetchOneVolunteerChance,
    deleteOneVolunteerChance
    }