import {
    CREATE_INternship_CHANCE,
    FETCH_ONE_INternship_CHANCE,
    FETCH_ALL_INternship_CHANCES,
    DELETE_ALL_INternship_CHANCES,
    DELETE_ONE_COURSE_GOBACK
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case CREATE_INternship_CHANCE:
            return { ...state, success: true }
        case FETCH_ONE_INternship_CHANCE:
            return { ...state, event: action.payload }
        case FETCH_ALL_INternship_CHANCES:
            return { ...state, events: action.payload }
        case DELETE_ALL_INternship_CHANCES:
            return { ...state, delete_success: true }
        case DELETE_ONE_COURSE_GOBACK:
            return { ...state, event: action.payload }    
    }
    return state;
}