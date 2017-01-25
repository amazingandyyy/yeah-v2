import axios from 'axios';
import { 
    FETCH_ALL_INTERSHIP_CHANCES,
    FETCH_ONE_INTERSHIP_CHANCE,
    DELETE_ONE_INTERSHIP_CHANCE
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllIntershipChances() {
    return function (dispatch) {
        axios
            .get(`/api/resource/intership/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_INTERSHIP_CHANCES, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function fetchOneIntershipChance(id) {
    return function (dispatch) {
        axios
            .get(`/api/resource/intership/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_INTERSHIP_CHANCE, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function deleteOneIntershipChance(id) {
    return function (dispatch) {
        axios
            .delete(`/api/resource/intership/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_INTERSHIP_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export {
    fetchAllIntershipChances,
    fetchOneIntershipChance,
    deleteOneIntershipChance
}