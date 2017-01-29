import {
    ASSIST_GET_COLLEGES,
    ASSIST_GET_UNIVERSITIES,
    ASSIST_GET_MAJORS,
    ASSIST_RESET_MAJORS
} from '../actions/types';

const INITIAL_STATE ={
    colleges: null,
    universities: null,
    majors: null
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case ASSIST_GET_COLLEGES:
            return { ...state, colleges: action.payload }
        case ASSIST_GET_UNIVERSITIES:
            return { ...state, universities: action.payload }
        case ASSIST_GET_MAJORS:
            return { ...state, majors: action.payload }
        case ASSIST_RESET_MAJORS:
            return { ...state, majors: null}
    }
    return state;
}