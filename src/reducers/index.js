import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';


const rootReducer = combineReducers({
  form: formReducer,
  profile,
  projects,
  tasks,
  users,
});

export default rootReducer;
