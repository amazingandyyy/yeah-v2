import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_ADMIN
} from '../actions/types';

const INITIAL_STATE={
    error: '',
    authenticated: null,
    status: null,
    isAdmin: null
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, isAdmin: false}
        case AUTH_ADMIN:
            return { ...state, error: '', authenticated: true, isAdmin: true}
        case UNAUTH_USER:
            return { ...state, authenticated: false, isAdmin: false }
        case AUTH_ERROR:
            return { ...state, error: action.payload, isAdmin: false }
    }
    return state;
}