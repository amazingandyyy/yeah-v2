import {
    ASSIST_GET_COLLEGES
} from '../actions/types';

export default (state={}, action) => {
    switch (action.type) {
        case ASSIST_GET_COLLEGES:
            return { ...state, colleges: action.payload }
    }
    return state;
}