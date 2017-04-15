import { fork } from 'redux-saga/effects';

import auth from './auth';
import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';
import modal from './modal';
import ui from './ui';

const sagas = [
  ...auth,
  ...profile,
  ...projects,
  ...tasks,
  ...users,
  ...modal,
  ...ui
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
