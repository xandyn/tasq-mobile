import { call, takeLatest } from 'redux-saga/effects';

import Api from '../api';
import types from '../actions/ui';


export function* selectProject({ payload }) {
  yield call(Api.storeItems, { selectedProjectId: payload });
}


export function* watchSelectProject() {
  yield takeLatest(types.SELECT_PROJECT, selectProject);
}


export default [
  watchSelectProject,
];
