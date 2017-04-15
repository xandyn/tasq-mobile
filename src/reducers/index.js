import { combineReducers } from 'redux';

import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';
import modal from './modal';
import ui from './ui';


const rootReducer = combineReducers({
  profile,
  projects,
  tasks,
  users,
  modal,
  ui
});

export default rootReducer;
