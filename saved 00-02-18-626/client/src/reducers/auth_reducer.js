import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    TRY_CONNECT
} from '../actions/types';

const INITIAL_STATE={
    error: '',
    authenticated: null,
    status: null
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true}
        case UNAUTH_USER:
            return { ...state, authenticated: false}
        case AUTH_ERROR:
            return { ...state, error: action.payload}
        case TRY_CONNECT:
            return { ...state, status: action.payload}
    }
    return state;
}