import axios from 'axios';
import { 
    FETCH_ALL_COURSE_CHANCES,
    FETCH_ONE_COURSE_CHANCE,
    DELETE_ONE_COURSE_CHANCE,
    DELETE_ONE_COURSE_GOBACK
 } from './types';
import { hashHistory } from 'react-router';

function fetchAllCourseChances() {
    return function (dispatch) {
        axios
            .get(`/api/resource/course/fetchAll`)
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
        axios
            .get(`/api/resource/course/fetchOne/${id}`)
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
        axios
            .delete(`/api/resource/course/deleteOne/${id}`)
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

export {
    fetchAllCourseChances,
    fetchOneCourseChance,
    deleteOneCourseChance,
    deleteOneCourseGoback
}