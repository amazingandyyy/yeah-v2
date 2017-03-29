import {
    FETCH_ALL_APP,
    FETCH_ONE_APP,
    UPDATE_ONE_APP,
    FETCH_ALL_APP_OF_ONE,
    CREATE_ONE_APP,
    RESET_APP,
    FAIL_APP_ACTION
} from '../actions/types';

const INITIAL_STATE = {
    apps: null,
    app: null,
    error: ''
}

export default (state=INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_ALL_APP:
            return { ...state, apps: action.payload }
        case CREATE_ONE_APP:
            return { ...state, app: action.payload }
        case FETCH_ONE_APP:
            return { ...state, app: action.payload }
        case UPDATE_ONE_APP:
            return { ...state, app: action.payload }
        case FETCH_ALL_APP_OF_ONE:
            return { ...state, apps: action.payload }
        case FAIL_APP_ACTION:
            return { ...state, error: action.payload }
        case RESET_APP:
            return { ...INITIAL_STATE }
    }
    return state;
}