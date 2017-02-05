import axios from 'axios';
import { 
    FETCH_ALL_INternship_CHANCES,
    FETCH_ONE_INternship_CHANCE,
    DELETE_ONE_INternship_CHANCE,
    DELETE_ONE_INternship_GOBACK
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllInternshipChances() {
    return function (dispatch) {
        axios
            .get(`/api/resource/internship/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_INternship_CHANCES, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function fetchOneInternshipChance(id) {
    return function (dispatch) {
        axios
            .get(`/api/resource/internship/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_INternship_CHANCE, payload: res.data})
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function deleteOneInternshipChance(id) {
    return function (dispatch) {
        axios
            .delete(`/api/resource/internship/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_INternship_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function deleteOneInternshipGoback(){
    return function (dispatch) {
        console.log('clearing the data');
        dispatch( { type: DELETE_ONE_INternship_GOBACK } );
    }
}

export {
    fetchAllInternshipChances,
    fetchOneInternshipChance,
    deleteOneInternshipChance,
    deleteOneInternshipGoback
}