import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';
import modal from './modal';
import ui from './ui';


const rootReducer = combineReducers({
  form: formReducer,
  profile,
  projects,
  tasks,
  users,
  modal,
  ui
});

export default rootReducer;
