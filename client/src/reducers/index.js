import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'

import auth from './auth_reducer';
import profile from './profile_reducer';

const rootReducer = combineReducers({
  form,
  auth,
  profile
});

export default rootReducer;
