import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import auth from './auth_reducer';
import hackathons from './hackathons_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  hackathons
});

export default rootReducer;
