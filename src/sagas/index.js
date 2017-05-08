import { fork } from 'redux-saga/effects';

import auth from './auth';
import profile from './profile';
import projects from './projects';
import tasks from './tasks';
import users from './users';

const sagas = [
  ...auth,
  ...profile,
  ...projects,
  ...tasks,
  ...users,
];

export default function* rootSaga() {
  yield sagas.map(saga => fork(saga));
}
