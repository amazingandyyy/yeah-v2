import {
    CREATE_COURSE_CHANCE,
    FETCH_ONE_COURSE_CHANCE,
    FETCH_ALL_COURSE_CHANCES,
    DELETE_ALL_COURSE_CHANCES
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case CREATE_COURSE_CHANCE:
            return { ...state, success: true }
        case FETCH_ONE_COURSE_CHANCE:
            return { ...state, event: action.payload }
        case FETCH_ALL_COURSE_CHANCES:
            return { ...state, events: action.payload }
        case DELETE_ALL_COURSE_CHANCES:
            return { ...state, delete_success: true }
    }
    return state;
}