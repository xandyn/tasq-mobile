import { call, put, takeLatest } from 'redux-saga/effects';

import types, { profileFill, profileFetching } from '../actions/profile';
import { logout } from '../actions/auth';
import { profile } from '../api';


export function* fetchProfile() {
  yield put(profileFetching(true));
  const { response } = yield call(profile);

  if (response) {
    yield put(profileFill(response));
  } else {
    yield put(logout());
  }
  yield put(profileFetching(false));
}


export function* watchFetchProfile() {
  yield takeLatest(types.FETCH_PROFILE, fetchProfile);
}


export default [
  watchFetchProfile
];
