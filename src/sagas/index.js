import { fork } from 'redux-saga/effects';

import app from './app';
import auth from './auth';
import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';

const sagas = [
  ...app,
  ...auth,
  ...profile,
  ...projects,
  ...tasks,
  ...users,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
