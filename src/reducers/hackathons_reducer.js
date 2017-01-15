import {
    FETCH_HACKATHON
} from '../actions/types';

const INITIAL_STATE = {
    hackathons: null
}

export default function(state=INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_HACKATHON:
            return { ...state, hackathons: action.payload }
    }
    return state;
}