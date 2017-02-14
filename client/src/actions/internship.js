import request from './request';
import { 
    FETCH_ALL_INTERNSHIP_CHANCES,
    FETCH_ONE_INTERNSHIP_CHANCE,
    DELETE_ONE_INTERNSHIP_CHANCE,
    DELETE_ONE_INTERNSHIP_GOBACK
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllInternshipChances() {
    return function (dispatch) {
        request
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
        request
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
        request
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

function resetOneInternship(){
    return function (dispatch) {
        dispatch( { type: DELETE_ONE_INTERNSHIP_GOBACK } );
    }
}

function updateOneInternshipChance(id,data){
    return function(dispatch){
        request
            .post(`/api/resource/internship/updateOne/${id}`,data)
            .then(() => {
                hashHistory.push(`/internship/${id}`)
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export {
    fetchAllInternshipChances,
    fetchOneInternshipChance,
    deleteOneInternshipChance,
    resetOneInternship,
    updateOneInternshipChance
}