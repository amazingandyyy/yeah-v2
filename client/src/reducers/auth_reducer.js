import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    AUTH_ADMIN,
    EMAIL_NOT_FOUND,
    EMAIL_SENT,
    RESET,
    SUCCESS_TO_VERIFY_TOKEN,
    FAIL_TO_VERIFY_TOKEN,
    SUCCEED_TO_RESET_PASSWORD,
    SIGNUP_WITH_DATA
} from '../actions/types';

const INITIAL_STATE = {
    error: '',
    authenticated: null,
    status: null,
    isAdmin: null,
    status: '',
    userData: null
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case AUTH_USER:
            return { ...state, error: '', authenticated: true, isAdmin: false}
        case AUTH_ADMIN:
            return { ...state, error: '', authenticated: true, isAdmin: true}
        case UNAUTH_USER:
            return { ...INITIAL_STATE }
        case AUTH_ERROR:
            return { ...state, error: action.payload, isAdmin: false }
        case EMAIL_NOT_FOUND:
            return { ...state, error: action.payload }
        case EMAIL_SENT:
            return  { ...state, status: EMAIL_SENT}
        case SUCCESS_TO_VERIFY_TOKEN:
            return { ...state, status: SUCCESS_TO_VERIFY_TOKEN }
        case FAIL_TO_VERIFY_TOKEN:
            return { ...state, status: FAIL_TO_VERIFY_TOKEN }
        case SUCCEED_TO_RESET_PASSWORD:
            return { ...state, status: SUCCEED_TO_RESET_PASSWORD }
        case SIGNUP_WITH_DATA:
            return { ...state, status: SIGNUP_WITH_DATA, userData: action.payload}
        case RESET: 
            return { ...INITIAL_STATE }
    }
    return state;
}