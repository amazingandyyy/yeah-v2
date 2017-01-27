import {
    CREATE_INTERSHIP_CHANCE,
    FETCH_ONE_INTERSHIP_CHANCE,
    FETCH_ALL_INTERSHIP_CHANCES,
    DELETE_ALL_INTERSHIP_CHANCES
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case CREATE_INTERSHIP_CHANCE:
            return { ...state, success: true }
        case FETCH_ONE_INTERSHIP_CHANCE:
            return { ...state, event: action.payload }
        case FETCH_ALL_INTERSHIP_CHANCES:
            return { ...state, events: action.payload }
        case DELETE_ALL_INTERSHIP_CHANCES:
            return { ...state, delete_success: true }
    }
    return state;
}