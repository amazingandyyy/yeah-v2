import { combineReducers } from 'redux';
import form from './redux_form_reducer.js'
import auth from './auth_reducer';
import profile from './profile_reducer';
import volunteer from './volunteer_reducer';
import internship from './INTERNSHIP_reducer';
import course from './course_reducer';
import assist from './assist_reducer';
const rootReducer = combineReducers({
  form,
  auth,
  profile,
  volunteer,
  internship,
  course,
  assist
});

export default rootReducer;
