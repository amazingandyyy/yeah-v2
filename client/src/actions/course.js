import request from './request';
import { 
    FETCH_ALL_COURSE_CHANCES,
    FETCH_ONE_COURSE_CHANCE,
    DELETE_ONE_COURSE_CHANCE,
    DELETE_ONE_COURSE_GOBACK
 } from './types';
import { hashHistory } from 'react-router';
const base_url = '/api/resource/course';

function fetchAllCourseChances() {
    return function (dispatch) {
        request
            .get(`${base_url}/fetchAll`)
            .then(res => {
                dispatch({type: FETCH_ALL_COURSE_CHANCES, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function fetchOneCourseChance(id) {
    return function (dispatch) {
        request
            .get(`${base_url}/fetchOne/${id}`)
            .then(res => {
                dispatch({type: FETCH_ONE_COURSE_CHANCE, payload: res.data})
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function deleteOneCourseChance(id) {
    return function (dispatch) {
        request
            .delete(`${base_url}/deleteOne/${id}`)
            .then(res => {
                hashHistory.push("/dashboard/explore")
                dispatch({type: DELETE_ONE_COURSE_CHANCE, payload: directBack });
            })
            .catch(error => {
                console.log(error);
            });
    }
}

function deleteOneCourseGoback(){

    return function (dispatch) {
        console.log('clearing the data');
        dispatch( { type: DELETE_ONE_COURSE_GOBACK } );
    }
}

function updateOneCourse(id,data){
    return function(dispatch){
        request
            .post(`${base_url}/updateOne/${id}`, data)
            .then(res => {
                hashHistory.push(`/course/${id}`)
            })
            .catch(error => {
                console.log(error);
            });
    }
}


function resetOneCourseChance(id,data){
    return function(dispatch){
            dispatch( { type: DELETE_ONE_COURSE_GOBACK } );
    }
}
export {
    fetchAllCourseChances,
    fetchOneCourseChance,
    deleteOneCourseChance,
    deleteOneCourseGoback,
    updateOneCourse,
    resetOneCourseChance
}