import axios from 'axios';
import { 
    CREATE_VOLUNTEER_CHANCE,
    FETCH_ALL_VOLUNTEER_CHANCES,
    CREATE_INTERNSHIP_CHANCE,
    CREATE_COURSE_CHANCE
} from './types';
import { hashHistory } from 'react-router';

function createVolunteerResource(data) {
    return (dispatch) => {
        axios
            .post(`/api/resource/volunteer/create`, data)
            .then(res => {
                dispatch({ type: CREATE_VOLUNTEER_CHANCE })
                dispatch({ type: 'SUCCESS' });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function createInternshipResource(data) {
    return (dispatch) => {
        axios
            .post(`/api/resource/internship/create`, data)
            .then(res => {
                dispatch({ type: CREATE_INTERNSHIP_CHANCE })
                dispatch({ type: 'SUCCESS' });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

function createCourseResource(data) {
    return (dispatch) => {
        axios
            .post(`/api/resource/course/create`, data)
            .then(res => {
                dispatch({ type: CREATE_COURSE_CHANCE })
                dispatch({ type: 'SUCCESS' });
            })
            .catch(error => {
                console.log(error.response.data);
            });
    }
}

export { 
    createVolunteerResource,
    createInternshipResource,
    createCourseResource
}