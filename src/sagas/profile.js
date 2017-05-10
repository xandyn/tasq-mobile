import { call, put, takeLatest } from 'redux-saga/effects';

import types, {
  profileFill, profileFetching,
  profileEditSuccess, profileEditFailure
} from '../actions/profile';
import { logout } from '../actions/auth';
import { profile, profileEdit } from '../api';
import NavigationActions from '../navigation';


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

export function* editProfile({ payload }) {
  yield call(NavigationActions.showSpinner);
  const { response, error } = yield call(profileEdit, payload);

  if (response) {
    yield put(profileEditSuccess(response));
    yield call(NavigationActions.pop);
  } else {
    yield put(profileEditFailure(error));
  }
  yield call(NavigationActions.hideSpinner);
}


export function* watchFetchProfile() {
  yield takeLatest(types.FETCH_PROFILE, fetchProfile);
}

export function* watchEditProfile() {
  yield takeLatest(types.EDIT_PROFILE_REQUEST, editProfile);
}


export default [
  watchFetchProfile,
  watchEditProfile,
];
