import {
    FETCH_PROFILE,
    UPDATE_PROFILE
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case FETCH_PROFILE:
            return { ...state, ...action.payload };
        case UPDATE_PROFILE:
        console.log('heyyy')
            return { ...state, ...action.payload };
    }
    return state;
}