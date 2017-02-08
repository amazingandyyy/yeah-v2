import axios from 'axios';
import { 
    FETCH_ALL_INTERNSHIP_CHANCES,
    FETCH_ONE_INTERNSHIP_CHANCE,
    DELETE_ONE_INTERNSHIP_CHANCE,
    DELETE_ONE_INTERNSHIP_GOBACK
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllInternshipChances() {
    return function (dispatch) {
        axios
            .get(`/api/resource/internship/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_INTERNSHIP_CHANCES, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function fetchOneInternshipChance(id) {
    return function (dispatch) {
        axios
            .get(`/api/resource/internship/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_INTERNSHIP_CHANCE, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function deleteOneInternshipChance(id) {
    return function (dispatch) {
        axios
            .delete(`/api/resource/internship/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_INTERNSHIP_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function deleteOneInternshipGoback(){
    return function (dispatch) {
        console.log('clearing the data');
        dispatch( { type: DELETE_ONE_INTERNSHIP_GOBACK } );
    }
}

export {
    fetchAllInternshipChances,
    fetchOneInternshipChance,
    deleteOneInternshipChance,
    deleteOneInternshipGoback
}