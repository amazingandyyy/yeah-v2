import {
    FETCH_ALL_APP,
    FETCH_ONE_APP,
    UPDATE_ONE_APP,
    FETCH_ALL_APP_OF_ONE
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_ALL_APP:
            return { ...state, apps: action.payload }
        case FETCH_ONE_APP:
            return { ...state, app: action.payload }
        case UPDATE_ONE_APP:
            return { ...state, app: action.payload }
        case FETCH_ALL_APP_OF_ONE:
            return { ...state, apps: action.payload }
    }
    return state;
}